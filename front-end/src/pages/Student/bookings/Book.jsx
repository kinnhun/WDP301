import { useState } from 'react';
import { Alert, Button, Table } from 'react-bootstrap';

const Book = () => {
    const [semester, setSemester] = useState('Fall - 2024');
    const [roomType, setRoomType] = useState('SVVN - 3 beds - 1.150.000');
    const [dorm, setDorm] = useState('Dom A');
    const [floor, setFloor] = useState('Floor 5');
    const [block, setBlock] = useState('A502');

    return (
        <div className="container mt-4">
            <h1>New Booking</h1>

            <Alert variant="warning">
                <strong>You are booking a Male room</strong>, please double check before booking. Contact your student service if your gender information is not correct.
                <br/>
                <em>(Bạn đang đặt phòng cho giới tính Nam, vui lòng kiểm tra kỹ trước khi đặt. Nếu thông tin giới tính của bạn không đúng, liên hệ dịch vụ sinh viên để cập nhật lại thông tin giới tính.)</em>
            </Alert>

            <Table striped bordered hover>
                <tbody>
                    <tr>
                        <td><strong>Semester</strong></td>
                        <td>
                            <select value={semester} onChange={(e) => setSemester(e.target.value)}>
                                <option value="Fall - 2024">Fall - 2024</option>
                                <option value="Spring - 2025">Spring - 2025</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td><strong>Room Type</strong></td>
                        <td>
                            <select value={roomType} onChange={(e) => setRoomType(e.target.value)}>
                                <option value="SVVN - 3 beds - 1.150.000">SVVN - 3 beds - 1.150.000</option>
                                <option value="SVVN - 2 beds - 1.500.000">SVVN - 2 beds - 1.500.000</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td><strong>Dorm</strong></td>
                        <td>
                            <select value={dorm} onChange={(e) => setDorm(e.target.value)}>
                                <option value="Dom A">Dom A</option>
                                <option value="Dom B">Dom B</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td><strong>Floor</strong></td>
                        <td>
                            <select value={floor} onChange={(e) => setFloor(e.target.value)}>
                                <option value="Floor 1">Floor 1</option>
                                <option value="Floor 2">Floor 2</option>
                                <option value="Floor 5">Floor 5</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td><strong>Block</strong></td>
                        <td>
                            <select value={block} onChange={(e) => setBlock(e.target.value)}>
                                <option value="A502">A502</option>
                                <option value="A503">A503</option>
                                <option value="A504">A504</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </Table>

            <Button variant="primary" className="mt-3">Confirm Booking</Button>
        </div>
    );
};

export default Book;
