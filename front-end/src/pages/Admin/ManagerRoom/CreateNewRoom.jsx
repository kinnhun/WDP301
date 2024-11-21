import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateNewRoom = () => {
    const [dorms, setDorms] = useState([]);
    const [floors, setFloors] = useState([]);
    const [roomData, setRoomData] = useState({
        room_number: '',
        room_type_id: '1', // default to "6 beds"
        price: '',
        availability_status: 'Available',
        floor_number: '',
        dorm: '',
        gender: 'Male',
    });

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
            console.error("Error fetching dorms:", error);
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
            console.error("Error fetching floors:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRoomData({
            ...roomData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/room`, roomData);
            if (response.data.success) {
                toast.success('Room created successfully');
            } else {
                toast.error('Failed to create room');
            }
        } catch (error) {
            toast.error('Error creating room');
            console.error("Error submitting room data:", error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Create a New Room</h2>
            <form onSubmit={handleSubmit} className="mt-3">
                <div className="row">
                    {/* Left side of the form */}
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="room_number" className="form-label">Room Number</label>
                            <input
                                type="text"
                                id="room_number"
                                name="room_number"
                                className="form-control"
                                value={roomData.room_number}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
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
                    </div>

                    {/* Right side of the form */}
                    <div className="col-md-6">
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
                </div>
                <button type="submit" className="btn btn-primary">Create Room</button>
            </form>
            {/* Toast Container for displaying toasts */}
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick />
        </div>
    );
};

export default CreateNewRoom;
