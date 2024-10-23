import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';

const Book = () => {
    const [roomType, setRoomType] = useState('');
    const [dorm, setDorm] = useState('');
    const [availableRooms, setAvailableRooms] = useState([]);

    // Hàm gọi API để lấy danh sách phòng có sẵn
    const fetchAvailableRooms = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/room/status/available'); // Gọi API
            if (response.data.success) {
                setAvailableRooms(response.data.data); // Cập nhật danh sách phòng
            } else {
                console.error('Không thể lấy dữ liệu phòng:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching available rooms:', error);
        }
    };

    useEffect(() => {
        fetchAvailableRooms(); // Gọi hàm khi component được mount
    }, []);

    return (
        <div className="container mt-4">
            <h1>New Booking</h1>

            

            <Button variant="primary" className="mt-3">Confirm Booking</Button>

            {/* Hiển thị danh sách phòng có sẵn */}
            <h2 className="mt-4">Available Rooms</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Room Number</th>
                        <th>Room Type ID</th>
                        <th>Price (VND)</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {availableRooms.map(room => (
                        <tr key={room.room_id}>
                            <td>{room.room_number}</td>
                            <td>{room.room_type_id}</td>
                            <td>{room.price}</td>
                            <td>{room.availability_status}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default Book;
