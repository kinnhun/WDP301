import { useSelector } from "react-redux";

function RequestTable() {
  const requests = useSelector((state) => state.request.sortedList);
  return (
    <div className="request-table">
      <table>
        <thead>
          <tr>
            <th>Room</th>
            <th>Student</th>
            <th>Request Type</th>
            <th>Description</th>
            <th>Created At</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((msg, index) => (
            <tr key={index}>
              <td>{msg.room}</td>
              <td>{msg.student}</td>
              <td>{msg.requestType}</td>
              <td>{msg.description}</td>
              <td>{msg.createdAt}</td>
              <td className={`status ${msg.status}`}>{msg.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RequestTable;
