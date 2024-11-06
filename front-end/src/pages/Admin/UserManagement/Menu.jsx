import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { importUsers } from "../../../stores/slices/userSlice";
import CreateUser from "./CreateUser";
import * as XLSX from "xlsx";

const Menu = () => {
  const userList = useSelector((state) => state.user.userList);
  const dispatch = useDispatch();
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
    const worksheet = XLSX.utils.json_to_sheet(userList);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    XLSX.writeFile(workbook, "UserList.xlsx");
  };

  return (
    <div className="d-flex align-items-center gap-2 justify-content-end">
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleImport}
        style={{ display: "none" }}
        id="fileInput"
      />
      <button className="btn btn-primary" onClick={() => setShowModal(true)}>
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
      <CreateUser show={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default Menu;
