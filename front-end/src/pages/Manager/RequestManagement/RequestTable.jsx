import "./RequestTable.scss";
import { useSelector, useDispatch } from "react-redux";
import { getRequests, setFilter } from "../../../stores/slices/requestSlice";
import { getUsers } from "../../../stores/slices/userSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyPagination from "../../../components/Pagination/Pagination";
import toast from "react-hot-toast";
import axios from "../../../utils/axios";
import { Modal, Button, Form } from "react-bootstrap";

function RequestTable() {
  const requests = useSelector((state) => state.request.sortedList);
  const filters = useSelector((state) => state.request.filters);
  const users = useSelector((state) => state.user.userList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newRequestTitle, setNewRequestTitle] = useState("");
  const [newRequestContent, setNewRequestContent] = useState("");
  const [newRequestEmail, setNewRequestEmail] = useState("");
  const [newRequestRoom, setNewRequestRoom] = useState(""); // State for selected room
  const [requestTypes, setRequestTypes] = useState([]);
  const [rooms, setRooms] = useState([]);

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
    return `${date.getUTCDate()}-${String(date.getUTCMonth() + 1).padStart(
      2,
      "0"
    )}-${date.getUTCFullYear()} ${String(date.getUTCHours()).padStart(2, "0")}:${String(
      date.getUTCMinutes()
    ).padStart(2, "0")}:${String(date.getUTCSeconds()).padStart(2, "0")}`;
  };

  const getRooms = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/room`);
      if (response.status === 200) {
        setRooms(response.data.data);
      } else {
        console.error("Không thể lấy dữ liệu danh mục phòng:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching room categories:", error);
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
    dispatch(getRequests());
    dispatch(getUsers());
    getRequestTypes();
    getRooms();
    getRequestTypes();
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
    setNewRequestEmail("");
    setNewRequestRoom(""); // Reset room field
    setShowCreateModal(false);
  };

  const handleSubmitNewRequest = async () => {
    try {
      if (!newRequestTitle || !newRequestContent || !newRequestEmail || !newRequestRoom) {
        toast.error("Please fill in all fields");
        return;
      }

      const response = await axios.post("/requests", {
        room_id: newRequestRoom,
        user_id: newRequestEmail,
        request_type: newRequestTitle,
        description: newRequestContent,
      });
      if (response.status === 201) {
        toast.success("Create request successfully");
        handleClose();
        dispatch(getRequests());
      }
    } catch (error) {
      toast.error("Create request failed");
    }
  };

  const staffUsers = users.filter((user) => user.role === "staff");

  return (
    <div className="request-table">
      <div className="filters">
        <select
          className="form-control"
          value={filters.requestType}
          onChange={(e) => handleFilterChange("requestType", e.target.value)}
        >
          <option value="">Filter by Request Type</option>
          {requestTypes.map((type) => (
            <option key={type.id} value={type.type_name}>
              {type.type_name}
            </option>
          ))}
        </select>
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
                navigate(`/manager/request/${msg.request_id}`);
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
            <Form.Group controlId="formRequestEmail" className="mt-3">
              <Form.Label>Select Email</Form.Label>
              <Form.Control
                as="select"
                value={newRequestEmail}
                onChange={(e) => setNewRequestEmail(e.target.value)}
              >
                <option value="" hidden>
                  Choose...
                </option>
                {staffUsers.map((user) => (
                  <option key={user.id} value={user.user_id}>
                    {user.email}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formRequestRoom">
              <Form.Label>Select Room</Form.Label>
              <Form.Control
                as="select"
                value={newRequestRoom}
                onChange={(e) => setNewRequestRoom(e.target.value)}
              >
                <option value="" hidden>
                  Choose...
                </option>
                {rooms.map((room) => (
                  <option key={room.id} value={room.room_id}>
                    {room.room_number}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formRequestTitle" className="mt-3">
              <Form.Label>Select Title</Form.Label>
              <Form.Control
                as="select"
                value={newRequestTitle}
                onChange={(e) => setNewRequestTitle(e.target.value)}
              >
                <option value="" hidden>
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
