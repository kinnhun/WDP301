import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Alert, Button, Col, Container, Form, Modal, Row, Table } from 'react-bootstrap';
import { verifyAccessToken } from "../../../utils/jwt";

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
    const [selectedBed, setSelectedBed] = useState('');

    // State to manage booking details
    const [showBookingDetails, setShowBookingDetails] = useState(false);
    const [bookingDetails, setBookingDetails] = useState({});

    // Fetch functions
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
                setSelectedBed(''); // Reset selected bed when fetching new beds
            } else {
                console.error('Không thể lấy dữ liệu giường:', response.data.message);
                setBeds([]);  // Reset beds if there's an error
            }
        } catch (error) {
            console.error('Error fetching beds:', error);
            setBeds([]); // Reset beds if there's an error
        }
    };

    
    const handleConfirmBooking = async () => {
        console.log('Selected Room:', selectedRoom);
        console.log('Available Rooms:', availableRooms);
    
        const selectedRoomDetails = availableRooms.find(room => room.room_id === Number(selectedRoom));
        if (!selectedRoomDetails) {
            console.error('Selected room not found in available rooms');
            return;
        }
    
        console.log('Selected Room Details:', selectedRoomDetails);
    
        const totalAmount = selectedRoomDetails?.price || 0;
    
        // Lấy userId từ token
        const token = JSON.parse(localStorage.getItem("token"));
        console.log('Token:', token);
    
        const user = verifyAccessToken(token);
        console.log('Decoded User:', user);
        const userId = user ? user.id : null;
    
        if (!userId) {
            console.error('User ID is not available');
            return;
        }
    
        const startDate = new Date();
        const endDate = new Date();
    
        // Lấy roomType từ selectedRoomDetails
        const roomTypeName = roomCategory.find(category => category.room_type_id === selectedRoomDetails.room_type_id);
        console.log('Found Room Type:', roomTypeName);
    
        const bookingInfo = {
            room_id: selectedRoom,
            user_id: userId,
            start_date: startDate.toISOString(),
            end_date: endDate.toISOString(),
            total_amount: totalAmount,
            payment_status: 'Pending',
            booking_status: 'Pending',
            bed_id: selectedBed,
            roomType: roomTypeName ? roomTypeName.category_name : 'Unknown',
            dorm,
            floor,
        };
    
        console.log('Booking Info:', bookingInfo);
    
        // await axios.post('/api/bookings', bookingInfo); // Gửi bookingInfo nếu cần
    
        setBookingDetails(bookingInfo);
        setShowBookingDetails(true);
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
        setSelectedBed('');      // Reset selected bed
    };

    const handleDormChange = (e) => {
        setDorm(e.target.value);
        setAvailableRooms([]);  // Reset available rooms
        setSelectedRoom('');     // Reset selected room
        setBeds([]);             // Reset available beds
        setSelectedBed('');      // Reset selected bed
    };

    const handleFloorChange = (e) => {
        setFloor(e.target.value);
        setAvailableRooms([]);  // Reset available rooms
        setSelectedRoom('');     // Reset selected room
        setBeds([]);             // Reset available beds
        setSelectedBed('');      // Reset selected bed
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
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {availableRooms.map(room => (
                                        <tr key={room.room_id}>
                                            <td>{room.room_number}</td>
                                            <td>{room.price} VND</td>
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
                            <h3 className="mt-4">Available Beds for Room {availableRooms.find(room => room.room_id === Number(selectedRoom))?.room_number}</h3>

                            <Form.Group controlId="bedSelect">
                                <Form.Label>Select Bed</Form.Label>
                                <Form.Control as="select" value={selectedBed} onChange={(e) => setSelectedBed(e.target.value)}>
                                    <option value="">Select Bed</option>
                                    {beds.map(bed => (
                                        <option key={bed.bed_id} value={bed.bed_id}>
                                            {bed.bed_number} - {bed.availability_status}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
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

                            {/* Hiển thị nút Confirm Booking khi có giường được chọn */}
                            {selectedBed && (
                                <Button variant="primary" className="mt-3" onClick={handleConfirmBooking}>
                                    Confirm Booking
                                </Button>
                            )}
                        </div>
                    ) : selectedRoom && beds.length === 0 ? (
                        <Alert variant="info">No available beds for the selected room.</Alert>
                    ) : (
                        <Alert variant="info">Please select a room to see available beds.</Alert>
                    )}
                </Col>
            </Row>

            <Modal show={showBookingDetails} onHide={() => setShowBookingDetails(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Booking Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p><strong>Room Type:</strong> {bookingDetails.roomType}</p>
                    <p><strong>Dorm:</strong> {bookingDetails.dorm}</p>
                    <p><strong>Floor:</strong> {bookingDetails.floor}</p>
                    <p><strong>Room ID:</strong> {bookingDetails.room_id}</p>
                    <p><strong>Bed ID:</strong> {bookingDetails.bed_id}</p>
                    <p><strong>User ID:</strong> {bookingDetails.user_id}</p>
                    <p><strong>Total Amount:</strong> {bookingDetails.total_amount} VND</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowBookingDetails(false)}>
                        Close
                    </Button>
                    <Button  >
                        Payment
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Book;