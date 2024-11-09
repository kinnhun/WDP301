import axios from 'axios';
import { useEffect, useState } from 'react';
import { Alert, Button, Col, Container, Form, Modal, Row, Table } from 'react-bootstrap';

const BookingManager = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('Pending');
    const [selectedBookings, setSelectedBookings] = useState([]); // State for selected bookings
    const [selectAll, setSelectAll] = useState(false); // State for "Select All" checkbox
    const statusOptions = ['Pending', 'Confirmed', 'Cancelled']; // Status options for the dropdown

    // Fetch bookings based on the selected status
    const fetchBookings = async (status) => {
        setLoading(true);
        setError(''); // Clear the error state before making a new request
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/booking/booking-status/${status}`);
            if (response.data.success) {
                setBookings(response.data.data);
            } else {
                setError('Failed to fetch bookings.');
                setBookings([]);
            }
        } catch (err) {
            setError('Error fetching bookings: ' + err.message);
            setBookings([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings(selectedStatus);
    }, [selectedStatus]);

    // Handle checkbox selection for individual bookings
    const handleCheckboxChange = (bookingId) => {
        setSelectedBookings((prevSelected) => {
            if (prevSelected.includes(bookingId)) {
                return prevSelected.filter(id => id !== bookingId);
            } else {
                return [...prevSelected, bookingId];
            }
        });
    };

    // Handle "Select All" checkbox
    const handleSelectAllChange = () => {
        if (selectAll) {
            setSelectedBookings([]); // Deselect all
        } else {
            setSelectedBookings(bookings.map(booking => booking.booking_id)); // Select all
        }
        setSelectAll(!selectAll);
    };

    // Handle status change for individual booking
    const handleStatusChange = async (bookingId, newStatus) => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/booking/booking-status/${bookingId}/${newStatus}`);
            if (response.data.success) {
                await fetchBookings(selectedStatus);
                console.log('Booking status updated successfully');
            } else {
                console.error('Failed to update booking status');
            }
        } catch (error) {
            console.error('Error updating booking status:', error.message);
        }
    };

    // Bulk update booking status for selected bookings
    const handleBulkStatusChange = async () => {
        const newStatus = 'Confirmed';
        try {
            const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/booking/bulk-status/bulk`, {
                bookingIds: selectedBookings,
                newStatus: newStatus,
            });
            if (response.data.success) {
                await fetchBookings(selectedStatus);
                console.log('Booking statuses updated successfully');
                setSelectedBookings([]); // Clear selected bookings after update
                setSelectAll(false); // Deselect "Select All"
            } else {
                console.error('Failed to update booking statuses');
            }
        } catch (error) {
            console.error('Error updating booking statuses:', error.message);
        }
    };

    return (
        <Container className="mt-4">
            <h1 className="mb-4">Booking Manager</h1>
            <Form.Group controlId="statusSelect" className="mb-3">
                <Form.Label>Select Booking Status</Form.Label>
                <Form.Control
                    as="select"
                    value={selectedStatus}
                    onChange={(e) => {
                        setSelectedStatus(e.target.value);
                        setError('');
                    }}
                >
                    {statusOptions.map((status) => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                </Form.Control>
            </Form.Group>
            <Button variant="primary" onClick={handleBulkStatusChange} disabled={selectedBookings.length === 0}>
            Confirm for Selected
            </Button>

        
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <Alert variant="danger">{error}</Alert>
            ) : bookings.length > 0 ? (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>
                               Select     <Form.Check
                                    type="checkbox"
                                    checked={selectAll}
                                    onChange={handleSelectAllChange}
                                />
                            </th> {/* "Select All" Checkbox */}
                            <th>Booking ID</th>
                            <th>User ID</th>
                            <th>Room ID</th>
                            <th>Bed ID</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Total Amount (VND)</th>
                            <th>Payment Status</th>
                            <th>Booking Status</th>
                            <th>Created At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking.booking_id}>
                                <td>
                                    <Form.Check
                                        type="checkbox"
                                        checked={selectedBookings.includes(booking.booking_id)}
                                        onChange={() => handleCheckboxChange(booking.booking_id)}
                                    />
                                </td>
                                <td>{booking.booking_id}</td>
                                <td>{booking.user_id}</td>
                                <td>{booking.room_id}</td>
                                <td>{booking.bed_id}</td>
                                <td>{new Date(booking.start_date).toLocaleDateString()}</td>
                                <td>{new Date(booking.end_date).toLocaleDateString()}</td>
                                <td>{booking.total_amount.toLocaleString()}</td>
                                <td>{booking.payment_status}</td>
                                <td>
                                    <Form.Control
                                        as="select"
                                        value={booking.booking_status}
                                        onChange={(e) => handleStatusChange(booking.booking_id, e.target.value)}
                                    >
                                        {statusOptions.map((status) => (
                                            <option key={status} value={status}>{status}</option>
                                        ))}
                                    </Form.Control>
                                </td>
                                <td>{new Date(booking.created_at).toLocaleDateString()}</td>
                                <td>
                                    <Button variant="info" onClick={() => setSelectedBooking(booking) && setShowModal(true)}>
                                        View Details
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <Alert variant="info">No bookings found.</Alert>
            )}

            {/* Modal for booking details */}
            {selectedBooking && (
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Booking Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col md={6}>
                                <p><strong>Booking ID:</strong> {selectedBooking.booking_id}</p>
                                <p><strong>User Email:</strong> {selectedBooking.user_email}</p>
                                <p><strong>Bed Number:</strong> {selectedBooking.bed_number}</p>
                                <p><strong>Room Name:</strong> {selectedBooking.RoomName}</p>
                                <p><strong>Floor Number:</strong> {selectedBooking.floor_number}</p>
                                <p><strong>Dorm:</strong> {selectedBooking.dorm}</p>
                            </Col>
                            <Col md={6}>
                                <p><strong>Start Date:</strong> {new Date(selectedBooking.start_date).toLocaleDateString()}</p>
                                <p><strong>End Date:</strong> {new Date(selectedBooking.end_date).toLocaleDateString()}</p>
                                <p><strong>Total Amount (VND):</strong> {selectedBooking.total_amount.toLocaleString()}</p>
                                <p><strong>Payment Status:</strong> {selectedBooking.payment_status}</p>
                                <p><strong>Booking Status:</strong> {selectedBooking.booking_status}</p>
                                <p><strong>Created At:</strong> {new Date(selectedBooking.created_at).toLocaleDateString()}</p>
                                <p><strong>Updated At:</strong> {new Date(selectedBooking.updated_at).toLocaleDateString()}</p>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                    </Modal.Footer>
                </Modal>
            )}
        </Container>
    );
};

export default BookingManager;
