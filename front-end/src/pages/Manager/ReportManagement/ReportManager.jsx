import React, { useState, useEffect } from "react";
import { Table, Spinner, Button, Modal, Form } from "react-bootstrap";
import axios from "../../../utils/axios";
import { toast } from "react-hot-toast";

const ReportManager = () => {
    const [reports, setReports] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [staffList, setStaffList] = useState([]);
    const [selectedStaff, setSelectedStaff] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);

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
   // Assign report to staff
const assignReportToStaff = async () => {
    if (!selectedStaff || !selectedReport) {
        toast.error("Please select a staff member and report.");
        return;
    }

    try {
        // Lấy thông tin báo cáo đã chọn
        const report = reports.find(report => report.report_id === selectedReport);

        // Kiểm tra nếu báo cáo không tồn tại hoặc không có status
        if (!report) {
            toast.error("Report not found.");
            return;
        }

        const reportStatus = report.report_status || "Pending"; // Đảm bảo status không bị undefined
        const reportReply = report.reply || null; // Lấy reply hoặc set là null nếu không có

        // Kiểm tra xem `assignedStaffId` có hợp lệ không
        const assignedStaffId = selectedStaff || null; // Nếu không chọn staff, trả về null

        // Gửi yêu cầu PUT với các tham số hợp lệ, bao gồm cả reply
        const response = await axios.put(`/reports/${selectedReport}`, {
            assigned_staff_id: assignedStaffId,
            report_status: reportStatus, // Sử dụng status từ báo cáo
            reply: reportReply // Thêm reply vào request
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

    if (isLoading) {
        return <Spinner animation="border" />;
    }

    return (
        <div className="container mt-4">
            <h1>Tất cả Báo cáo</h1>
            <Table striped bordered hover className="mt-3">
                <thead>
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
                    {reports.map((report, index) => (
                        <tr key={index}>
                            <td>{report.room_number}</td>
                            <td>{report.content}</td>
                            <td>{report.report_status}</td>
                            <td>{report.reply || "Chưa có phản hồi"}</td>
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
                    ))}
                </tbody>
            </Table>

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
                        Assign
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ReportManager;
