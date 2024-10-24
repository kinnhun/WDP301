import "./RequestTable.scss";
import { useSelector, useDispatch } from "react-redux";
import { getRequests } from "../../../stores/slices/requestSlice";
import { useEffect, useState } from "react";
import MyPagination from "../../../components/Pagination/Pagination";

function RequestTable() {
  const requests = useSelector((state) => state.request.sortedList);
  const dispatch = useDispatch();

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 10;
  const totalPages = Math.ceil(requests.length / itemPerPage);
  console.log(totalPages);
  const indexOfLastUser = currentPage * itemPerPage;
  const indexOfFirstUser = indexOfLastUser - itemPerPage;
  const currentRequests = requests.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const toLocaleData = (isoDate) => {
    const date = new Date(isoDate);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");

    const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
  };

  useEffect(() => {
    dispatch(getRequests());
  }, []);
  return (
    <div className="request-table">
      <table>
        <thead>
          <tr>
            <th width="15%">Room</th>
            <th width="25%">Student</th>
            <th width="20%">Request Type</th>
            <th width="20%">Created At</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {currentRequests.map((msg, index) => (
            <tr key={index}>
              <td>{msg.room_number}</td>
              <td>{msg.email}</td>
              <td>{msg.request_type}</td>
              <td>{toLocaleData(msg.created_at)}</td>
              <td className={`status ${msg.status}`}>{msg.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <MyPagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default RequestTable;
