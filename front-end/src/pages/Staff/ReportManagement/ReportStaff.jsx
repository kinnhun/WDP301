import React, { useState, useEffect } from "react";
import { Table, Spinner, Button, Form } from "react-bootstrap";
import axios from "../../../utils/axios";
import { toast } from "react-hot-toast";
import { verifyAccessToken } from "../../../utils/jwt"; // Đảm bảo bạn đã tạo hàm này

const ReportsByStaff = () => {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Lấy staffId từ token trong localStorage
  const getStaffIdFromToken = () => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      const decodedToken = verifyAccessToken(token); // Giải mã token để lấy thông tin
      return decodedToken.id; // Hoặc decodedToken.staffId tùy vào cách bạn lưu trữ
    }
    return null;
  };

  // Fetch reports assigned to staff
  const getReportsByStaff = async () => {
    const staffId = getStaffIdFromToken();  // Lấy staffId từ token
    if (!staffId) {
      setError("Staff ID not found");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.get(`/reports/staff/${staffId}`);
      if (response.status === 200) {
        setReports(response.data.data);
      }
    } catch (error) {
      setError(error.message);
      toast.error("Failed to load reports for this staff");
    } finally {
      setIsLoading(false);
    }
  };

  // Cập nhật báo cáo
  const handleUpdateReport = async (reportId, updatedStatus, updatedReply) => {
    try {
      await axios.put(`/reports/${reportId}/updateReplyAndStatus`, {
        status: updatedStatus,
        reply: updatedReply,
      });
      toast.success("Report updated successfully");
      // Cập nhật lại danh sách báo cáo sau khi cập nhật thành công
      getReportsByStaff();
    } catch (error) {
      toast.error("Failed to update report");
    }
  };

  useEffect(() => {
    getReportsByStaff();
  }, []); // Chạy 1 lần khi component mount

  if (isLoading) return <Spinner animation="border" />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2>Reports Assigned to Staff</h2>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Report ID</th>
            <th>Room Number</th>
            <th>Content</th>
            <th>Status</th>
            <th>Reply</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.length === 0 ? (
            <tr>
              <td colSpan="7">No reports found for this staff.</td>
            </tr>
          ) : (
            reports.map((report) => (
              <tr key={report.report_id}>
                <td>{report.report_id}</td>
                <td>{report.room_number}</td>
                <td>{report.content}</td>
                <td>
                  <Form.Control
                    as="select"
                    defaultValue={report.report_status}
                    onChange={(e) => (report.report_status = e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Completed</option>
                  </Form.Control>
                </td>
                <td>
                  <Form.Control
                    type="text"
                    defaultValue={report.reply || ""}
                    onChange={(e) => (report.reply = e.target.value)}
                  />
                </td>
                <td>{new Date(report.created_at).toLocaleString()}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() =>
                      handleUpdateReport(report.report_id, report.report_status, report.reply)
                    }
                  >
                    Update
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default ReportsByStaff;
