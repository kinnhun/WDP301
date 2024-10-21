import React from "react";
import "./Request.scss";
import RequestTable from "./RequestTable";
import Sidebar from "./Sidebar";

function RequestManagement() {
  return (
    <div className="request-management">
      <Sidebar />
      <RequestTable />
    </div>
  );
}

export default RequestManagement;
