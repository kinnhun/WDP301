import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const bookingsData = [
    
    {
        dom: 'A',
        floor: 1,
        bed: 'Bed 1',
        semester: 'Fall',
        year: 2023,
        roomType: 'Single',
        createdDate: '2023-06-01',
        status: 'Confirmed',
        note: 'None'
    },
    {
        dom: 'A',
        floor: 1,
        bed: 'Bed 2',
        semester: 'Fall',
        year: 2023,
        roomType: 'Double',
        createdDate: '2023-06-02',
        status: 'Pending',
        note: 'Waiting for approval'
    },
    {
        dom: 'B',
        floor: 2,
        bed: 'Bed 1',
        semester: 'Spring',
        year: 2024,
        roomType: 'Triple',
        createdDate: '2023-07-15',
        status: 'Confirmed',
        note: 'All documents submitted'
    },
    {
        dom: 'B',
        floor: 2,
        bed: 'Bed 2',
        semester: 'Spring',
        year: 2024,
        roomType: 'Double',
        createdDate: '2023-08-20',
        status: 'Cancelled',
        note: 'Cancelled by student'
    },
    // Add more bookings as needed
];

const Bookings = () => {
    const baseUrl = import.meta.env.VITE_PUBLIC_URL;
    return (

        <div className="container mt-4">
            <h1>Bookings</h1>
            <Link to={`${baseUrl}/student/booking/book`} >
            <button className="btn btn-primary float-right">
                Add New Booking          
            
            </button>
            </Link>
           
            <Table striped bordered hover>
                <thead className="thead-dark">
                    <tr>
                        <th>Dom</th>
                        <th>Floor</th>
                        <th>Bed</th>
                        <th>Semester</th>
                        <th>Year</th>
                        <th>Room Type</th>
                        <th>Created Date</th>
                        <th>Status</th>
                        <th>Note</th>
                    </tr>
                </thead>
                <tbody>
                    {bookingsData.map((booking, index) => (
                        <tr key={index}>
                            <td>{booking.dom}</td>
                            <td>{booking.floor}</td>
                            <td>{booking.bed}</td>
                            <td>{booking.semester}</td>
                            <td>{booking.year}</td>
                            <td>{booking.roomType}</td>
                            <td>{booking.createdDate}</td>
                            <td>{booking.status}</td>
                            <td>{booking.note}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default Bookings;
