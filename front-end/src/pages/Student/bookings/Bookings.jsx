import axios from 'axios';
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { verifyAccessToken } from '../../../utils/jwt';
import "./Bookings.css";

const Bookings = () => {
    const [bookingsData, setBookingsData] = useState([]);
    const [isBookingAllowed, setIsBookingAllowed] = useState(true); // Trạng thái cho phép booking
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

                    // Kiểm tra nếu có booking nào có `end_date` lớn hơn hoặc bằng ngày hiện tại
                    const now = new Date();
                    const hasActiveBooking = bookings.some(booking => new Date(booking.end_date) >= now);
                    setIsBookingAllowed(!hasActiveBooking);
                }
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchBookings();
    }, []);

    const currentDate = new Date().toLocaleDateString(); // Lấy ngày tháng hiện tại

    return (
        <div className="container mt-4">
            <h1>
                Bookings <small className="text-muted">({currentDate})</small>
            </h1>

            {/* Hiển thị nút "Add New Booking" nếu bất kỳ booking nào có End Date < ngày hiện tại */}
            {bookingsData.some(booking => new Date(booking.end_date) < new Date()) && (
                <Link to={`${baseUrl}/student/booking/create-booking`}>
                    <button className="btn btn-primary float-right">
                        Add New Booking
                    </button>
                </Link>
            )}

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
