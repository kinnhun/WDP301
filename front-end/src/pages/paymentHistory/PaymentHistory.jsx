import { Table } from 'react-bootstrap';

const PaymentHistory = () => {
    // Sample payment history data
    const paymentHistoryData = [
        {
            room: '101A',
            createdDate: '2024-09-01',
            description: 'Semester Fee',
            status: 'Paid',
            totalAmount: '$500',
            totalAmountPaid: '$500',
            totalRemainingAmount: '$0',
        },
        {
            room: '101B',
            createdDate: '2024-09-01',
            description: 'Semester Fee',
            status: 'Pending',
            totalAmount: '$500',
            totalAmountPaid: '$250',
            totalRemainingAmount: '$250',
        },
        {
            room: '102A',
            createdDate: '2024-09-01',
            description: 'Semester Fee',
            status: 'Paid',
            totalAmount: '$500',
            totalAmountPaid: '$500',
            totalRemainingAmount: '$0',
        },
        {
            room: '102B',
            createdDate: '2024-09-01',
            description: 'Semester Fee',
            status: 'Pending',
            totalAmount: '$500',
            totalAmountPaid: '$0',
            totalRemainingAmount: '$500',
        },
        // Add more payment records as needed
    ];

    return (
        <div className="container mt-4">
            <h1>Payment History</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Room</th>
                        <th>Created Date</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Total Amount</th>
                        <th>Total Amount Paid</th>
                        <th>Total Remaining Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {paymentHistoryData.map((payment, index) => (
                        <tr key={index}>
                            <td>{payment.room}</td>
                            <td>{payment.createdDate}</td>
                            <td>{payment.description}</td>
                            <td>{payment.status}</td>
                            <td>{payment.totalAmount}</td>
                            <td>{payment.totalAmountPaid}</td>
                            <td>{payment.totalRemainingAmount}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default PaymentHistory;
