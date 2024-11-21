import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateManyRooms = () => {
    const [dorms, setDorms] = useState([]);
    const [floors, setFloors] = useState([]);
    const [roomData, setRoomData] = useState({
        room_type_id: '1',
        price: '',
        availability_status: 'Available',
        floor_number: '',
        dorm: '',
        gender: 'Male',
    });

    const [rooms, setRooms] = useState([]);
    const [roomLimit, setRoomLimit] = useState(1);
    const [isFormDisabled, setIsFormDisabled] = useState(false);
    const [useDormName, setUseDormName] = useState(false); // Toggle between select or input dorm

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

    const generateRoomNumber = (dorm, floorNumber, roomIndex) => {
        return `${dorm}${floorNumber}${String(roomIndex).padStart(2, '0')}`;
    };

    const handleRoomAddition = () => {
        if (!roomData.dorm || !roomData.floor_number) {
            toast.error("Please select both Dormitory and Floor.");
            return;
        }

        const newRooms = [];
        const roomStartIndex = rooms.length + 1;

        for (let i = roomStartIndex; i < roomStartIndex + parseInt(roomLimit); i++) {
            const roomNumber = generateRoomNumber(
                roomData.dorm,
                roomData.floor_number,
                i
            );
            // Check for duplicates in the current rooms array
            if (rooms.some((room) => room.room_number === roomNumber)) {
                toast.error(`Duplicate room number: ${roomNumber}.`);
                return;
            }
            newRooms.push({
                ...roomData,
                room_number: roomNumber,
            });
        }

        setRooms([...rooms, ...newRooms]);
        setIsFormDisabled(true);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const roomCreationPromises = rooms.map(async (room) => {
                const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/room`, room);
                if (response.data.success) {
                    toast.success(`Room ${room.room_number} created successfully`);
                } else {
                    toast.error(`Failed to create room ${room.room_number}`);
                }
            });
            await Promise.all(roomCreationPromises);
        } catch (error) {
            toast.error('Error creating rooms');
        }
    };

    const handleReset = () => {
        setRoomData({
            room_type_id: '1',
            price: '',
            availability_status: 'Available',
            floor_number: '',
            dorm: '',
            gender: 'Male',
        });
        setRooms([]);
        setRoomLimit(1);
        setIsFormDisabled(false);
        setUseDormName(false); // Reset dorm type selection
    };

    const toggleDormNameUsage = () => {
        setUseDormName(!useDormName);
        setRoomData({ ...roomData, dorm: '' }); // Reset dorm field
    };

    return (
        <div className="container mt-5">
            <h2>Create Multiple Rooms</h2>
            <form onSubmit={handleSubmit} className="mt-3">
                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="room_type_id" className="form-label">Room Type</label>
                            <select
                                id="room_type_id"
                                name="room_type_id"
                                className="form-select"
                                value={roomData.room_type_id}
                                onChange={handleInputChange}
                                disabled={isFormDisabled}
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
                                disabled={isFormDisabled}
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
                                disabled={isFormDisabled}
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
                                disabled={isFormDisabled}
                                required
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="useDormName" className="form-label">Dormitory Selection</label>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="useDormName"
                                    checked={useDormName}
                                    onChange={toggleDormNameUsage}
                                    disabled={isFormDisabled}
                                />
                                <label className="form-check-label" htmlFor="useDormName">
                                    Use Dormitory Name instead of Select Dormitory
                                </label>
                            </div>
                        </div>

                        {!useDormName ? (
                            <div className="mb-3">
                                <label htmlFor="dorm" className="form-label">Dormitory</label>
                                <select
                                    id="dorm"
                                    name="dorm"
                                    className="form-select"
                                    value={roomData.dorm}
                                    onChange={handleInputChange}
                                    disabled={isFormDisabled}
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
                        ) : (
                            <div className="mb-3">
                                <label htmlFor="dorm" className="form-label">Dormitory Name</label>
                                <input
                                    type="text"
                                    id="dorm"
                                    name="dorm"
                                    className="form-control"
                                    value={roomData.dorm}
                                    onChange={handleInputChange}
                                    disabled={isFormDisabled}
                                    required
                                />
                            </div>
                        )}

                        <div className="mb-3">
                            <label htmlFor="availability_status" className="form-label">Availability Status</label>
                            <select
                                id="availability_status"
                                name="availability_status"
                                className="form-select"
                                value={roomData.availability_status}
                                onChange={handleInputChange}
                                disabled={isFormDisabled}
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
                                disabled={isFormDisabled}
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
                                    <td>{room.dorm}</td>
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
