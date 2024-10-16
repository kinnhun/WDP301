import { useState } from 'react';
import { Button, Card, Modal, Table } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';

const Requests = () => {
    // Sample request data
    const requestData = [
        {
            requestType: 'Đăng ký check out',
            content: 'Check out giường 6 phòng A105R',
            reply: 'DONE',
            semester: 'Summer - 2023',
            createdDate: '07/08/2023 18:08',
            status: 'Checkout thành công',
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
                        <th>Request Type</th>
                        <th>Content</th>
                        <th>Reply</th>
                        <th>Semester</th>
                        <th>Created Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {requestData.map((request, index) => (
                        <tr key={index}>
                            <td>{request.requestType}</td>
                            <td>{request.content}</td>
                            <td>{request.reply}</td>
                            <td>{request.semester}</td>
                            <td>{request.createdDate}</td>
                            <td>{request.status}</td>
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
                            <p><strong>Request Type:</strong> {selectedRequest.requestType}</p>
                            <p><strong>Content:</strong> {selectedRequest.content}</p>
                            <p><strong>Reply:</strong> {selectedRequest.reply}</p>
                            <p><strong>Semester:</strong> {selectedRequest.semester}</p>
                            <p><strong>Created Date:</strong> {selectedRequest.createdDate}</p>
                            <p><strong>Status:</strong> {selectedRequest.status}</p>
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
