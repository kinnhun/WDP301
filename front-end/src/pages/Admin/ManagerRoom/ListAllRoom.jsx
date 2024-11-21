import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Form, Row, Table, Pagination } from 'react-bootstrap';

const ListAllRoom = () => {
    const [dorms, setDorms] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [selectedDorm, setSelectedDorm] = useState("");
    const [selectedFloor, setSelectedFloor] = useState("");  // Added floor state
    const [floors, setFloors] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState(""); // New state for status
    const [currentPage, setCurrentPage] = useState(1);  // State for current page
    const [roomsPerPage, setRoomsPerPage] = useState(5);  // Number of rooms per page

    const fetchDorms = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/room/dorms/all`);
            if (response.data.success) {
                setDorms(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching dorms:", error);
        }
    };

    const fetchFloors = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/room/floor/all`);
            if (response.data.success) {
                setFloors(response.data.data);
            } else {
                console.error("Không thể lấy dữ liệu tầng:", response.data.message);
            }
        } catch (error) {
            console.error("Error fetching floors:", error);
        }
    };

    // Fetch rooms based on dorm, floor, and status selection
    const fetchRooms = async (dorm = "", floor = "", status = "") => {
        try {
            // Xây dựng URL đúng với các tham số dorm, floor và status
            const params = [];
            if (dorm) params.push(`dorm=${dorm}`);
            if (floor) params.push(`floor=${floor}`);
            if (status) params.push(`status=${status}`);
            const url = params.length > 0
                ? `http://localhost:8080/api/room?${params.join("&")}`
                : 'http://localhost:8080/api/room'; // Fetch all rooms nếu không có filter

            const response = await axios.get(url);
            if (response.data.success) {
                setRooms(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching rooms:", error);
        }
    };

    // Fetch dorms and floors on initial load
    useEffect(() => {
        fetchDorms();
        fetchFloors();
    }, []);

    // Fetch rooms when dorm, floor or status selection changes
    useEffect(() => {
        fetchRooms(selectedDorm, selectedFloor, selectedStatus);
    }, [selectedDorm, selectedFloor, selectedStatus]);

    // Handle dorm selection change
    const handleDormChange = (e) => {
        setSelectedDorm(e.target.value);
    };

    // Handle floor selection change
    const handleFloorChange = (e) => {
        setSelectedFloor(e.target.value);
    };

    // Handle status selection change
    const handleStatusChange = (e) => {
        setSelectedStatus(e.target.value); // Update the selected status
    };

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);  // Update current page
    };

    // Get the rooms to display for the current page
    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = rooms.slice(indexOfFirstRoom, indexOfLastRoom);

    // Pagination logic
    const totalPages = Math.ceil(rooms.length / roomsPerPage);

    return (
        <div>
            <h1>Select Dorm, Floor, and Status</h1>
            <Row>
                <Col md={4} sm={12}>
                    <Form.Group controlId="dorm">
                        <Form.Label>Dorm</Form.Label>
                        <Form.Control as="select" value={selectedDorm} onChange={handleDormChange}>
                            <option value="">Select Dorm</option>
                            {dorms.map((d) => (
                                <option key={d.dorm} value={d.dorm}>
                                    Dorm {d.dorm}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Col>

                <Col md={4} sm={12}>
                    <Form.Group controlId="floor">
                        <Form.Label>Floor</Form.Label>
                        <Form.Control as="select" value={selectedFloor} onChange={handleFloorChange}>
                            <option value="">Select Floor</option>
                            {floors.map((f) => (
                                <option key={f.floor_number} value={f.floor_number}>
                                    {f.floor_number}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Col>

                {/* Added Status Selection */}
                <Col md={4} sm={12}>
                    <Form.Group controlId="status1">
                        <Form.Label>Status</Form.Label>
                        <Form.Control as="select" value={selectedStatus} onChange={handleStatusChange}>
                            <option value="">Select Status</option>
                            <option value="Available">Available</option>
                            <option value="Booked">Booked</option>
                            <option value="Under Maintenance">Under Maintenance</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>


            {rooms.length > 0 && (
                <div>
                    <h2>Room List {selectedDorm && `for Dorm ${selectedDorm}`}</h2>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Room Number</th>
                                <th>Room Category</th>
                                <th>Floor</th>
                                <th>Gender</th>
                                <th>Price</th>
                                <th>Availability</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRooms.map((room) => (
                                <tr key={room.room_id}>
                                    <td>{room.room_number}</td>
                                    <td>{room.room_category_name}</td>
                                    <td>{room.floor_number}</td>
                                    <td>{room.gender}</td>
                                    <td>{room.price.toLocaleString()}</td>
                                    <td>{room.availability_status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    {/* Pagination controls */}
                    <Pagination>
                        <Pagination.Prev
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        />
                        {[...Array(totalPages)].map((_, index) => (
                            <Pagination.Item
                                key={index + 1}
                                active={index + 1 === currentPage}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        />
                    </Pagination>
                </div>
            )}
        </div>
    );
};

export default ListAllRoom;
