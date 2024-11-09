import { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';

const ResidentHistories = () => {
  const [residentHistories, setResidentHistories] = useState([]);
  const [userId, setUserId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState([]); // Store selected user details

  useEffect(() => {
    // Lấy userId từ token trong local storage
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(payload));
        if (decodedPayload && decodedPayload.id) {
          setUserId(decodedPayload.id);
        } else {
          console.error('Token không chứa userId.');
        }
      } catch (error) {
        console.error('Lỗi khi giải mã token:', error);
      }
    } else {
      console.error('Không tìm thấy token.');
    }
  }, []);

  useEffect(() => {
    // Chỉ gọi fetchResidentHistories nếu userId đã được set
    if (userId) {
      fetchResidentHistories(userId);
    }
  }, [userId]);

  const fetchResidentHistories = async (userId) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/resident/${userId}`, {
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      setResidentHistories(response.data.data); // Set data into residentHistories
    } catch (err) {
      console.error('Lỗi khi lấy thông tin booking:', err);
    }
  };

  const fetchUserBed = async (userId) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/resident/userbed/${userId}`);
      setSelectedUser(response.data); // Set selected user details
      setShowModal(true); // Show modal
    } catch (err) {
      console.error('Lỗi khi lấy thông tin username và bed_number:', err);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Resident Histories</h1>
      <table className="table table-striped">
        <thead className="thead">
          <tr>
            <th>Student name</th>
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
              <td>{history.username}</td>
              <td>{history.bed_number}</td>
              <td>{history.start_date}</td>
              <td>{history.end_date}</td>
              <td>{history.price}</td>
              <td>{history.semester}</td>
              <td>
                <Button onClick={() => fetchUserBed(userId)}>
                  Roommates
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal to display user details */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Roommates Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser ? (
            <>
              <p><strong>Username:</strong> {selectedUser.username}</p>
              <p><strong>Bed Number:</strong> {selectedUser.bed_number}</p>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ResidentHistories;
