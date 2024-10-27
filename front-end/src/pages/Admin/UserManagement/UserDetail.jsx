// UserDetail.js
import "./UserDetail.scss";
import { formatDate } from "../../../utils/formatDate";

const UserDetail = ({ user, onClose }) => {
  if (!user) return null;

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
