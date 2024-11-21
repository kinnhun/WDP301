import React, { useState, useEffect } from "react";
import { Table, Spinner, Button, Modal, Form, InputGroup, FormControl, Row, Col, Card, Pagination } from "react-bootstrap";
import axios from "../../../utils/axios";
import { toast } from "react-hot-toast";

const ReportManager = () => {
    const [reports, setReports] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [staffList, setStaffList] = useState([]);
    const [selectedStaff, setSelectedStaff] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    // Phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const reportsPerPage = 10;

    // Tính năng sort
    const [sortOption, setSortOption] = useState("date_asc"); // Mặc định sắp xếp theo ngày tạo tăng dần

    // Fetch all reports
    const getAllReports = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get("/reports");
            if (response.status === 200) {
                setReports(response.data.data);
            }
        } catch (error) {
            console.error("Failed to load reports:", error);
            toast.error("Failed to load reports");
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch staff list
    const getStaffList = async () => {
        try {
            const response = await axios.get("/user/role/staff");
            if (response.status === 200) {
                setStaffList(response.data.data);
            }
        } catch (error) {
            console.error("Failed to load staff list:", error);
            toast.error("Failed to load staff list");
        }
    };

    // Assign report to staff
    const assignReportToStaff = async () => {
        if (!selectedStaff || !selectedReport) {
            toast.error("Please select a staff member and report.");
            return;
        }

        try {
            const report = reports.find(report => report.report_id === selectedReport);

            if (!report) {
                toast.error("Report not found.");
                return;
            }

            const reportStatus = report.report_status || "Pending"; 
            const reportReply = report.reply || null;

            const assignedStaffId = selectedStaff || null;

            const response = await axios.put(`/reports/${selectedReport}`, {
                assigned_staff_id: assignedStaffId,
                report_status: reportStatus,
                reply: reportReply
            });

            if (response.status === 200) {
                toast.success("Report successfully assigned to staff.");
                setShowModal(false);
                getAllReports(); // Reload reports after assignment
            }
        } catch (error) {
            console.error("Failed to assign report:", error);
            toast.error("Failed to assign report.");
        }
    };

    useEffect(() => {
        getAllReports();
        getStaffList();
    }, []);

    // Phân trang và lọc báo cáo
    const filteredReports = reports.filter((report) =>
        report.report_id.toString().includes(searchTerm) ||
        report.room_number.includes(searchTerm) ||
        report.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sắp xếp báo cáo theo lựa chọn
    const sortReports = (reports) => {
        switch (sortOption) {
            case "date_asc":
                return reports.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
            case "date_desc":
                return reports.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            case "room_number_asc":
                return reports.sort((a, b) => a.room_number - b.room_number);
            case "room_number_desc":
                return reports.sort((a, b) => b.room_number - a.room_number);
            case "status_asc":
                return reports.sort((a, b) => a.report_status.localeCompare(b.report_status));
            case "status_desc":
                return reports.sort((a, b) => b.report_status.localeCompare(a.report_status));
            default:
                return reports;
        }
    };

    const sortedReports = sortReports(filteredReports);

    const indexOfLastReport = currentPage * reportsPerPage;
    const indexOfFirstReport = indexOfLastReport - reportsPerPage;
    const currentReports = sortedReports.slice(indexOfFirstReport, indexOfLastReport);

    const pageCount = Math.ceil(sortedReports.length / reportsPerPage);
    const pages = [...Array(pageCount).keys()].map((i) => i + 1);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (isLoading) {
        return <Spinner animation="border" variant="primary" />;
    }

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Report Management</h1>

            {/* Thanh tìm kiếm và sắp xếp */}
            <Row className="mb-3">
                <Col md={6}>
                    <InputGroup>
                        <FormControl
                            placeholder="Search by Report ID, Room Number, or Content"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <InputGroup.Text>
                            <i className="bi bi-search"></i>
                        </InputGroup.Text>
                    </InputGroup>
                </Col>

                <Col md={6}>
                    <Form.Control
                        as="select"
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                    >
                       
                        <option value="date_desc">Sort by Date </option>
                        <option value="room_number_asc">Sort by Room Number </option>
                        <option value="room_number_desc">Sort by Room Number </option>
                        <option value="status_asc">Sort by Status </option>
                        <option value="status_desc">Sort by Status </option>
                    </Form.Control>
                </Col>
            </Row>

            {/* Table báo cáo */}
            <Card>
                <Card.Body>
                    <Table striped bordered hover responsive>
                        <thead className="table-dark">
                            <tr>
                                <th>Reported Room Number</th>
                                <th>Report Content</th>
                                <th>Status</th>
                                <th>Reply</th>
                                <th>Created Date</th>
                                <th>Assign to Staff</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentReports.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center text-muted">No reports found.</td>
                                </tr>
                            ) : (
                                currentReports.map((report) => (
                                    <tr key={report.report_id}>
                                        <td>{report.room_number}</td>
                                        <td>{report.content}</td>
                                        <td>{report.report_status}</td>
                                        <td>{report.reply || "No reply yet"}</td>
                                        <td>{new Date(report.created_at).toLocaleString()}</td>
                                        <td>
                                            <Button
                                                variant="primary"
                                                onClick={() => {
                                                    setSelectedReport(report.report_id);
                                                    setSelectedStaff(""); // Reset selected staff
                                                    setShowModal(true);
                                                }}
                                            >
                                                Assign
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

            {/* Modal để gán báo cáo cho nhân viên */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Assign Report to Staff</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formStaffSelect">
                            <Form.Label>Select Staff</Form.Label>
                            <Form.Control
                                as="select"
                                value={selectedStaff}
                                onChange={(e) => setSelectedStaff(e.target.value)}
                            >
                                <option value="">Select Staff</option>
                                {staffList.map((staff) => (
                                    <option key={staff.user_id} value={staff.user_id}>
                                        {staff.username}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={assignReportToStaff}>
                        Assign Report
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ReportManager;
