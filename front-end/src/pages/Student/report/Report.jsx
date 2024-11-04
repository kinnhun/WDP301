import React, { useState, useEffect } from "react";
import { Button, Card, Modal, Table, Form } from "react-bootstrap";
import toast from "react-hot-toast";
import axios from "../../../utils/axios";
import Spinner from "../../../components/Spinner/Spinner";
import { verifyAccessToken } from "../../../utils/jwt";

const Report = () => {
  const [reports, setReports] = useState([]);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [reportedRoomNumber, setReportedRoomNumber] = useState("");
  const [newReportDescription, setNewReportDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [availableRooms, setAvailableRooms] = useState([]);

  const toLocaleData = (isoDate) => {
    const date = new Date(isoDate);
    return `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  };

  const handleShowDetail = (report) => {
    setSelectedReport(report);
    setShowDetailModal(true);
  };

  const handleClose = () => {
    setSelectedReport(null);
    setShowDetailModal(false);
    setShowCreateModal(false);
    setReportedRoomNumber("");
    setNewReportDescription("");
  };

  const handleCreateNewReport = () => {
    setShowCreateModal(true);
  };

  const handleSubmitNewReport = async () => {
    try {
      // Kiểm tra xem các trường có bị trống không
      if (reportedRoomNumber === "" || newReportDescription === "") {
        toast.error("Please fill in all fields");
        return;
      }
  
      const token = JSON.parse(localStorage.getItem("token"));
      const userId = verifyAccessToken(token).id;
  
      // Tạo đối tượng báo cáo với tất cả các trường cần thiết
      const reportData = {
        room_number: reportedRoomNumber, // Sử dụng reportedRoomNumber
        content: newReportDescription,    // Nội dung báo cáo
        user_id: userId,                  // Thêm userId vào đây
      };
  
      // Gửi yêu cầu POST đến API
      const response = await axios.post("/reports", reportData); // Chú ý rằng endpoint phải là "/reports"
  
      if (response.status === 201) {
        toast.success("Report created successfully");
        handleClose();
        getReports(); // Tải lại danh sách báo cáo
      }
    } catch (error) {
      console.error(
        "Error creating report:",
        error.response ? error.response.data : error.message
      );
      toast.error(
        "Failed to create report: " +
          (error.response ? error.response.data.message : error.message)
      );
    }
  };
  

  const getReports = async () => {
    try {
      setIsLoading(true);
      const token = JSON.parse(localStorage.getItem("token"));
      const userId = verifyAccessToken(token).id;
      const response = await axios.get(`/reports/user/${userId}`);
      if (response.status === 200) {
        console.log(response.data.data);
        setReports(response.data.data);
      }
    } catch (error) {
      toast.error("Failed to load reports");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getReports();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="container mt-4">
      <h1>Room Reports</h1>
      <Button
        variant="primary"
        className="mb-4"
        onClick={handleCreateNewReport}
      >
        Report a Room Issue
      </Button>

      <Card>
        <Card.Body>
          <Card.Title>Total Reports: {reports.length}</Card.Title>
        </Card.Body>
      </Card>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>User Room ID</th> {/* Thêm cột ID phòng của người dùng */}
            <th>Reported Room Number</th>
            <th>Report Content</th>
            <th>Status</th>
            <th>Reply</th>
            <th>Created Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report, index) => (
            <tr key={index}>
              <td>3</td>
            
              <td>{report.room_id}</td>
            
              <td>{report.content}</td>
              <td>{report.report_status}</td>
              <td>{report.reply || "No reply yet"}</td>
              <td>{toLocaleData(report.created_at)}</td>
              <td>
                <Button variant="info" onClick={() => handleShowDetail(report)}>
                  Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Details Modal */}
      <Modal show={showDetailModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Report Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedReport && (
            <>
              <p>
                <strong>User Room ID:</strong> {selectedReport.user_room_id}
              </p>{" "}
              {/* Thêm thông tin `user_room_id` */}
              <p>
                <strong>Reported Room Number:</strong>{" "}
                {selectedReport.room_number}
              </p>
              <p>
                <strong>Report Content:</strong> {selectedReport.content}
              </p>
              <p>
                <strong>Status:</strong> {selectedReport.report_status}
              </p>
              <p>
                <strong>Reply:</strong> {selectedReport.reply || "No reply yet"}
              </p>
              <p>
                <strong>Created Date:</strong>{" "}
                {toLocaleData(selectedReport.created_at)}
              </p>
            </>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Create New Report Modal */}
      <Modal show={showCreateModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formReportedRoomNumber">
              <Form.Label>Reported Room Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter reported room number"
                value={reportedRoomNumber}
                onChange={(e) => setReportedRoomNumber(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formIssueDescription" className="mt-3">
              <Form.Label>Report Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Describe the issue"
                value={newReportDescription}
                onChange={(e) => setNewReportDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitNewReport}>
            Submit Report
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Report;
