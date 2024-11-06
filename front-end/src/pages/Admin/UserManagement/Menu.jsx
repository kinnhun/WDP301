import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  importUsers,
  setRoleFilter,
  setEmailFilter,
  setStatusFilter,
} from "../../../stores/slices/userSlice";
import CreateUser from "./CreateUser";
import * as XLSX from "xlsx";
import "./Menu.scss";

const Menu = () => {
  const users = useSelector((state) => state.user.userList);
  const dispatch = useDispatch();
  const roleFilter = useSelector((state) => state.user.roleFilter);
  const emailFilter = useSelector((state) => state.user.emailFilter);
  const statusFilter = useSelector((state) => state.user.statusFilter);

  const [showModal, setShowModal] = useState(false);

  const handleImport = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      dispatch(importUsers(jsonData));
    };
    reader.readAsArrayBuffer(file);
  };

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(users);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    XLSX.writeFile(workbook, "UserList.xlsx");
  };

  return (
    <div>
      <div className="d-flex align-items-center gap-2 mb-3 menu">
        <input
          type="text"
          placeholder="Search by email"
          className="form-control flex-0"
          value={emailFilter}
          onChange={(e) => dispatch(setEmailFilter(e.target.value))}
        />
        <select
          className="form-control"
          value={roleFilter}
          onChange={(e) => dispatch(setRoleFilter(e.target.value))}
        >
          <option value="">All Roles</option>
          <option value="manager">Manager</option>
          <option value="staff">Staff</option>
          <option value="student">student</option>
        </select>
        <select
          className="form-control"
          value={statusFilter}
          onChange={(e) => dispatch(setStatusFilter(e.target.value))}
        >
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleImport}
          style={{ display: "none" }}
          id="fileInput"
        />
        <button className="btn btn-primary create-btn" onClick={() => setShowModal(true)}>
          Create user
        </button>
        <button
          className="btn btn-primary"
          onClick={() => document.getElementById("fileInput").click()}
        >
          Import users
        </button>
        <button className="btn btn-primary" onClick={handleExport}>
          Export users
        </button>
      </div>

      <CreateUser show={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default Menu;
