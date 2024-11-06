import "./RequestTable.scss";
import { useSelector, useDispatch } from "react-redux";
import { getRequests, setFilter } from "../../../stores/slices/requestSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyPagination from "../../../components/Pagination/Pagination";
import toast from "react-hot-toast";
import axios from "../../../utils/axios";
import { Modal, Button, Form } from "react-bootstrap";

function RequestTable() {
  //redux
  const requests = useSelector((state) => state.request.sortedList);
  const filters = useSelector((state) => state.request.filters);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newRequestTitle, setNewRequestTitle] = useState("");
  const [newRequestContent, setNewRequestContent] = useState("");
  const [requestTypes, setRequestTypes] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 10;
  const totalPages = Math.ceil(requests.length / itemPerPage);
  const indexOfLastUser = currentPage * itemPerPage;
  const indexOfFirstUser = indexOfLastUser - itemPerPage;
  const currentRequests = requests.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const toLocaleData = (isoDate) => {
    const date = new Date(isoDate);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    dispatch(getRequests());
  }, [dispatch]);

  const handleFilterChange = (filterName, value) => {
    dispatch(setFilter({ [filterName]: value }));
  };

  const handleCreateNewRequest = () => {
    setShowCreateModal(true);
  };

  const handleClose = () => {
    setNewRequestTitle("");
    setNewRequestContent("");
    setShowCreateModal(false); // Close Create modal
  };

  const handleSubmitNewRequest = async () => {
    try {
      if (newRequestTitle === "" || newRequestContent === "") {
        toast.error("Please fill in all fields");
        return;
      }

      const response = await axios.post("/requests", {
        room_id: 3,
        // user_id: userId,
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

  return (
    <div className="request-table">
      <div className="filters">
        <input
          className="form-control"
          type="text"
          placeholder="Filter by Request Type"
          value={filters.requestType}
          onChange={(e) => handleFilterChange("requestType", e.target.value)}
        />
        <input
          className="form-control"
          type="text"
          placeholder="Filter by Room"
          value={filters.room}
          onChange={(e) => handleFilterChange("room", e.target.value)}
        />
        <input
          className="form-control"
          type="text"
          placeholder="Filter by Email"
          value={filters.email}
          onChange={(e) => handleFilterChange("email", e.target.value)}
        />
        <button className="btn btn-primary mb-4" onClick={handleCreateNewRequest}>
          Create New Request
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th width="15%">Room</th>
            <th width="25%">Student</th>
            <th width="20%">Request Type</th>
            <th width="25%">Created At</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {currentRequests.map((msg, index) => (
            <tr
              key={index}
              onClick={() => {
                navigate(`/manager/requests/${msg.request_id}`);
              }}
            >
              <td>{msg.room_number}</td>
              <td>{msg.email}</td>
              <td>{msg.request_type}</td>
              <td>{toLocaleData(msg.created_at)}</td>
              <td className={`status ${msg.status}`}>{msg.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
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

      {totalPages > 1 && (
        <MyPagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default RequestTable;
