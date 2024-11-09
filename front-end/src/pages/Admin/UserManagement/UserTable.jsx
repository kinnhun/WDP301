// UserTable.js
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import MyPagination from "../../../components/Pagination/Pagination";
import Spinner from "../../../components/Spinner/Spinner";
import { deleteUser, getUsers, updateUserRole } from "../../../stores/slices/userSlice";
import EditRole from "./EditRole";
import UserDetail from "./UserDetail";
import "./UserTable.scss";

const UserTable = () => {
  const userList = useSelector((state) => state.user.sortedUserList);
  const status = useSelector((state) => state.user.status);
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState(null);
  const [editUser, setEditUser] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 10;
  const totalPages = Math.ceil(userList.length / itemPerPage);
  const indexOfLastUser = currentPage * itemPerPage;
  const indexOfFirstUser = indexOfLastUser - itemPerPage;
  const currentUsers = userList.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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

  const handleDeleteUser = async (userId) => {
    const isConfirm = window.confirm("Are you sure you want to delete this user?");
    if (isConfirm) {
      dispatch(deleteUser(userId));
    }
  };

  if (status === "pending") {
    return <Spinner />;
  }

  if (status === "failed") {
    return toast.error("Get users failed");
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.length !== 0 &&
            currentUsers.map((user) => (
              <tr key={user.user_id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.gender === true ? "Male" : "Female"}</td>
                <td>{user.role}</td>
                <td>{user.status === true ? "Active" : "Inactive"}</td>
                <td className="d-flex gap-1 align-items-center">
                  <button className="btn btn-primary" onClick={() => handleViewUser(user.user_id)}>
                    View
                  </button>
                  <button className="btn btn-warning" onClick={() => handleEditUser(user)}>
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    hidden={user.status ? true : false}
                    onClick={() => handleDeleteUser(user.user_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {selectedUser && <UserDetail userId={selectedUser} onClose={handleCloseModal} />}
      {editUser && (
        <EditRole
          user={editUser}
          onClose={handleCloseEditModal}
          handleSaveUserRole={handleSaveUserRole}
        />
      )}
      {totalPages > 1 && (
        <MyPagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default UserTable;
