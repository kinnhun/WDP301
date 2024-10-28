// UserTable.js
import "./UserTable.scss";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, updateUserRole, deleteUser } from "../../../stores/slices/userSlice";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserDetail from "./UserDetail";
import EditRole from "./EditRole";
import MyPagination from "../../../components/Pagination/Pagination";

const UserTable = () => {
  const userList = useSelector((state) => state.user.userList);
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

  const confirmDelete = () => {
    return new Promise((resolve) => {
      toast(
        (t) => (
          <span>
            Bạn có chắc muốn xóa không?
            <button
              onClick={() => {
                toast.dismiss(t.id); // Đóng thông báo sau khi xác nhận
                resolve(true); // Trả về true khi người dùng nhấn "Xóa"
              }}
              style={{ marginLeft: "10px", color: "red" }}
            >
              Xóa
            </button>
            <button
              onClick={() => {
                toast.dismiss(t.id); // Đóng thông báo khi người dùng nhấn "Hủy"
                resolve(false); // Trả về false khi người dùng nhấn "Hủy"
              }}
              style={{ marginLeft: "10px" }}
            >
              Hủy
            </button>
          </span>
        ),
        {
          duration: 5000, // Thời gian hiển thị thông báo
          position: "top-center", // Vị trí hiển thị
        }
      );
    });
  };

  const handleDeleteUser = async (userId) => {
    const isConfirm = await confirmDelete();
    if (isConfirm) {
      dispatch(deleteUser(userId));
    }
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
          {currentUsers.length !== 0 &&
            currentUsers.map((user) => (
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
                  <button className="btn btn-danger" onClick={() => handleDeleteUser(user.user_id)}>
                    Delete
                  </button>
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
      <MyPagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default UserTable;
