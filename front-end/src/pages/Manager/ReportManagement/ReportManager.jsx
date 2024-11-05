import React, { useState, useEffect } from "react";
import { Table, Spinner } from "react-bootstrap";
import axios from "../../../utils/axios";
import { toast } from "react-hot-toast";

const ReportManager = () => {
    const [reports, setReports] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getAllReports = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get("/reports");
            if (response.status === 200) {
                setReports(response.data.data); // Lấy dữ liệu từ response
            }
        } catch (error) {
            console.error("Failed to load reports:", error);
            toast.error("Failed to load reports");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getAllReports();
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
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ReportManager;
