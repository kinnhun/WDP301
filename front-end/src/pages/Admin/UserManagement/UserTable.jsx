// UserTable.js
import "./UserTable.scss";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, updateUserRole } from "../../../stores/slices/userSlice";
import { useEffect, useState } from "react";
import UserDetail from "./UserDetail";
import EditRole from "./EditRole";

const UserTable = () => {
  const userList = useSelector((state) => state.user.userList);
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState(null);
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const handleViewUser = (user) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  const handleEditUser = (user) => {
    setEditUser(user);
  };

  const handleCloseEditModal = () => {
    setEditUser(null);
  };

  const handleSaveUserRole = (updatedUser) => {
    dispatch(updateUserRole(updatedUser));
    setEditUser(null);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th width="15%">Username</th>
            <th width="25%">Email</th>
            <th width="9%">Gender</th>
            <th width="9%">Role</th>
            <th width="9%">Status</th>
            <th width="9%">Bed</th>
            <th width="9%">Room</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userList.length !== 0 &&
            userList.map((user) => (
              <tr key={user.user_id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.gender === true ? "Male" : "Female"}</td>
                <td>{user.role}</td>
                <td>{user.status === true ? "Active" : "Inactive"}</td>
                <td>{user.bed ? user.bed : ""}</td>
                <td>{user.room ? user.room : ""}</td>
                <td className="d-flex gap-1 align-items-center">
                  <button className="btn btn-primary" onClick={() => handleViewUser(user)}>
                    View
                  </button>
                  <button className="btn btn-warning" onClick={() => handleEditUser(user)}>
                    Edit
                  </button>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {selectedUser && <UserDetail user={selectedUser} onClose={handleCloseModal} />}
      {editUser && (
        <EditRole
          user={editUser}
          onClose={handleCloseEditModal}
          handleSaveUserRole={handleSaveUserRole}
        />
      )}
    </div>
  );
};

export default UserTable;
