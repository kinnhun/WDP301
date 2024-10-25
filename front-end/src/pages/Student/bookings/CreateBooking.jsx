import axios from 'axios';
import { useEffect, useState } from 'react';
import { Alert, Col, Container, Form, Row, Table } from 'react-bootstrap';

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
                setNoRoomsAvailable(rooms.length === 0);
            } else {
                console.error('Không thể lấy dữ liệu phòng:', response.data.message);
                setNoRoomsAvailable(true);
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
                setBeds([]);  // Reset beds if there's an error
            }
        } catch (error) {
            console.error('Error fetching beds:', error);
            setBeds([]); // Reset beds if there's an error
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

    const handleRoomTypeChange = (e) => {
        setRoomType(e.target.value);
        setAvailableRooms([]);  // Reset available rooms
        setSelectedRoom('');     // Reset selected room
        setBeds([]);             // Reset available beds
    };

    const handleDormChange = (e) => {
        setDorm(e.target.value);
        setAvailableRooms([]);  // Reset available rooms
        setSelectedRoom('');     // Reset selected room
        setBeds([]);             // Reset available beds
    };

    const handleFloorChange = (e) => {
        setFloor(e.target.value);
        setAvailableRooms([]);  // Reset available rooms
        setSelectedRoom('');     // Reset selected room
        setBeds([]);             // Reset available beds
    };

    return (
        <Container className="mt-4">
            <h1 className="mb-4 text-center">New Booking</h1>

            <Row className="mb-3">
                <Col md={4}>
                    <Form.Group controlId="roomType">
                        <Form.Label>Room Type</Form.Label>
                        <Form.Control as="select" value={roomType} onChange={handleRoomTypeChange}>
                            <option value="">Select Room Type</option>
                            {roomCategory.map(category => (
                                <option key={category.room_type_id} value={category.room_type_id}>
                                    {category.category_name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group controlId="dorm">
                        <Form.Label>Dorm</Form.Label>
                        <Form.Control as="select" value={dorm} onChange={handleDormChange}>
                            <option value="">Select Dorm</option>
                            {dorms.map(d => (
                                <option key={d.dorm} value={d.dorm}>
                                    {d.dorm}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group controlId="floor">
                        <Form.Label>Floor</Form.Label>
                        <Form.Control as="select" value={floor} onChange={handleFloorChange}>
                            <option value="">Select Floor</option>
                            {floors.map(f => (
                                <option key={f.floor_number} value={f.floor_number}>
                                    {f.floor_number}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>

            {availableRooms.length > 0 ? (
                <Form.Group controlId="roomSelect" className="mb-4">
                    <Form.Label>Select Room</Form.Label>
                    <Form.Control as="select" value={selectedRoom} onChange={(e) => {
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
                    </Form.Control>
                </Form.Group>
            ) : noRoomsAvailable && (
                <Alert variant="warning">No available rooms found for the selected criteria.</Alert>
            )}

            <Row>
                {/* Available Rooms - 2/3 of width */}
                <Col md={8}>
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
                                        <tr key={room.room_id} onClick={() => fetchGetBedAvailableFromRoom(room.room_id)}>
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
                </Col>

                {/* Available Beds - 1/3 of width */}
                <Col md={4}>
                    {selectedRoom && beds.length > 0 ? (
                        <div>
                            <h3 className="mt-4">Available Beds for Room {selectedRoom}</h3>
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
                    ) : selectedRoom && beds.length === 0 ? (
                        <Alert variant="info">No available beds for the selected room.</Alert>
                    ) : (
                        <Alert variant="info">Please select a room to see available beds.</Alert>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Book;
