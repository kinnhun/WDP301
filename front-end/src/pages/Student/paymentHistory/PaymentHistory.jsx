import axios from 'axios'; // Import axios
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { verifyAccessToken } from '../../../utils/jwt'; // Đảm bảo import hàm verifyAccessToken

const PaymentHistory = () => {
    const [paymentHistoryData, setPaymentHistoryData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPaymentHistory = async () => {
            try {
                const token = JSON.parse(localStorage.getItem('token'));
                const userId = verifyAccessToken(token).id; // Lấy ID từ token

                const response = await axios.get(`http://localhost:8080/api/payment/history/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Gửi token trong header
                    },
                });

                // Kiểm tra phản hồi từ API
                console.log(response.data); // Debug: Kiểm tra cấu trúc dữ liệu

                if (response.data.success) {
                    // Lấy dữ liệu từ trường `recordset`
                    const { recordset } = response.data.data;

                    // Kiểm tra xem recordset có phải là một mảng không
                    if (Array.isArray(recordset)) {
                        const formattedData = recordset.map(payment => ({
                            bedId: payment.bed_id,
                            room: payment.room_number,
                            createdDate: new Date(payment.created_at).toLocaleString(), // Chuyển đổi định dạng ngày giờ
                            status: payment.payment_status,
                            totalAmount: `$${(payment.total_amount / 100).toFixed(2)}`, // Chia cho 100 để hiển thị tiền tệ
                            totalAmountPaid: `$${(payment.total_amount / 100).toFixed(2)}`, // Dữ liệu cho số tiền đã thanh toán
                            totalRemainingAmount: '$0', // Dữ liệu cho số tiền còn lại
                        }));
                        setPaymentHistoryData(formattedData); // Cập nhật dữ liệu vào state
                    } else {
                        throw new Error('Payment data is not an array');
                    }
                } else {
                    throw new Error('Failed to fetch payment history');
                }
            } catch (error) {
                setError(error.message); // Cập nhật thông báo lỗi
            } finally {
                setLoading(false); // Đặt trạng thái loading thành false
            }
        };

        fetchPaymentHistory(); // Gọi hàm fetchPaymentHistory khi component được mount
    }, []);

    if (loading) return <div>Loading...</div>; // Hiển thị loading
    if (error) return <div>Error: {error}</div>; // Hiển thị lỗi

    return (
        <div className="container mt-4">
            <h1>Payment History</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Bed ID</th>
                        <th>Room</th>
                        <th>Created Date</th>
                        <th>Status</th>
                        <th>Total Amount</th>
                        <th>Total Amount Paid</th>
                        <th>Total Remaining Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {paymentHistoryData.length > 0 ? (
                        paymentHistoryData.map((payment, index) => (
                            <tr key={index}>
                                <td>{payment.bedId}</td>
                                <td>{payment.room}</td>
                                <td>{payment.createdDate}</td>
                                <td>{payment.status}</td>
                                <td>{payment.totalAmount}</td>
                                <td>{payment.totalAmountPaid}</td>
                                <td>{payment.totalRemainingAmount}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center">No payment history available.</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export default PaymentHistory;
