import React, { useState, useEffect } from "react";
import { Table, Spinner, Button, Form, Modal, InputGroup, FormControl, Row, Col, Card, Pagination } from "react-bootstrap";
import axios from "../../../utils/axios";
import { toast } from "react-hot-toast";
import { verifyAccessToken } from "../../../utils/jwt";

const ReportsByStaff = () => {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [reply, setReply] = useState("");
  const [status, setStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  // Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 10;

  const getStaffIdFromToken = () => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      const decodedToken = verifyAccessToken(token);
      return decodedToken.id;
    }
    return null;
  };

  const getReportsByStaff = async () => {
    const staffId = getStaffIdFromToken();
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

  const openModal = (report) => {
    setSelectedReport(report);
    setReply(report.reply || "");
    setStatus(report.report_status);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedReport(null);
    setReply("");
    setStatus("");
  };

  const handleUpdateReport = async () => {
    if (!selectedReport) return;

    try {
      await axios.put(`/reports/${selectedReport.report_id}/updateReplyAndStatus`, {
        status,
        reply,
      });
      toast.success("Report updated successfully");
      closeModal();
      getReportsByStaff();
    } catch (error) {
      toast.error("Failed to update report");
    }
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const filteredReports = reports.filter((report) =>
    report.report_id.toString().includes(searchTerm) ||
    report.room_number.includes(searchTerm) ||
    report.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedReports = filteredReports.sort((a, b) => {
    if (sortConfig.key) {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Lấy báo cáo theo trang
  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = sortedReports.slice(indexOfFirstReport, indexOfLastReport);

  // Tạo các trang phân trang
  const pageCount = Math.ceil(sortedReports.length / reportsPerPage);
  const pages = [...Array(pageCount).keys()].map((i) => i + 1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    getReportsByStaff();
  }, []);

  if (isLoading) return <Spinner animation="border" variant="primary" />;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <Row className="mb-4">
        <Col>
          <h2 className="font-weight-bold text-primary">Reports Assigned to Staff</h2>
        </Col>
      </Row>

      {/* Thanh tìm kiếm */}
      <Row className="mb-3">
        <Col md={6}>
          <InputGroup>
            <FormControl
              placeholder="Search by Report ID, Room Number, or Content"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-pill"
            />
           
          </InputGroup>
        </Col>
      </Row>

      {/* Dropdown chọn trường sắp xếp */}
      <Row className="mb-4">
        <Col md={4}>
          <Form.Label className="font-weight-bold">Sort by</Form.Label>
          <Form.Control as="select" onChange={(e) => handleSort(e.target.value)} className="custom-select">
            <option value="report_id">Report ID</option>
            <option value="room_number">Room Number</option>
            <option value="report_status">Status</option>
            <option value="created_at">Created At</option>
          </Form.Control>
        </Col>
      </Row>

      {/* Table danh sách báo cáo */}
      <Card>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th onClick={() => handleSort("report_id")}>Report ID</th>
                <th onClick={() => handleSort("room_number")}>Room Number</th>
                <th>Content</th>
                <th onClick={() => handleSort("report_status")}>Status</th>
                <th>Reply</th>
                <th onClick={() => handleSort("created_at")}>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentReports.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center text-muted">No reports found for this staff.</td>
                </tr>
              ) : (
                currentReports.map((report) => (
                  <tr key={report.report_id}>
                    <td>{report.report_id}</td>
                    <td>{report.room_number}</td>
                    <td>{report.content}</td>
                    <td>{report.report_status}</td>
                    <td>{report.reply}</td>
                    <td>{new Date(report.created_at).toLocaleString()}</td>
                    <td>
                      <Button variant="info" onClick={() => openModal(report)}>
                        <i className="bi bi-pencil-square"></i> Update
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Phân trang */}
      <Pagination className="justify-content-center mt-4">
        {pages.map((page) => (
          <Pagination.Item
            key={page}
            active={page === currentPage}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </Pagination.Item>
        ))}
      </Pagination>

      {/* Modal để cập nhật reply và status */}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="custom-select"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Completed</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formReply">
              <Form.Label>Reply</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={reply}
                onChange={(e) => setReply(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdateReport}>
            Update Report
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ReportsByStaff;
