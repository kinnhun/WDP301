import React, { useState, useEffect, useMemo } from "react";
import { Button, Card, Modal, Table, Form, Pagination, Dropdown, DropdownButton } from "react-bootstrap";
import toast from "react-hot-toast";
import axios from "../../../utils/axios";
import Spinner from "../../../components/Spinner/Spinner";
import { verifyAccessToken } from "../../../utils/jwt";
import { FaRegEdit, FaRegEye } from "react-icons/fa"; // Thêm icon

const Report = () => {
  const [reports, setReports] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [reportsPerPage] = useState(10);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [reportedRoomNumber, setReportedRoomNumber] = useState("");
  const [newReportDescription, setNewReportDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const toLocaleData = (isoDate) => {
    const date = new Date(isoDate);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
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
      if (reportedRoomNumber === "" || newReportDescription === "") {
        toast.error("Please fill in all fields");
        return;
      }

      const token = JSON.parse(localStorage.getItem("token"));
      const userId = verifyAccessToken(token).id;

      const reportData = {
        room_number: reportedRoomNumber,
        content: newReportDescription,
        user_id: userId,
      };

      const response = await axios.post("/reports", reportData);

      if (response.status === 201) {
        toast.success("Report created successfully");
        handleClose();
        getReports();
      }
    } catch (error) {
      toast.error("Failed to create report");
    }
  };

  const getReports = async () => {
    try {
      setIsLoading(true);
      const token = JSON.parse(localStorage.getItem("token"));
      const userId = verifyAccessToken(token).id;
      const response = await axios.get(`/reports/user/${userId}`);
      if (response.status === 200) {
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

  const filteredAndSortedReports = useMemo(() => {
    let updatedReports = [...reports];

    if (searchQuery) {
      updatedReports = updatedReports.filter(
        (report) =>
          report.room_number.includes(searchQuery) ||
          report.content.includes(searchQuery) ||
          report.report_status.includes(searchQuery)
      );
    }

    if (sortField) {
      updatedReports = updatedReports.sort((a, b) => {
        const fieldA = a[sortField];
        const fieldB = b[sortField];

        if (sortOrder === "asc") {
          return fieldA > fieldB ? 1 : -1;
        } else {
          return fieldA < fieldB ? 1 : -1;
        }
      });
    }

    return updatedReports;
  }, [reports, searchQuery, sortField, sortOrder]);

  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = filteredAndSortedReports.slice(indexOfFirstReport, indexOfLastReport);

  const totalPages = Math.ceil(filteredAndSortedReports.length / reportsPerPage);

  const handlePagination = (pageNumber) => setCurrentPage(pageNumber);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="container mt-4" style={{ maxHeight: "100vh", overflowY: "auto" }}>
      <h1 className="mb-4" style={{ fontSize: "2.5rem", fontWeight: "600", color: "#4B4F58" }}>
        Room Reports
      </h1>

      <Button
        variant="primary"
        className="mb-4"
        onClick={handleCreateNewReport}
        style={{
          borderRadius: "50px",
          padding: "10px 30px",
          fontSize: "1.2rem",
          background:"cadetblue",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s ease",
        }}
      >
        <FaRegEdit /> Report a Room Issue
      </Button>

      <Form.Control
        type="text"
        placeholder="Search reports"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-3"
        style={{
          maxWidth: "350px",
          borderRadius: "25px",
          padding: "10px",
          border: "1px solid #ccc",
          
        }}
      />

      <DropdownButton
        id="dropdown-sort"
        title={`Sort by:`}
        className="mb-3"
        style={{
          borderRadius: "25px",
          fontSize: "1rem",
          color:"black",
          background:"white",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        
        <Dropdown.Item onClick={() => { setSortField("room_number"); setSortOrder("desc"); }}>
          Reported Room Number (Desc)
        </Dropdown.Item>
        <Dropdown.Item onClick={() => { setSortField("created_at"); setSortOrder("asc"); }}>
          Created Date (Asc)
        </Dropdown.Item>
        <Dropdown.Item onClick={() => { setSortField("created_at"); setSortOrder("desc"); }}>
          Created Date (Desc)
        </Dropdown.Item>
      </DropdownButton>

      <Card className="mb-3" style={{ borderRadius: "15px", border: "none", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
        <Card.Body>
          <Card.Title>Total Reports: {filteredAndSortedReports.length}</Card.Title>
        </Card.Body>
      </Card>

      <Table striped bordered hover responsive="sm" style={{ borderRadius: "10px" }}>
        <thead>
          <tr style={{ backgroundColor: "#f8f9fa" }}>
            <th>Reported Room Number</th>
            <th>Report Content</th>
            <th>Reply</th>
            
            <th>Status</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentReports.map((report) => (
            <tr key={report.id} style={{ transition: "background-color 0.3s" }} onMouseEnter={(e) => e.target.style.backgroundColor = "#f1f1f1"} onMouseLeave={(e) => e.target.style.backgroundColor = ""}>
              <td>{report.room_number}</td>
              <td>{report.content}</td>
              <td>{report.reply}</td>
              <td>{report.report_status}</td>
              <td>{toLocaleData(report.created_at)}</td>
              <td>
                <Button variant="info" onClick={() => handleShowDetail(report)} style={{ borderRadius: "25px" }}>
                  <FaRegEye /> View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination className="justify-content-center">
        {Array.from({ length: totalPages }, (_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePagination(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>

      {/* Modal for View Report */}
      <Modal show={showDetailModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Report Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Room Number:</strong> {selectedReport?.room_number}</p>
          <p><strong>Content:</strong> {selectedReport?.content}</p>
          <p><strong>Reply:</strong> {selectedReport?.reply || "No reply yet"}</p>
          <p><strong>Status:</strong> {selectedReport?.report_status}</p>
          <p><strong>Created At:</strong> {toLocaleData(selectedReport?.created_at)}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for Create Report */}
      <Modal show={showCreateModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="roomNumber">
            <Form.Label>Room Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter room number"
              value={reportedRoomNumber}
              onChange={(e) => setReportedRoomNumber(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="reportDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter description"
              value={newReportDescription}
              onChange={(e) => setNewReportDescription(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitNewReport}>
            Create Report
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Report;
