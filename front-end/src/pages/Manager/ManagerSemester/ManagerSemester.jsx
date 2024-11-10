import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const ManagerSemester = () => {
  const [semesters, setSemesters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [semesterName, setSemesterName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('Coming'); // Default status is 'Coming'

  // Fetch all semester data from API
  const fetchSemesters = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/semester/all');
      setSemesters(response.data.data); // Store semester data in state
      setLoading(false); // Set loading state to false once data is fetched
    } catch (err) {
      setError('An error occurred while fetching the semester data');
      setLoading(false); // Set loading state to false in case of error
    }
  };

  useEffect(() => {
    fetchSemesters();
  }, []);

  // Function to calculate the next Start Date and End Date
  const calculateDates = () => {
    const latestEndDate = semesters.reduce((latest, semester) => {
      const currentEndDate = new Date(semester.end_date);
      return currentEndDate > latest ? currentEndDate : latest;
    }, new Date(0)); // Start with a very old date

    const newStartDate = new Date(latestEndDate);
    newStartDate.setDate(latestEndDate.getDate() + 1); // Set start date to 1 day after the latest end date

    // Set the start and end date state
    setStartDate(newStartDate.toISOString().split('T')[0]); // Format as yyyy-mm-dd
    const newEndDate = new Date(newStartDate);
    newEndDate.setMonth(newStartDate.getMonth() + 4); // Set end date 4 months later
    setEndDate(newEndDate.toISOString().split('T')[0]); // Format as yyyy-mm-dd
  };

  // Handle create semester
  const handleCreateSemester = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/semester/create', {
        semester_name: semesterName,
        start_date: startDate,
        end_date: endDate,
        status: status, // Send the default or updated status
      });
      if (response.data.success) {
        // Close modal and refetch semesters
        setShowModal(false);
        await fetchSemesters();
      }
    } catch (err) {
      console.error('Error creating semester:', err);
    }
  };

  // Handle delete semester
 // Handle delete semester
const handleDeleteSemester = async (semesterId) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this semester?");
  if (!confirmDelete) return; // Nếu người dùng không xác nhận, thoát khỏi hàm

  try {
    const response = await axios.delete(`http://localhost:8080/api/semester/delete/${semesterId}`);
    if (response.data.success) {
      await fetchSemesters(); // Tải lại danh sách học kỳ sau khi xóa
    }
  } catch (err) {
    console.error('Error deleting semester:', err);
  }
  await fetchSemesters(); // Tải lại danh sách học kỳ sau khi xóa

};


  // Display loading message or error
  if (loading) {
    return <div>Loading semester data...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Semester List</h2>
      <button className="btn btn-primary mb-3" onClick={() => {
        calculateDates(); // Calculate start and end date when opening modal
        setShowModal(true);
      }}>
        Create New Semester
      </button>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Semester Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {semesters.map((semester, index) => (
            <tr key={semester.semester_id}>
              <td>{index + 1}</td>
              <td>{semester.semester_name}</td>
              <td>{new Date(semester.start_date).toLocaleDateString()}</td>
              <td>{new Date(semester.end_date).toLocaleDateString()}</td>
              <td>{semester.status}</td>
              <td>
                {semester.status === 'Coming' && (
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteSemester(semester.semester_id)}
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Bootstrap Modal for Creating a Semester */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Semester</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="semesterName" className="form-label">Semester Name</label>
            <input
              type="text"
              id="semesterName"
              className="form-control"
              value={semesterName}
              onChange={(e) => setSemesterName(e.target.value)}
              placeholder="Enter semester name (e.g., Summer, Spring)"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="startDate" className="form-label">Start Date</label>
            <input
              type="date"
              id="startDate"
              className="form-control"
              value={startDate}
              disabled
            />
          </div>
          <div className="mb-3">
            <label htmlFor="endDate" className="form-label">End Date</label>
            <input
              type="date"
              id="endDate"
              className="form-control"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)} // User can change end date
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateSemester}>
            Create Semester
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManagerSemester;
