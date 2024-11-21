import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Form, Row, Table, Pagination, Button } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead'; // Import Typeahead
import 'react-bootstrap-typeahead/css/Typeahead.css';

const ListAllRoom = () => {
    const [dorms, setDorms] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [searchRooms, setSearchRooms] = useState([]); // State for search results
    const [expiredRoomIds, setExpiredRoomIds] = useState([]); // State for expired room IDs
    const [selectedDorm, setSelectedDorm] = useState("");
    const [selectedFloor, setSelectedFloor] = useState("");
    const [floors, setFloors] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [roomsPerPage, setRoomsPerPage] = useState(5);

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

    const fetchRooms = async (dorm = "", floor = "", status = "") => {
        try {
            const params = [];
            if (dorm) params.push(`dorm=${dorm}`);
            if (floor) params.push(`floor=${floor}`);
            if (status) params.push(`status=${status}`);
            const url = params.length > 0
                ? `${import.meta.env.VITE_BASE_URL}/api/room?${params.join("&")}`
                : `${import.meta.env.VITE_BASE_URL}/api/room`;

            const response = await axios.get(url);
            if (response.data.success) {
                setRooms(response.data.data);
                setSearchRooms(response.data.data); // Initialize search results with full list
            }
        } catch (error) {
            console.error("Error fetching rooms:", error);
        }
    };

    const fetchExpiredRoomIds = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/room/rooms/bookings/expired`);
            if (response.data.success) {
                const ids = response.data.data.map(item => item.room_id);
                setExpiredRoomIds(ids);
            }
        } catch (error) {
            console.error("Error fetching expired room IDs:", error);
        }
    };

    useEffect(() => {
        fetchDorms();
        fetchFloors();
        fetchExpiredRoomIds(); // Fetch expired room IDs
    }, []);

    useEffect(() => {
        fetchRooms(selectedDorm, selectedFloor, selectedStatus);
    }, [selectedDorm, selectedFloor, selectedStatus]);

    const handleDormChange = (e) => {
        setSelectedDorm(e.target.value);
    };

    const handleFloorChange = (e) => {
        setSelectedFloor(e.target.value);
    };

    const handleStatusChange = (e) => {
        setSelectedStatus(e.target.value);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSearch = (selected) => {
        if (selected.length > 0) {
            const filteredRooms = rooms.filter((room) =>
                room.room_number === selected[0]
            );
            setSearchRooms(filteredRooms); // Update search results
        } else {
            setSearchRooms(rooms); // Reset to full list if no selection
        }
    };

    const handleChangeRoomStatus = async (roomId, status) => {
        try {
            // Gọi API để cập nhật trạng thái của phòng
            const response = await axios.put(
                `${import.meta.env.VITE_BASE_URL}/api/room/change/availability-status`, // Endpoint của API
                {}, // Body rỗng vì bạn chỉ dùng query params
                {
                    params: {
                        id: roomId, // Truyền roomId vào query params
                        availability_status: status // Truyền trạng thái mới
                    }
                }
            );

            if (response.data.success) {
                console.log(`Room status changed to ${status} successfully!`);
                // Nếu cập nhật thành công, làm mới dữ liệu phòng
                fetchRooms(selectedDorm, selectedFloor, selectedStatus);
            } else {
                console.error(`Failed to change room status to ${status}:`, response.data.message);
            }
        } catch (error) {
            console.error("Error changing room status:", error);
        }
    };

    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = searchRooms.slice(indexOfFirstRoom, indexOfLastRoom);

    const totalPages = Math.ceil(searchRooms.length / roomsPerPage);

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

                <Col md={4} sm={12}>
                    <Form.Group controlId="status1">
                        <Form.Label>Status</Form.Label>
                        <Form.Control as="select" value={selectedStatus} onChange={handleStatusChange}>
                            <option value="">Select Status</option>
                            <option value="Available">Available</option>
                            <option value="Booked">Booked</option>
                            <option value="Under Maintenance">Under Maintenance</option>
                            <option value="Inactive">Inactive</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>

            <Row className="mt-4">
                <Col>
                    <Typeahead
                        id="room-search"
                        labelKey="room_number"
                        options={rooms.map((room) => room.room_number)} // Room numbers for search
                        placeholder="Search by Room Number"
                        onChange={handleSearch}
                        clearButton
                    />
                </Col>
            </Row>

            {searchRooms.length > 0 && (
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
                                <th>Actions</th>
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
                                    <td>
                                        {!expiredRoomIds.includes(room.room_id) && (
                                            <>
                                                {/* Nút để thay đổi trạng thái thành Inactive */}
                                                <Button
                                                    variant="warning"
                                                    size="sm"
                                                    className="me-2"
                                                    onClick={() => handleChangeRoomStatus(room.room_id, 'Inactive')}
                                                >
                                                    Inactive
                                                </Button>

                                                {/* Nút để thay đổi trạng thái thành Under Maintenance */}
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    className="me-2"
                                                    onClick={() => handleChangeRoomStatus(room.room_id, 'Under Maintenance')}
                                                >
                                                    Under Maintenance
                                                </Button>

                                                {/* Nút để thay đổi trạng thái thành Available */}
                                                <Button
                                                    variant="success"
                                                    size="sm"
                                                    onClick={() => handleChangeRoomStatus(room.room_id, 'Available')}
                                                >
                                                    Available
                                                </Button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <Pagination>
                        <Pagination.Prev
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        />

                        {totalPages > 5 && currentPage > 3 && (
                            <>
                                <Pagination.Item onClick={() => handlePageChange(1)}>
                                    1
                                </Pagination.Item>
                                <Pagination.Ellipsis />
                            </>
                        )}

                        {currentPage - 1 > 0 && (
                            <Pagination.Item onClick={() => handlePageChange(currentPage - 1)}>
                                {currentPage - 1}
                            </Pagination.Item>
                        )}
                        <Pagination.Item active>{currentPage}</Pagination.Item>
                        {currentPage + 1 <= totalPages && (
                            <Pagination.Item onClick={() => handlePageChange(currentPage + 1)}>
                                {currentPage + 1}
                            </Pagination.Item>
                        )}

                        {totalPages > 5 && currentPage < totalPages - 2 && (
                            <>
                                <Pagination.Ellipsis />
                                <Pagination.Item onClick={() => handlePageChange(totalPages)}>
                                    {totalPages}
                                </Pagination.Item>
                            </>
                        )}

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
