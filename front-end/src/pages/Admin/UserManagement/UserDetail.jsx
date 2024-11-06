// UserDetail.js
import "./UserDetail.scss";
import { formatDate } from "../../../utils/formatDate";
import axios from "../../../utils/axios";
import { useEffect, useState } from "react";
import Spinner from "../../../components/Spinner/Spinner";

const UserDetail = ({ userId, onClose }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const getUserDetail = async () => {
    try {
      const res = await axios.get(`/user/${userId}`);
      if (res.status === 200) {
        setLoading(false);
        setUser(res.data.data);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserDetail();
  }, []);

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="user-detail-modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <h2>User Details</h2>
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Gender:</strong> {user.gender ? "Male" : "Female"}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
        <p>
          <strong>Status:</strong> {user.status ? "Active" : "Inactive"}
        </p>
        <p>
          <strong>Created At:</strong> {formatDate(user.created_at)}
        </p>
        <p>
          <strong>Start Date:</strong> {user.start_date ? formatDate(user.start_date) : "N/A"}
        </p>
        <p>
          <strong>End Date:</strong> {user.end_date ? formatDate(user.end_date) : "N/A"}
        </p>
        <p>
          <strong>Bed:</strong> {user.bed || "N/A"}
        </p>
        <p>
          <strong>Room:</strong> {user.room || "N/A"}
        </p>
        <p>
          <strong>Room Type:</strong> {user.roomType || "N/A"}
        </p>
        <p>
          <strong>Floor:</strong> {user.floor || "N/A"}
        </p>
        <p>
          <strong>Dorm:</strong> {user.dorm || "N/A"}
        </p>
      </div>
    </div>
  );
};

export default UserDetail;
