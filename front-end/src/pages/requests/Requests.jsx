import { useState } from 'react';
import { Button, Card, Modal, Table } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';

const Requests = () => {
    // Sample request data
    const requestData = [
        {
            room_id: 1,
            user_id: 1,
            description: 'Check out giường 6 phòng A105R',
            status: 'Checkout thành công',
            created_at: '07/08/2023 18:08',
            updated_at: '07/08/2023 19:00',
            request_type: 'Đăng ký check out',
            reply: 'DONE',
            semester: 'Summer - 2023',
        },
        // Add more request records as needed
    ];

    // State for modal visibility and selected request
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showRateModal, setShowRateModal] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [rating, setRating] = useState(0);

    // Handlers for showing modals
    const handleShowDetail = (request) => {
        setSelectedRequest(request);
        setShowDetailModal(true);
    };

    const handleShowRate = () => {
        setShowRateModal(true);
    };

    const handleClose = () => {
        setShowDetailModal(false);
        setShowRateModal(false);
    };

    // Handle star rating selection
    const handleRatingClick = (rate) => {
        setRating(rate);
    };

    return (
        <div className="container mt-4">
            <h1>My Requests</h1>
            <Button variant="primary" className="mb-4">Create New Request</Button>

            <Card>
                <Card.Body>
                    <Card.Title>Your Processing CIM Request: 0</Card.Title>
                </Card.Body>
            </Card>

            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>Room ID</th>
                        <th>User ID</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Created Date</th>
                        <th>Updated Date</th>
                        <th>Request Type</th>
                        <th>Reply</th>
                        <th>Semester</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {requestData.map((request, index) => (
                        <tr key={index}>
                            <td>{request.room_id}</td>
                            <td>{request.user_id}</td>
                            <td>{request.description}</td>
                            <td>{request.status}</td>
                            <td>{request.created_at}</td>
                            <td>{request.updated_at}</td>
                            <td>{request.request_type}</td>
                            <td>{request.reply}</td>
                            <td>{request.semester}</td>
                            <td>
                                <Button variant="info" className="me-2" onClick={() => handleShowDetail(request)}>Details</Button>
                                <Button variant="warning" onClick={handleShowRate}>Rate</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Details Modal */}
            <Modal show={showDetailModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Request Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedRequest && (
                        <>
                            <p><strong>Room ID:</strong> {selectedRequest.room_id}</p>
                            <p><strong>User ID:</strong> {selectedRequest.user_id}</p>
                            <p><strong>Description:</strong> {selectedRequest.description}</p>
                            <p><strong>Status:</strong> {selectedRequest.status}</p>
                            <p><strong>Created Date:</strong> {selectedRequest.created_at}</p>
                            <p><strong>Updated Date:</strong> {selectedRequest.updated_at}</p>
                            <p><strong>Request Type:</strong> {selectedRequest.request_type}</p>
                            <p><strong>Reply:</strong> {selectedRequest.reply}</p>
                            <p><strong>Semester:</strong> {selectedRequest.semester}</p>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Rate Modal */}
            <Modal show={showRateModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Rate Request</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex justify-content-center">
                        {[1, 2, 3, 4, 5].map(star => (
                            <FaStar
                                key={star}
                                size={40}
                                className="me-2"
                                onClick={() => handleRatingClick(star)}
                                color={star <= rating ? "gold" : "grey"}
                                style={{ cursor: 'pointer' }}
                            />
                        ))}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => alert(`You rated ${rating} stars!`)}>
                        Submit Rating
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Requests;
