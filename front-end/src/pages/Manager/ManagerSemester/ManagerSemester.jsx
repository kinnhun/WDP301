import axios from 'axios';
import { useEffect, useState } from 'react';
import { Alert, Button, Modal, Table } from 'react-bootstrap';

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
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:8080/api/semester/all');
      setSemesters(response.data.data); // Store semester data in state
    } catch (err) {
      setError('An error occurred while fetching the semester data');
    } finally {
      setLoading(false);
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
        status, // Send the default or updated status
      });
      if (response.data.success) {
        // Close modal, reset fields, and refetch semesters
        setShowModal(false);
        setSemesterName('');
        setStartDate('');
        setEndDate('');
        await fetchSemesters();
      }
    } catch (err) {
      console.error('Error creating semester:', err);
      setError('Error creating semester.');
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
      setError('Error deleting semester.');
    }
  };

  return (
    <div>
      <h2>Semester List</h2>
      <Button className="mb-3" onClick={() => setShowModal(true)}>
        Create New Semester
      </Button>

      {loading ? (
        <p>Loading semester data...</p>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Table striped bordered hover>
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
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteSemester(semester.semester_id)}
                    >
                      Delete
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

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
              required
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
              required
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
              required
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
