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
  const handleDeleteSemester = async (semesterId) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/semester/delete/${semesterId}`);
      if (response.data.success) {
        await fetchSemesters();
        
      }
    } catch (err) {
      console.error('Error deleting semester:', err);
    }
    await fetchSemesters();

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
      <button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>
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
              <td>{index + 1}</td> {/* Display sequential ID */}
              <td>{semester.semester_name}</td>
              <td>{new Date(semester.start_date).toLocaleDateString()}</td>
              <td>{new Date(semester.end_date).toLocaleDateString()}</td>
              <td>{semester.status}</td>
              <td>
                {/* Only show delete button if status is 'Coming' */}
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
            />
          </div>
          <div className="mb-3">
            <label htmlFor="startDate" className="form-label">Start Date</label>
            <input
              type="date"
              id="startDate"
              className="form-control"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="endDate" className="form-label">End Date</label>
            <input
              type="date"
              id="endDate"
              className="form-control"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
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
