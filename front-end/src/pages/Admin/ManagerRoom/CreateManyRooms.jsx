import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateManyRooms = () => {
    const [dorms, setDorms] = useState([]);
    const [floors, setFloors] = useState([]);
    const [roomData, setRoomData] = useState({
        room_type_id: '1', // default to "6 beds"
        price: '',
        availability_status: 'Available',
        floor_number: '',
        dorm: '',
        dorm_name: '', // Added field for dorm name
        gender: 'Male',
    });

    const [rooms, setRooms] = useState([]); // Track multiple rooms
    const [roomLimit, setRoomLimit] = useState(1); // Number of rooms to create

    // Fetch dorms and floors on component mount
    useEffect(() => {
        fetchDorms();
        fetchFloors();
    }, []);

    const fetchDorms = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/room/dorms/all`);
            if (response.data.success) {
                setDorms(response.data.data);
            } else {
                toast.error('Failed to fetch dorms');
            }
        } catch (error) {
            toast.error('Error fetching dorms');
            console.error('Error fetching dorms:', error);
        }
    };

    const fetchFloors = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/room/floor/all`);
            if (response.data.success) {
                setFloors(response.data.data);
            } else {
                toast.error('Failed to fetch floors');
            }
        } catch (error) {
            toast.error('Error fetching floors');
            console.error('Error fetching floors:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRoomData({
            ...roomData,
            [name]: value,
        });
    };

    const handleRoomLimitChange = (e) => {
        setRoomLimit(e.target.value);
    };

    const generateRoomNumber = (floorNumber, roomIndex) => {
        // Format the room number: first digit is the floor, the rest are the room number with leading zeros
        return `${floorNumber}${String(roomIndex).padStart(2, '0')}`;
    };

    const handleRoomAddition = () => {
        const newRooms = [];
        for (let i = 1; i <= roomLimit; i++) {
            const roomNumber = generateRoomNumber(roomData.floor_number, i);
            newRooms.push({
                ...roomData,
                room_number: roomNumber,
            });
        }
        setRooms([...rooms, ...newRooms]);
        setRoomData({
            room_type_id: '1',
            price: '',
            availability_status: 'Available',
            floor_number: '',
            dorm: '',
            dorm_name: '', // Reset dorm name
            gender: 'Male',
        });
        setRoomLimit(1); // Reset room limit after adding
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const roomCreationPromises = rooms.map(async (room) => {
                const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/room`, room);
                if (response.data.success) {
                    toast.success('Room created successfully');
                } else {
                    toast.error('Failed to create room');
                }
            });

            await Promise.all(roomCreationPromises);
        } catch (error) {
            toast.error('Error creating rooms');
            console.error('Error submitting room data:', error);
        }
    };

    const handleReset = () => {
        // Reset form and room list
        setRoomData({
            room_type_id: '1',
            price: '',
            availability_status: 'Available',
            floor_number: '',
            dorm: '',
            dorm_name: '', // Reset dorm name
            gender: 'Male',
        });
        setRooms([]); // Clear the rooms list
        setRoomLimit(1); // Reset room limit
    };

    return (
        <div className="container mt-5">
            <h2>Create Multiple Rooms</h2>
            <form onSubmit={handleSubmit} className="mt-3">
                <div className="row">
                    {/* Left side of the form */}
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="room_type_id" className="form-label">Room Type</label>
                            <select
                                id="room_type_id"
                                name="room_type_id"
                                className="form-select"
                                value={roomData.room_type_id}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="1">6 Beds</option>
                                <option value="2">4 Beds</option>
                                <option value="3">3 Beds</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="room_limit" className="form-label">Room Limit</label>
                            <input
                                type="number"
                                id="room_limit"
                                name="room_limit"
                                className="form-control"
                                value={roomLimit}
                                onChange={handleRoomLimitChange}
                                min="1"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Room Price</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                className="form-control"
                                value={roomData.price}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="gender" className="form-label">Gender</label>
                            <select
                                id="gender"
                                name="gender"
                                className="form-select"
                                value={roomData.gender}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                    </div>

                    {/* Right side of the form */}
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="dorm" className="form-label">Dormitory</label>
                            <select
                                id="dorm"
                                name="dorm"
                                className="form-select"
                                value={roomData.dorm}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select Dormitory</option>
                                {dorms.map((dorm) => (
                                    <option key={dorm.dorm} value={dorm.dorm}>
                                        {dorm.dorm}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* New input for dormitory name */}
                        <div className="mb-3">
                            <label htmlFor="dorm_name" className="form-label">Dormitory Name</label>
                            <input
                                type="text"
                                id="dorm_name"
                                name="dorm_name"
                                className="form-control"
                                value={roomData.dorm_name}
                                onChange={handleInputChange}
                                placeholder="Enter Dormitory Name"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="availability_status" className="form-label">Availability Status</label>
                            <select
                                id="availability_status"
                                name="availability_status"
                                className="form-select"
                                value={roomData.availability_status}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="Available">Available</option>
                                <option value="Under Maintenance">Under Maintenance</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="floor_number" className="form-label">Floor</label>
                            <select
                                id="floor_number"
                                name="floor_number"
                                className="form-select"
                                value={roomData.floor_number}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select Floor</option>
                                {floors.map((floor) => (
                                    <option key={floor.floor_number} value={floor.floor_number}>
                                        {floor.floor_number}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <button type="button" onClick={handleRoomAddition} className="btn btn-secondary me-2">Add Rooms</button>
                <button type="submit" className="btn btn-primary me-2">Create Rooms</button>
                <button type="button" onClick={handleReset} className="btn btn-danger">Reset</button>
            </form>

            {/* Display rooms added in a table */}
            {rooms.length > 0 && (
                <div className="mt-5">
                    <h4>Added Rooms</h4>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Room Number</th>
                                <th>Room Type</th>
                                <th>Price</th>
                                <th>Gender</th>
                                <th>Status</th>
                                <th>Floor</th>
                                <th>Dormitory</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rooms.map((room, index) => (
                                <tr key={index}>
                                    <td>{room.room_number}</td>
                                    <td>{room.room_type_id === '1' ? '6 Beds' : room.room_type_id === '2' ? '4 Beds' : '3 Beds'}</td>
                                    <td>{room.price}</td>
                                    <td>{room.gender}</td>
                                    <td>{room.availability_status}</td>
                                    <td>{room.floor_number}</td>
                                    <td>{room.dorm_name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <ToastContainer />
        </div>
    );
};

export default CreateManyRooms;
