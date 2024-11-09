import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const residentHistories = [
  {
    studentId: 'S12345',
    bedInfo: 'Room 101 - Bed A',
    checkInDate: '2023-09-01',
    checkOutDate: '2024-05-31',
    price: '$1000',
    semester: 'Fall',
    year: 2023,
    roommates: [
      { bed: 'Bed B', name: 'John Doe' },
      { bed: 'Bed C', name: 'Jane Smith' }
    ]
  },
  {
    studentId: 'S67890',
    bedInfo: 'Room 102 - Bed B',
    checkInDate: '2022-09-01',
    checkOutDate: '2023-05-31',
    price: '$1200',
    semester: 'Spring',
    year: 2022,
    roommates: [
      { bed: 'Bed A', name: 'Alice Johnson' },
      { bed: 'Bed C', name: 'Robert Brown' }
    ]
  },
  {
    studentId: 'S54321',
    bedInfo: 'Room 103 - Bed C',
    checkInDate: '2021-09-01',
    checkOutDate: '2022-05-31',
    price: '$1100',
    semester: 'Winter',
    year: 2021,
    roommates: [
      { bed: 'Bed A', name: 'Michael Green' },
      { bed: 'Bed B', name: 'Emily White' }
    ]
  }
];

const ResidentHistories = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRoommates, setSelectedRoommates] = useState([]);

  // Handle opening modal and setting roommates data
  const handleShowRoommates = (roommates) => {
    setSelectedRoommates(roommates);
    setShowModal(true);
  };

  // Handle closing modal
  const handleClose = () => setShowModal(false);

  return (
    <div className="container mt-4">
      <h1>Resident Histories</h1>
      <table className="table table-striped">
        <thead className="thead">
          <tr>
            <th>Student ID</th>
            <th>Bed Information</th>
            <th>Check-in Date</th>
            <th>Check-out Date</th>
            <th>Price</th>
            <th>Semester</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {residentHistories.map((history, index) => (
            <tr key={index}>
              <td>{history.studentId}</td>
              <td>{history.bedInfo}</td>
              <td>{history.checkInDate}</td>
              <td>{history.checkOutDate}</td>
              <td>{history.price}</td>
              <td>{history.semester}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => handleShowRoommates(history.roommates)}
                >
                  Roommates
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Roommate Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Roommates Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Bed</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {selectedRoommates.map((roommate, index) => (
                <tr key={index}>
                  <td>{roommate.bed}</td>
                  <td>{roommate.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ResidentHistories;
