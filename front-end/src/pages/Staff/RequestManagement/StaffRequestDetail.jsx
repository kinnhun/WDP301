import axios from "../../../utils/axios";
import "./RequestDetail.scss";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { formatDate } from "../../../utils/formatDate";
import toast from "react-hot-toast";

function StaffRequestDetail() {
  const { id } = useParams();
  const [request, setRequest] = useState({});
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const getRequest = async (id) => {
    try {
      const response = await axios.get(`/requests/${id}`);
      if (response.status === 200) {
        setRequest(response.data.data);
        setMessage(response.data.data.reply || "");
        setStatus(response.data.data.status || "Pending");
      }
    } catch (error) {
      console.log(error);
      toast.error("Get request failed");
    }
  };

  const updateRequest = async (data, id) => {
    try {
      const response = await axios.patch(`/requests/${id}`, data);
      if (response.status === 200) {
        toast.success("Update request successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Update request failed");
    }
  };

  const handleSubmit = () => {
    if (status === "pending") {
      alert("Please select a status");
      return;
    }
    if (message === "") {
      alert("Please enter a message");
      return;
    }
    const data = {
      status: status,
      reply: message,
    };
    updateRequest(data, id);
  };

  useEffect(() => {
    getRequest(id);
  }, []);

  return (
    <div className="request-detail">
      <div className="request-detail-content">
        <h2 className="request-detail__title">Request Details</h2>
        <button className="btn btn-primary" onClick={() => navigate("/staff/requests")}>
          Back
        </button>
        <div className="detail-item">
          <strong>Room:</strong> {request.room_number}
        </div>

        <div className="detail-item">
          <strong>Request Type:</strong> {request.request_type}
        </div>
        <div className="detail-item">
          <strong>Created At:</strong> {formatDate(request.created_at)}
        </div>

        <div className="detail-item">
          <strong>Description:</strong> {request.description}
        </div>

        <div className="detail-item message-input">
          <label>
            <strong>Message:</strong>
          </label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message"
            maxLength="200"
          />
        </div>

        <div className="detail-item status-select">
          <label>
            <strong>Status:</strong>
          </label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Incompleted">Incompleted</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="detail-item">
          <button className="submit-button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default StaffRequestDetail;
