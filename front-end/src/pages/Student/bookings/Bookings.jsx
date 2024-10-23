import axios from 'axios'; // Import axios
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { verifyAccessToken } from '../../../utils/jwt'; // Đảm bảo import hàm verifyAccessToken
import "./Bookings.css";

const Bookings = () => {
    const [bookingsData, setBookingsData] = useState([]);
    const baseUrl = import.meta.env.VITE_PUBLIC_URL;

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = JSON.parse(localStorage.getItem('token'));
                const userId = verifyAccessToken(token).id; // Lấy ID từ token
                console.log(userId);
                
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/booking/user/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Gửi token trong header
                    },
                });

                // Cập nhật state với dữ liệu nhận được
                if (response.data.success) {
                    setBookingsData(response.data.data); // Lấy dữ liệu từ trường `data`
                }
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchBookings(); // Gọi hàm fetchBookings khi component được mount
    }, []);

    return (
        <div className="container mt-4">
            <h1>Bookings</h1>
            <Link to={`${baseUrl}/student/booking/book`}>
                <button className="btn btn-primary float-right">
                    Add New Booking          
                </button>
            </Link>
           
            <Table striped bordered hover responsive className="table-sm">
    <thead className="">
        <tr>
            <th>Booking ID</th>
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
                <td>{booking.booking_id}</td>
                <td>{booking.room_number}</td>
                <td>{booking.bed_number}</td>
                <td>{new Date(booking.start_date).toLocaleDateString()}</td>
                <td>{new Date(booking.end_date).toLocaleDateString()}</td>
                <td>{booking.total_amount}</td>
                <td>{booking.payment_status}</td>
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
