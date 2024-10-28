// EditUserRole.js
import { useState } from "react";
import "./EditRole.scss";

const EditRole = ({ user, onClose, handleSaveUserRole }) => {
  const [role, setRole] = useState(user.role);

  const handleSave = () => {
    const data = {
      userId: user.user_id,
      role: role,
    };
    handleSaveUserRole(data);
  };

  return (
    <div className="edit-user-role-modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <h2>Edit User Role</h2>

        <div className="form-group">
          <label>Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="manager">Manager</option>
            <option value="staff">Staff</option>
            <option value="student">Student</option>
          </select>
        </div>
        <button className="btn btn-primary" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditRole;
