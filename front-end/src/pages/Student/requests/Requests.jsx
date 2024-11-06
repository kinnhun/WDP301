import { useState, useEffect } from "react";
import { Button, Card, Modal, Table, Form } from "react-bootstrap";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";
import axios from "../../../utils/axios";
import { verifyAccessToken } from "../../../utils/jwt";
import Spinner from "../../../components/Spinner/Spinner";
import "./Requests.scss";

const Requests = () => {
  const [requests, setRequests] = useState([]);

  const toLocaleData = (isoDate) => {
    const date = new Date(isoDate);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");

    const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
  };

  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [newRequestTitle, setNewRequestTitle] = useState("");
  const [newRequestContent, setNewRequestContent] = useState("");
  const [requestTypes, setRequestTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Handlers for showing modals
  const handleShowDetail = (request) => {
    setSelectedRequest(request);
    setShowDetailModal(true);
  };

  const handleClose = () => {
    setNewRequestTitle("");
    setNewRequestContent("");
    setShowDetailModal(false);

    setShowCreateModal(false); // Close Create modal
  };

  // Handle Create New Request
  const handleCreateNewRequest = () => {
    setShowCreateModal(true);
  };

  const handleSubmitNewRequest = async () => {
    try {
      if (newRequestTitle === "" || newRequestContent === "") {
        toast.error("Please fill in all fields");
        return;
      }
      const token = JSON.parse(localStorage.getItem("token"));
      const userId = verifyAccessToken(token).id;
      const response = await axios.post("/requests", {
        room_id: 3,
        user_id: userId,
        request_type: newRequestTitle,
        description: newRequestContent,
      });
      if (response.status === 201) {
        toast.success("Create request successfully");
        handleClose();
        getRequests();
      }
    } catch (error) {
      toast.error("Create request failed");
    }
  };

  const getRequests = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const userId = verifyAccessToken(token).id;
      setIsLoading(true);
      const response = await axios.get(`/requests/${userId}/user`);
      if (response.status === 200) {
        setRequests(response.data.data);
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("Get requests failed");
      setIsLoading(false);
    }
  };

  const getRequestTypes = async () => {
    try {
      const response = await axios.get(`/requests/types`);
      if (response.status === 200) {
        setRequestTypes(response.data.data);
      }
    } catch (error) {
      toast.error("Get request types failed");
    }
  };

  useEffect(() => {
    getRequests();
    getRequestTypes();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="container mt-4">
      <h1>My Requests</h1>
      <Button variant="primary" className="mb-4" onClick={handleCreateNewRequest}>
        Create New Request
      </Button>

      <Card>
        <Card.Body>
          <Card.Title>Your Processing CIM Request: {requests.length}</Card.Title>
        </Card.Body>
      </Card>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th width="5%">Room ID</th>
            <th width="20%">Request Type</th>
            <th width="20%">Reply</th>
            <th width="10%">Status</th>
            <th width="15%">Created Date</th>
            <th width="15%">Updated Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request, index) => (
            <tr key={index}>
              <td>{request.room_id}</td>
              <td>{request.request_type}</td>
              <td>{request.reply}</td>
              <td>{request.status}</td>
              <td>{toLocaleData(request.created_at)}</td>
              <td>{toLocaleData(request.updated_at)}</td>
              <td>
                <Button variant="info" className="me-2" onClick={() => handleShowDetail(request)}>
                  Details
                </Button>
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
              <p>
                <strong>Room ID:</strong> {selectedRequest.room_id}
              </p>
              <p>
                <strong>User ID:</strong> {selectedRequest.user_id}
              </p>
              <p>
                <strong>Description:</strong> {selectedRequest.description}
              </p>
              <p>
                <strong>Status:</strong> {selectedRequest.status}
              </p>
              <p>
                <strong>Created Date:</strong> {toLocaleData(selectedRequest.created_at)}
              </p>
              <p>
                <strong>Updated Date:</strong> {toLocaleData(selectedRequest.updated_at)}
              </p>
              <p>
                <strong>Request Type:</strong> {selectedRequest.request_type}
              </p>
              <p>
                <strong>Reply:</strong> {selectedRequest.reply}
              </p>
              <p>
                <strong>Semester:</strong> {selectedRequest.semester}
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showCreateModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formRequestTitle">
              <Form.Label>Select Title</Form.Label>
              <Form.Control
                as="select"
                value={newRequestTitle}
                onChange={(e) => setNewRequestTitle(e.target.value)}
              >
                <option value="" selected hidden>
                  Choose...
                </option>
                {requestTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.type_name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formRequestContent" className="mt-3">
              <Form.Label>Request Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newRequestContent}
                onChange={(e) => setNewRequestContent(e.target.value)}
                maxLength="200"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitNewRequest}>
            Submit Request
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Requests;
