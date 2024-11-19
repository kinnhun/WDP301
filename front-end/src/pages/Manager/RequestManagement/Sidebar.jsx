import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setFilter } from "../../../stores/slices/requestSlice";

function Sidebar() {
  const requests = useSelector((state) => state.request.requestList);
  const dispatch = useDispatch();
  const [selectedStatus, setSelectedStatus] = useState("all");

  const handleClick = (status) => {
    setSelectedStatus(status);
    dispatch(setFilter({ status }));
  };

  return (
    <div className="sidebar-admin">
      <ul>
        <li onClick={() => handleClick("all")} className={selectedStatus === "all" ? "active" : ""}>
          All <span>{requests.length}</span>
        </li>
        <li
          onClick={() => handleClick("Approved")}
          className={selectedStatus === "Approved" ? "active" : ""}
        >
          Approved <span>{requests.filter((r) => r.status === "Approved").length}</span>
        </li>
        <li
          onClick={() => handleClick("Pending")}
          className={selectedStatus === "Pending" ? "active" : ""}
        >
          Pending <span>{requests.filter((r) => r.status === "Pending").length}</span>
        </li>
        <li
          onClick={() => handleClick("Rejected")}
          className={selectedStatus === "Rejected" ? "active" : ""}
        >
          Rejected <span>{requests.filter((r) => r.status === "Rejected").length}</span>
        </li>
        <li
          onClick={() => handleClick("Done")}
          className={selectedStatus === "Incompleted" ? "active" : ""}
        >
          Incompleted <span>{requests.filter((r) => r.status === "Incompleted").length}</span>
        </li>
        <li
          onClick={() => handleClick("Done")}
          className={selectedStatus === "Completed" ? "active" : ""}
        >
          Completed <span>{requests.filter((r) => r.status === "Completed").length}</span>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
