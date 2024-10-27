import * as XLSX from "xlsx";
import { useSelector, useDispatch } from "react-redux";
import { importUsers, getUsers } from "../../../stores/slices/userSlice";

const Menu = () => {
  // Lấy danh sách người dùng từ Redux store
  const userList = useSelector((state) => state.user.userList);
  const dispatch = useDispatch();

  // Hàm xử lý import file Excel
  const handleImport = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      console.log(jsonData);
      dispatch(importUsers(jsonData));
    };

    reader.readAsArrayBuffer(file);
  };

  // Hàm xử lý export dữ liệu ra file Excel từ userList
  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(userList);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

    // Xuất file
    XLSX.writeFile(workbook, "userList.xlsx");
  };

  return (
    <div>
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleImport}
        style={{ display: "none" }}
        id="fileInput"
      />
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
  );
};

export default Menu;
