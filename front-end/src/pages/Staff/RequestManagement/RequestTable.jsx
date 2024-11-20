import "./RequestTable.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyPagination from "../../../components/Pagination/Pagination";
import toast from "react-hot-toast";
import axios from "../../../utils/axios";
import { verifyAccessToken } from "../../../utils/jwt";

function RequestTable() {
  const navigate = useNavigate();

  // States for requests, types, filters, and pagination
  const [requestTypes, setRequestTypes] = useState([]);
  const [requests, setRequests] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedType, setSelectedType] = useState(""); // For filtering by request type

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 10;
  const totalPages = Math.ceil(requests.length / itemPerPage);
  const indexOfLastUser = currentPage * itemPerPage;
  const indexOfFirstUser = indexOfLastUser - itemPerPage;
  const currentRequests = requests.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const toLocaleData = (isoDate) => {
    const date = new Date(isoDate);
    return `${date.getUTCDate()}-${String(date.getUTCMonth() + 1).padStart(
      2,
      "0"
    )}-${date.getUTCFullYear()} ${String(date.getUTCHours()).padStart(2, "0")}:${String(
      date.getUTCMinutes()
    ).padStart(2, "0")}:${String(date.getUTCSeconds()).padStart(2, "0")}`;
  };

  const getRequestTypes = async () => {
    try {
      const response = await axios.get(`/requests/types`);
      if (response.status === 200) {
        setRequestTypes(response.data.data);
      }
    } catch (error) {
      toast.error("Get request types failed");
    }
  };

  const getRequests = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const userId = verifyAccessToken(token).id;
      const response = await axios.get(`/requests/${userId}/user`);
      if (response.status === 200) {
        setRequests(response.data.data);
      }
    } catch (error) {
      toast.error("Get requests failed");
    }
  };

  // Handle status filter
  const handleStatusClick = (status) => {
    setSelectedStatus(status);
  };

  // Handle type filter
  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  useEffect(() => {
    getRequests();
    getRequestTypes();
  }, []);

  // Filter requests based on status and type
  const filteredRequests = requests.filter((request) => {
    let statusMatch = true;
    let typeMatch = true;

    if (selectedStatus !== "all") {
      statusMatch = request.status === selectedStatus;
    }

    if (selectedType) {
      typeMatch = request.request_type === selectedType;
    }

    return statusMatch && typeMatch;
  });

  const statusCounts = {
    all: requests.length,
    Pending: requests.filter((r) => r.status === "Incompleted").length,
    Done: requests.filter((r) => r.status === "Completed").length,
  };

  return (
    <>
      <div className="sidebar-staff">
        <ul>
          <li
            onClick={() => handleStatusClick("all")}
            className={selectedStatus === "all" ? "active" : ""}
          >
            All <span>{statusCounts.all}</span>
          </li>

          <li
            onClick={() => handleStatusClick("Pending")}
            className={selectedStatus === "Incompleted" ? "active" : ""}
          >
            Incompleted <span>{statusCounts.Pending}</span>
          </li>
          <li
            onClick={() => handleStatusClick("Done")}
            className={selectedStatus === "Completed" ? "active" : ""}
          >
            Completed<span>{statusCounts.Done}</span>
          </li>
        </ul>
      </div>

      <div className="request-table staff-request">
        <div className="filters">
          <select className="form-control" value={selectedType} onChange={handleTypeChange}>
            <option value="">All Types</option>
            {requestTypes.map((type) => (
              <option key={type.id} value={type.type_name}>
                {type.type_name}
              </option>
            ))}
          </select>
        </div>

        <table>
          <thead>
            <tr>
              <th width="25%">Room</th>
              <th width="25%">Request Type</th>
              <th width="25%">Created At</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((msg, index) => (
              <tr
                key={index}
                onClick={() => {
                  navigate(`/staff/request/${msg.request_id}`);
                }}
              >
                <td>{msg.room_number}</td>
                <td>{msg.request_type}</td>
                <td>{toLocaleData(msg.created_at)}</td>
                <td className={`status ${msg.status}`}>{msg.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {totalPages > 1 && (
          <MyPagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </>
  );
}

export default RequestTable;
