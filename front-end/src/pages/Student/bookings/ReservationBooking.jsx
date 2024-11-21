import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

const ReservationBooking = () => {
    const [bookingData, setBookingData] = useState(null); // Booking data state
    const [nextSemester, setNextSemester] = useState(null); // Next semester data state
    const [error, setError] = useState(null); // Error state
    const [showBookingDetails, setShowBookingDetails] = useState(false); // Modal visibility
    const [qrUrl, setQrUrl] = useState(null); // QR Code URL
    const [transactionId, setTransactionId] = useState(null); // Transaction ID
    const [transactionStatus, setTransactionStatus] = useState(null); // Transaction status

    // Fetch latest booking and next semester
    useEffect(() => {
        const fetchLatestBooking = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/booking/latest/4');
                if (response.data.success) {
                    setBookingData(response.data.data);
                } else {
                    setError('No latest booking found');
                }
            } catch (err) {
                setError('Error fetching booking data');
            }
        };

        const fetchNextSemester = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/semester/next-semester');
                if (response.data.success) {
                    setNextSemester(response.data.data);
                } else {
                    setError('No next semester found');
                }
            } catch (err) {
                setError('Error fetching next semester data');
            }
        };

        fetchLatestBooking();
        fetchNextSemester();
    }, []);

    // Generate VietQR and initialize transaction
    const createVietQR = async () => {
        try {
            const response = await axios.post(
                `http://localhost:8080/create-vietqr`,
                {
                    bookingId: bookingData.booking_id,
                    amount: bookingData.total_amount,
                },
                {
                    headers: { 'Cache-Control': 'no-cache' },
                }
            );
            setQrUrl(response.data.qrUrl);
            setTransactionId(response.data.transactionId);
            setTransactionStatus('pending');
        } catch (error) {
            console.error('Error creating VietQR:', error.message);
        }
    };

    // Simulate payment with Fake Bill and create booking for next semester
    const handleFakeBill = async () => {
        try {
            setTransactionStatus('success');
            alert('Payment simulated successfully!');

            // Call API to create booking for next semester
            const payload = {
                booking_id: bookingData.booking_id,
                start_date: nextSemester.start_date,
                end_date: nextSemester.end_date,
                semester: nextSemester.semester_name,
            };

            const response = await axios.post('http://localhost:8080/api/booking/create-booking-latest', payload);

            if (response.data.success) {
                alert('Booking for next semester created successfully!');
            } else {
                alert('Failed to create booking for next semester');
            }

            setShowBookingDetails(false);
        } catch (error) {
            console.error('Error creating booking for next semester:', error.message);
            alert('Error creating booking for next semester');
        }
    };

    // Show error message if any
    if (error) {
        return <div>{error}</div>;
    }

    // Show loading state while fetching data
    if (!bookingData || !nextSemester) {
        return <div>Loading data...</div>;
    }

    // Show booking and semester details
    return (
        <div className="container mt-4">
            <h1>Latest Booking Information</h1>
            <table className="table table-bordered mt-3">
                <tbody>
                    <tr>
                        <th>Booking ID</th>
                        <td>{bookingData.booking_id}</td>
                    </tr>
                    <tr>
                        <th>User ID</th>
                        <td>{bookingData.user_id}</td>
                    </tr>
                    <tr>
                        <th>Room</th>
                        <td>{bookingData.room_number}</td>
                    </tr>
                    <tr>
                        <th>Floor</th>
                        <td>{bookingData.floor_number}</td>
                    </tr>
                    <tr>
                        <th>Dormitory</th>
                        <td>{bookingData.dorm}</td>
                    </tr>
                    <tr>
                        <th>Start Date</th>
                        <td>{new Date(bookingData.start_date).toLocaleDateString()}</td>
                    </tr>
                    <tr>
                        <th>End Date</th>
                        <td>{new Date(bookingData.end_date).toLocaleDateString()}</td>
                    </tr>
                    <tr>
                        <th>Total Amount</th>
                        <td>{bookingData.total_amount} VND</td>
                    </tr>
                    <tr>
                        <th>Payment Status</th>
                        <td>{transactionStatus || bookingData.payment_status}</td>
                    </tr>
                    <tr>
                        <th>Booking Status</th>
                        <td>{bookingData.booking_status}</td>
                    </tr>
                </tbody>
            </table>

            <h2 className="mt-5">Next Semester Information</h2>
            <table className="table table-bordered mt-3">
                <tbody>
                    <tr>
                        <th>Semester Name</th>
                        <td>{nextSemester.semester_name}</td>
                    </tr>
                    <tr>
                        <th>Start Date</th>
                        <td>{new Date(nextSemester.start_date).toLocaleDateString()}</td>
                    </tr>
                    <tr>
                        <th>End Date</th>
                        <td>{new Date(nextSemester.end_date).toLocaleDateString()}</td>
                    </tr>
                    <tr>
                        <th>Status</th>
                        <td>{nextSemester.status}</td>
                    </tr>
                </tbody>
            </table>

            {/* Button to show modal */}
            <div className="mt-4">
                <Button variant="primary" onClick={() => {
                    setShowBookingDetails(true);
                    createVietQR();
                }}>
                    Proceed to Payment For next semester
                </Button>
            </div>

            {/* Modal for VietQR payment */}
            <Modal show={showBookingDetails} onHide={() => setShowBookingDetails(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Payment via VietQR</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {qrUrl ? (
                        <div className="text-center">
                            <p>Scan the QR code below to complete the payment.</p>
                            <img src={qrUrl} alt="VietQR Code" style={{ width: '300px', height: '300px' }} />
                        </div>
                    ) : (
                        <p>Generating QR Code...</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleFakeBill}>
                        Fake Bill
                    </Button>
                    <Button variant="secondary" onClick={() => setShowBookingDetails(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ReservationBooking;
