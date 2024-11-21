import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';

const ManagerSemester = () => {
  const [semesters, setSemesters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal states for changing status
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [newStatus, setNewStatus] = useState('Coming');
  const [selectedSemesterId, setSelectedSemesterId] = useState(null);

  // Modal states for creating semester
  const [showModal, setShowModal] = useState(false);
  const [semesterName, setSemesterName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('Coming');

  // Fetch all semester data from API
  const fetchSemesters = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/semester/all');
      setSemesters(response.data.data);
      setLoading(false);
    } catch (err) {
      setError('An error occurred while fetching the semester data');
      setLoading(false);
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
    }, new Date(0));

    const newStartDate = new Date(latestEndDate);
    newStartDate.setDate(latestEndDate.getDate() + 1);

    setStartDate(newStartDate.toISOString().split('T')[0]);

    const newEndDate = new Date(newStartDate);
    newEndDate.setMonth(newStartDate.getMonth() + 4);

    setEndDate(newEndDate.toISOString().split('T')[0]);
  };

  // Handle create semester
  const handleCreateSemester = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/semester/create', {
        semester_name: semesterName,
        start_date: startDate,
        end_date: endDate,
        status: status,
      });
      if (response.data.success) {
        setShowModal(false);
        await fetchSemesters();
      }
    } catch (err) {
      console.error('Error creating semester:', err);
    }
  };

  // Handle delete semester
  const handleDeleteSemester = async (semesterId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this semester?');
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`http://localhost:8080/api/semester/delete/${semesterId}`);
      if (response.data.success) {
        await fetchSemesters();
      }
    } catch (err) {
      console.error('Error deleting semester:', err);
    }
  };

  // Handle change status click
  const handleChangeStatus = (semesterId, currentStatus) => {
    setSelectedSemesterId(semesterId);
    setNewStatus(currentStatus);
    setShowStatusModal(true);
  };

  // Handle update status
  const handleUpdateStatus = async () => {
    try {
      // If the new status is 'Active', update all other active semesters to 'Inactive'
      if (newStatus === 'Active') {
        // Find all the active semesters and update them to inactive
        await Promise.all(
          semesters.filter(semester => semester.status === 'Active' && semester.semester_id !== selectedSemesterId)
            .map(async (semester) => {
              await axios.put(
                `http://localhost:8080/api/semester/update-status/${semester.semester_id}`,
                { status: 'Inactive' }
              );
            })
        );
        console.log('All other active semesters have been updated to Inactive');
      }

      // Then update the selected semester's status to the new status (Active or Inactive)
      const updateResponse = await axios.put(
        `http://localhost:8080/api/semester/update-status/${selectedSemesterId}`,
        { status: newStatus }
      );

      if (updateResponse.data.success) {
        fetchSemesters(); // Refresh the list of semesters
        setShowStatusModal(false); // Close the modal after successful update
      }

    } catch (err) {
      console.error('Error updating semester status:', err);
    }
  };

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
        calculateDates();
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
                <button
                  className="btn btn-warning"
                  onClick={() => handleChangeStatus(semester.semester_id, semester.status)}
                >
                  Change Status
                </button>
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

      {/* Modal for creating semester */}
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

      {/* Modal for changing status */}
      <Modal show={showStatusModal} onHide={() => setShowStatusModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Change Semester Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label className="form-label">Select Status</label>
            <select
              className="form-control"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              <option value="Coming">Coming</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowStatusModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateStatus}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManagerSemester;
