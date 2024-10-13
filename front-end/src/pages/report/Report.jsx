import React, { useState } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';

const Report = () => {
  const [showModal, setShowModal] = useState(false);
  const [roomIssue, setRoomIssue] = useState({
    roomNumber: '',
    floor: '',
    issueDescription: '',
  });

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoomIssue((prevIssue) => ({
      ...prevIssue,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Room Issue Reported:', roomIssue);
    // You can handle saving the report here (e.g., sending to an API)
    handleClose();
  };

  return (
    <div className="container mt-4">
      <h1>Room Reports</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Room Number</th>
            <th>Floor</th>
            <th>Issue Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>A101</td>
            <td>1st Floor</td>
            <td>Broken Window</td>
            <td>Pending</td>
          </tr>
          <tr>
            <td>B202</td>
            <td>2nd Floor</td>
            <td>Air Conditioner not working</td>
            <td>Resolved</td>
          </tr>
          <tr>
            <td>C303</td>
            <td>3rd Floor</td>
            <td>Leaking Pipe</td>
            <td>In Progress</td>
          </tr>
        </tbody>
      </Table>

      <Button variant="primary" onClick={handleShow}>
        Report a Room Issue
      </Button>

      {/* Modal to create a new report */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Report a Room Issue</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formRoomNumber">
              <Form.Label>Room Number</Form.Label>
              <Form.Control
                type="text"
                name="roomNumber"
                placeholder="Enter room number"
                value={roomIssue.roomNumber}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formFloor">
              <Form.Label>Floor</Form.Label>
              <Form.Control
                type="text"
                name="floor"
                placeholder="Enter floor number"
                value={roomIssue.floor}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formIssueDescription">
              <Form.Label>Issue Description</Form.Label>
              <Form.Control
                as="textarea"
                name="issueDescription"
                placeholder="Describe the issue"
                value={roomIssue.issueDescription}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Submit Report
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Report;
