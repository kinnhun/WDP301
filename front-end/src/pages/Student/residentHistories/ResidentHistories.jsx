import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const ResidentHistories = () => {
  const [residentHistories, setResidentHistories] = useState([]);
  const [userId, setUserId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]); // Lưu danh sách roommate cho modal

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

  const fetchRoommates = async (roomId, semester) => {
    try {
      const response = await axios.get(`http://localhost:8080/resident/roommates/roomates`, {
        params: { roomId, semester },
      });
      setSelectedUsers(response.data.data); // Lưu danh sách roommate
      setShowModal(true); // Hiển thị modal
    } catch (err) {
      console.error('Lỗi khi lấy thông tin roommate:', err);
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
            <th>Room Information</th>
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
              <td>{history.room_id}</td>
              <td>{history.start_date}</td>
              <td>{history.end_date}</td>
              <td>{history.price}</td>
              <td>{history.semester}</td>
              <td>
                <Button onClick={() => fetchRoommates(history.room_id, history.semester)}>
                  Roommates
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal to display roommates info */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Roommates Info</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {selectedUsers.length > 0 ? (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Username</th>
            <th>Bed Number</th>
          </tr>
        </thead>
        <tbody>
          {selectedUsers.map((user, index) => (
            <tr key={index}>
              <td>{user.username}</td>
              <td>{user.bed_number}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
