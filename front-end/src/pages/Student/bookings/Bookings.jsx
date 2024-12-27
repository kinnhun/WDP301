import axios from 'axios';
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { verifyAccessToken } from '../../../utils/jwt';
import "./Bookings.css";

const Bookings = () => {
    const [bookingsData, setBookingsData] = useState([]);
    const [isBookingAllowed, setIsBookingAllowed] = useState(true); // Booking status
    const [activeSemester, setActiveSemester] = useState(null); // Active semester data
    const baseUrl = import.meta.env.VITE_PUBLIC_URL;

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = JSON.parse(localStorage.getItem('token'));
                const userId = verifyAccessToken(token).id;

                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/booking/user/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data.success) {
                    const bookings = response.data.data;
                    setBookingsData(bookings);

                    // Check if there's any active booking
                    const now = new Date();
                    const hasActiveBooking = bookings.some(booking => new Date(booking.end_date) >= now);
                    setIsBookingAllowed(!hasActiveBooking);
                }
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        const fetchActiveSemester = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/semester/active`);
                if (response.data.success) {
                    setActiveSemester(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching active semester:', error);
            }
        };

        fetchBookings();
        fetchActiveSemester();
    }, []);

    const currentDate = new Date(); // Current date

    const shouldShowAddBookingButton = () => {
        if (activeSemester) {
            const semesterEndDate = new Date(activeSemester.end_date);
            const twoWeeksAfterEnd = new Date(semesterEndDate);
            twoWeeksAfterEnd.setDate(semesterEndDate.getDate() + 14);

            // Check if the current date is within two weeks after the semester's end date
            return currentDate > semesterEndDate && currentDate <= twoWeeksAfterEnd;
        }
        return false;
    };

    const shouldShowDormitoryReservationButton = () => {
        if (activeSemester) {
            const semesterEndDate = new Date(activeSemester.end_date);
            const twoWeeksBeforeEnd = new Date();
            twoWeeksBeforeEnd.setDate(currentDate.getDate() + 14);

            // Check if the current date + 14 days is before the semester's end date
            return twoWeeksBeforeEnd < semesterEndDate;
        }
        return false;
    };

    return (
        <div className="container mt-4">
            <h1>
                Bookings <small className="text-muted">({currentDate.toLocaleDateString()})</small>
            </h1>

            {activeSemester && (
                <div className="mb-4">
                    <h4>Active Semester</h4>
                    <p>
                        <strong>Name:</strong> {activeSemester.semester_name} <br />
                        <strong>Start Date:</strong> {new Date(activeSemester.start_date).toLocaleDateString()} <br />
                        <strong>End Date:</strong> {new Date(activeSemester.end_date).toLocaleDateString()} <br />
                        <strong>Status:</strong> {activeSemester.status}
                    </p>
                </div>
            )}

            {/* Show "Add New Booking" button only if the current date is within two weeks after the semester's end date */}
            {shouldShowAddBookingButton() && (
                <Link to={`${baseUrl}/student/booking/create-booking`}>
                    <button className="btn btn-primary float-right">
                        Add New Booking
                    </button>
                </Link>
            )}

            {/* Show "Dormitory Reservation" button if current date + 14 days is before semester's end date */}
            {shouldShowDormitoryReservationButton() && (
                <Link to={`${baseUrl}/student/booking/dormitory-reservation`}>
                    <button className="btn btn-secondary float-right mr-2">
                        Dormitory Reservation
                    </button>
                </Link>
            )}
            <Link to={`${baseUrl}/student/booking/dormitory-reservation`}>
                <button className="btn btn-secondary float-right mr-2">
                    Dormitory Reservation
                </button>
            </Link>
            <Table striped bordered hover responsive className="table-sm">
                <thead>
                    <tr>
                        <th>Dom</th>
                        <th>Floor</th>
                        <th>Room Number</th>
                        <th>Bed Number</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Total Amount</th>
                        <th>Payment Status</th>
                        <th>Booking Status</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {bookingsData.map((booking, index) => (
                        <tr key={index}>
                            <td>{booking.dorm}</td>
                            <td>{booking.category_name}</td>
                            <td>{booking.room_number}</td>
                            <td>{booking.bed_number}</td>
                            <td>{new Date(booking.start_date).toLocaleDateString()}</td>
                            <td>{new Date(booking.end_date).toLocaleDateString()}</td>
                            <td>{booking.total_amount}</td>
                            <td>{booking.payment_status === 'Completed' ? 'Payment Completed' : 'Pending Payment'}</td>
                            <td>{booking.booking_status}</td>
                            <td>{new Date(booking.created_at).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default Bookings;
