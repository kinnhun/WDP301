import axios from 'axios';
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';

const Book = () => {
    const [roomType, setRoomType] = useState('');
    const [dorm, setDorm] = useState('');
    const [dorms, setDorms] = useState([]);
    const [floor, setFloor] = useState('');
    const [availableRooms, setAvailableRooms] = useState([]);
    const [roomCategory, setRoomCategory] = useState([]);
    const [floors, setFloors] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState('');
    const [beds, setBeds] = useState([]);
    const [noRoomsAvailable, setNoRoomsAvailable] = useState(false);

    const fetchRoomCategory = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/room/roomCategories/all`);
            if (response.data.success) {
                setRoomCategory(response.data.data);
            } else {
                console.error('Không thể lấy dữ liệu danh mục phòng:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching room categories:', error);
        }
    };

    const fetchDorms = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/room/dorms/all`);
            if (response.data.success) {
                setDorms(response.data.data);
            } else {
                console.error('Không thể lấy dữ liệu dorm:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching dorms:', error);
        }
    };

    const fetchFloors = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/room/floor/all`);
            if (response.data.success) {
                setFloors(response.data.data);
            } else {
                console.error('Không thể lấy dữ liệu tầng:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching floors:', error);
        }
    };

    const fetchAvailableRooms = async () => {
        if (!roomType || !dorm || !floor) return;
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/room/rooms/type/${roomType}/floor/${floor}/dorm/${dorm}`);
            if (response.data.success) {
                const rooms = response.data.data;
                setAvailableRooms(rooms);
                setNoRoomsAvailable(rooms.length === 0); // Update noRoomsAvailable state
            } else {
                console.error('Không thể lấy dữ liệu phòng:', response.data.message);
                setNoRoomsAvailable(true); // Set noRoomsAvailable to true if the request fails
            }
        } catch (error) {
            console.error('Error fetching available rooms:', error);
            setNoRoomsAvailable(true);
        }
    };

    const fetchGetBedAvailableFromRoom = async (roomId) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/room/bed/available/room/${roomId}`);
            if (response.data.success) {
                setBeds(response.data.data);
            } else {
                console.error('Không thể lấy dữ liệu giường:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching beds:', error);
        }
    };

    useEffect(() => {
        fetchRoomCategory();
        fetchFloors();
        fetchDorms();
    }, []);

    useEffect(() => {
        fetchAvailableRooms(); 
    }, [roomType, dorm, floor]);

    return (
        <div className="container mt-4">
            <h1>New Booking</h1>

            {/* Select Room Type */}
            <select value={roomType} onChange={(e) => setRoomType(e.target.value)}>
                <option value="">Select Room Type</option>
                {roomCategory.map(category => (
                    <option key={category.room_type_id} value={category.room_type_id}>
                        {category.category_name}
                    </option>
                ))}
            </select>

            {/* Select Dorm */}
            <select value={dorm} onChange={(e) => setDorm(e.target.value)}>
                <option value="">Select Dorm</option>
                {dorms.map(dorm => (
                    <option key={dorm.dorm} value={dorm.dorm}>
                        {dorm.dorm}
                    </option>
                ))}
            </select>

            {/* Select Floor */}
            <select value={floor} onChange={(e) => setFloor(e.target.value)}>
                <option value="">Select Floor</option>
                {floors.map(f => (
                    <option key={f.floor_number} value={f.floor_number}>
                        {f.floor_number}
                    </option>
                ))}
            </select>

           

            {/* Room selection dropdown if rooms are available */}
            {availableRooms.length > 0 && (
                <select value={selectedRoom} onChange={(e) => {
                    const roomId = e.target.value;
                    setSelectedRoom(roomId);
                    fetchGetBedAvailableFromRoom(roomId);
                }}>
                    <option value="">Select Room</option>
                    {availableRooms.map(room => (
                        <option key={room.room_id} value={room.room_id}>
                            {room.room_number} - {room.price} VND
                        </option>
                    ))}
                </select>
            )}

          
 {/* Display message if no rooms available */}
 {noRoomsAvailable && <p>No available rooms found for the selected criteria.</p>}
            {/* Display table for available rooms if there are rooms */}
            {availableRooms.length > 0 && (
                <>
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
                </>
            )}

            {/* Display available beds if any */}
            {beds.length > 0 && (
                <div>
                    <h3>Available Beds</h3>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Bed Number</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {beds.map(bed => (
                                <tr key={bed.bed_id}>
                                    <td>{bed.bed_number}</td>
                                    <td>{bed.availability_status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}
        </div>
    );
};

export default Book;
