import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Modal, Row, Table } from "react-bootstrap";
import { verifyAccessToken } from "../../../utils/jwt";
import Payment from "../payment/payment";

const Book = () => {
  const [roomType, setRoomType] = useState("");
  const [dorm, setDorm] = useState("");
  const [dorms, setDorms] = useState([]);
  const [floor, setFloor] = useState("");
  const [availableRooms, setAvailableRooms] = useState([]);
  const [roomCategory, setRoomCategory] = useState([]);
  const [floors, setFloors] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [beds, setBeds] = useState([]);
  const [noRoomsAvailable, setNoRoomsAvailable] = useState(false);
  const [selectedBed, setSelectedBed] = useState("");
  const [semesters, setSemesters] = useState([]);

  const [gender, setGender] = useState('');
  // State to manage booking details
  const [showBookingDetails, setShowBookingDetails] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({});

  const [semesterStartDate, setSemesterStartDate] = useState("");
  const [semesterEndDate, setSemesterEndDate] = useState("");

  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleCheckboxChange = (event) => { setAgreeToTerms(event.target.checked); };

  useEffect(() => {
    // Retrieve token from localStorage
    const token = localStorage.getItem('token');

    if (token) {
      try {
        // Decode the token to extract the payload
        const payload = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(payload));

        // Extract gender from the decoded payload (make sure the field exists)
        if (decodedPayload && decodedPayload.gender) {
          setGender(decodedPayload.gender);  // Set the gender
        } else {
          setGender('N/A'); // Set default value if gender is not available
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        setGender('N/A'); // Set default value in case of error
      }
    } else {
      setGender('N/A'); // Set default value if no token found
    }
  }, []);






  const fetchActiveSemesters = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/semester/active`);
      if (response.data.success && response.data.data) {
        if (Array.isArray(response.data.data)) {
          setSemesters(response.data.data);
        } else {
          setSemesters([response.data.data]); // Wrap in an array if it's a single object
        }
        // Set start_date and end_date for the active semester
        setSemesterStartDate(response.data.data.start_date);
        setSemesterEndDate(response.data.data.end_date);
        console.log("Fetched Semesters:", response.data.data);
      } else {
        console.error("Không thể lấy dữ liệu kỳ:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching active semesters:", error);
    }
  };

  // Fetch functions
  const fetchRoomCategory = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/room/roomCategories/all`
      );
      if (response.data.success) {
        setRoomCategory(response.data.data);
      } else {
        console.error("Không thể lấy dữ liệu danh mục phòng:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching room categories:", error);
    }
  };

  const fetchDorms = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/room/dorms/all`);
      if (response.data.success) {
        setDorms(response.data.data);
      } else {
        console.error("Không thể lấy dữ liệu dorm:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching dorms:", error);
    }
  };

  const fetchFloors = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/room/floor/all`);
      if (response.data.success) {
        setFloors(response.data.data);
      } else {
        console.error("Không thể lấy dữ liệu tầng:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching floors:", error);
    }
  };

  const fetchAvailableRooms = async () => {
    if (!roomType || !dorm || !floor || !gender) return;
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL
        }/api/room/rooms/type/${roomType}/floor/${floor}/dorm/${dorm}/gender/${gender}`
      );
      if (response.data.success) {
        const rooms = response.data.data;
        setAvailableRooms(rooms);
        setNoRoomsAvailable(rooms.length === 0);
      } else {
        console.error("Không thể lấy dữ liệu phòng:", response.data.message);
        setNoRoomsAvailable(true);
      }
    } catch (error) {
      console.error("Error fetching available rooms:", error);
      setNoRoomsAvailable(true);
    }
  };

  const fetchGetBedAvailableFromRoom = async (roomId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/room/bed/available/room/${roomId}`
      );
      if (response.data.success) {
        setBeds(response.data.data);
        setSelectedBed(""); // Reset selected bed when fetching new beds
      } else {
        console.error("Không thể lấy dữ liệu giường:", response.data.message);
        setBeds([]); // Reset beds if there's an error
      }
    } catch (error) {
      console.error("Error fetching beds:", error);
      setBeds([]); // Reset beds if there's an error
    }
  };

  const handleConfirmBooking = async () => {
    console.log("Selected Room:", selectedRoom);
    console.log("Available Rooms:", availableRooms);

    const selectedRoomDetails = availableRooms.find(
      (room) => room.room_id === Number(selectedRoom)
    );
    if (!selectedRoomDetails) {
      console.error("Selected room not found in available rooms");
      return;
    }

    console.log("Selected Room Details:", selectedRoomDetails);

    const totalAmount = selectedRoomDetails?.price || 0;

    // Lấy userId từ token
    const token = JSON.parse(localStorage.getItem("token"));
    console.log("Token:", token);

    const user = verifyAccessToken(token);
    console.log("Decoded User:", user);
    const userId = user ? user.id : null;
    const userName = user ? user.username : "Unknown"; // Sử dụng username từ user nếu có

    if (!userId) {
      console.error("User ID is not available");
      return;
    }

    // Use start_date and end_date from the active semester
    const startDate = semesterStartDate || new Date().toISOString();
    const endDate = semesterEndDate || new Date().toISOString();

    // Lấy roomType từ selectedRoomDetails
    const roomTypeName = roomCategory.find(
      (category) => category.room_type_id === selectedRoomDetails.room_type_id
    );
    console.log("Found Room Type:", roomTypeName);

    const semesterDetails = semesters.length > 0 ? semesters[0] : {};

    // Lấy bed_number từ selectedBed
    const selectedBedDetails = beds.find((bed) => bed.bed_id === Number(selectedBed));
    const bedNumber = selectedBedDetails ? selectedBedDetails.bed_number : "Unknown";

    const bookingInfo = {
      room_id: selectedRoom,
      user_id: userId,
      start_date: startDate,
      end_date: endDate,
      total_amount: totalAmount,
      payment_status: "Pending",
      booking_status: "Pending",
      bed_id: selectedBed,
      roomType: roomTypeName ? roomTypeName.category_name : "Unknown",
      dorm,
      floor,

      semester_name: semesterDetails.semester_name, // Add semester name
      semester_start_date: semesterDetails.start_date, // Add semester start date
      semester_end_date: semesterDetails.end_date, // Add semester end date

      // Thông tin hiển thị thêm
      room_name: selectedRoomDetails.room_number, // Lấy room_number từ selectedRoomDetails
      user_name: userName, // Lấy user_name từ token
      bed_number: bedNumber, // Lấy bed_number từ selectedBedDetails
    };

    // Hiển thị booking info và mở modal
    setBookingDetails(bookingInfo);
    setShowBookingDetails(true);
  };

  useEffect(() => {
    fetchRoomCategory();
    fetchFloors();
    fetchDorms();
    fetchActiveSemesters();
  }, []);

  useEffect(() => {
    fetchAvailableRooms();
  }, [roomType, dorm, floor]);

  const handleRoomTypeChange = (e) => {
    setRoomType(e.target.value);
    setAvailableRooms([]); // Reset available rooms
    setSelectedRoom(""); // Reset selected room
    setBeds([]); // Reset available beds
    setSelectedBed(""); // Reset selected bed
  };

  const handleDormChange = (e) => {
    setDorm(e.target.value);
    setAvailableRooms([]); // Reset available rooms
    setSelectedRoom(""); // Reset selected room
    setBeds([]); // Reset available beds
    setSelectedBed(""); // Reset selected bed
  };

  const handleFloorChange = (e) => {
    setFloor(e.target.value);
    setAvailableRooms([]); // Reset available rooms
    setSelectedRoom(""); // Reset selected room
    setBeds([]); // Reset available beds
    setSelectedBed(""); // Reset selected bed
  };

  useEffect(() => {
    console.log("Updated Semesters State:", semesters);
  }, [semesters]);

  console.log("gender", gender)

  return (
    <Container className="mt-4">
      <h1 className="mb-4 text-center">New Booking</h1>

      <Alert variant="warning" >
        <p> You are booking a <strong>{gender}</strong> room, please double check before booking.
          Contact your student service if your gender information is not correct. </p>
        <p> (Bạn đang đặt phòng cho giới tính <strong>{gender === "male"
          ? 'Nam'
          : gender === "female"
            ? 'Nữ'
            : 'N/A'}</strong>, vui lòng kiểm tra kỹ trước khi đặt.
          Nếu thông tin giới tính của bạn không đúng,
          liên hệ dịch vụ sinh viên để cập nhật lại thông tin giới tính.) </p> </Alert>





      {semesters.length > 0 ? (
        <div className="mb-4">
          <h2>Semesters</h2>
          <ul>
            {semesters.map((semester) => (
              <li key={semester.semester_id}>
                {semester.semester_name} - {new Date(semester.start_date).toLocaleDateString()} to{" "}
                {new Date(semester.end_date).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <Alert variant="info">No active semesters found.</Alert>
      )}

      <Row className="mb-3">
        <Col md={4}>
          <Form.Group controlId="roomType">
            <Form.Label>Room Type</Form.Label>
            <Form.Control as="select" value={roomType} onChange={handleRoomTypeChange}>
              <option value="">Select Room Type</option>
              {roomCategory.map((category) => (
                <option key={category.room_type_id} value={category.room_type_id}>
                  {category.category_name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="dorm">
            <Form.Label>Dorm</Form.Label>
            <Form.Control as="select" value={dorm} onChange={handleDormChange}>
              <option value="">Select Dorm</option>
              {dorms.map((d) => (
                <option key={d.dorm} value={d.dorm}>
                  {d.dorm}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="floor">
            <Form.Label>Floor</Form.Label>
            <Form.Control as="select" value={floor} onChange={handleFloorChange}>
              <option value="">Select Floor</option>
              {floors.map((f) => (
                <option key={f.floor_number} value={f.floor_number}>
                  {f.floor_number}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>

      {availableRooms.length > 0 ? (
        <Form.Group controlId="roomSelect" className="mb-4">
          <Form.Label>Select Room</Form.Label>
          <Form.Control
            as="select"
            value={selectedRoom}
            onChange={(e) => {
              const roomId = e.target.value;
              setSelectedRoom(roomId);
              fetchGetBedAvailableFromRoom(roomId);
            }}
          >
            <option value="">Select Room</option>
            {availableRooms.map((room) => (
              <option key={room.room_id} value={room.room_id}>
                {room.room_number} - {room.price} VND
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      ) : (
        noRoomsAvailable && (
          <Alert variant="warning">No available rooms found for the selected criteria.</Alert>
        )
      )}

      <Row>
        {/* Available Rooms - 2/3 of width */}
        <Col md={8}>
          {availableRooms.length > 0 && (
            <>
              <h2 className="mt-4">Available Rooms</h2>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Room Number</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {availableRooms.map((room) => (
                    <tr key={room.room_id}>
                      <td>{room.room_number}</td>
                      <td>{room.price} VND</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </Col>

        {/* Available Beds - 1/3 of width */}
        <Col md={4}>
          {selectedRoom && beds.length > 0 ? (
            <div>
              <h3 className="mt-4">
                Available Beds for Room{" "}
                {availableRooms.find((room) => room.room_id === Number(selectedRoom))?.room_number}
              </h3>

              <Form.Group controlId="bedSelect">
                <Form.Label>Select Bed</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedBed}
                  onChange={(e) => setSelectedBed(e.target.value)}
                >
                  <option value="">Select Bed</option>
                  {beds.map((bed) => (
                    <option key={bed.bed_id} value={bed.bed_id}>
                      {bed.bed_number} - {bed.availability_status}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Bed Number</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {beds.map((bed) => (
                    <tr key={bed.bed_id}>
                      <td>{bed.bed_number}</td>
                      <td>{bed.availability_status}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              {/* Hiển thị nút Confirm Booking khi có giường được chọn */}


              <Form>
                <Form.Group controlId="termsCheckbox">
                  <Form.Check type="checkbox" label={<> Agree to
                    <a href="https://ocd.fpt.edu.vn/Files/policy/KTX-HL.pdf" target="_blank" rel="noopener noreferrer" style={{ color: 'red' }}> Dormitory Regulations </a> .(Đồng ý với quy định ký túc xá). </>}
                    checked={agreeToTerms} onChange={handleCheckboxChange} />
                </Form.Group>
                <Button variant="primary" onClick={handleConfirmBooking} disabled={!agreeToTerms || !selectedBed} > Confirm Booking </Button>
              </Form>
            </div>
          ) : selectedRoom && beds.length === 0 ? (
            <Alert variant="info">No available beds for the selected room.</Alert>
          ) : (
            <Alert variant="info">Please select a room to see available beds.</Alert>
          )}
        </Col>
      </Row>

      <Modal
        show={showBookingDetails}
        onHide={() => setShowBookingDetails(false)}
        className="custom-modal-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Booking Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-layout">
          <div className="bill-details">
            <p>
              <strong>Room Type:</strong> {bookingDetails.roomType}
            </p>
            <p>
              <strong>Dorm:</strong> {bookingDetails.dorm}
            </p>
            <p>
              <strong>Floor:</strong> {bookingDetails.floor_number}
            </p>
            <p>
              <strong>Room Number:</strong> {bookingDetails.room_name}
            </p>
            <p>
              <strong>Bed Number:</strong> {bookingDetails.bed_number}
            </p>
            <p>
              <strong>User:</strong> {bookingDetails.user_name}
            </p>
            <p>
              <strong>Total Amount:</strong> {bookingDetails.total_amount} VND
            </p>
            <p>
              <strong>Semester Start Date:</strong>{" "}
              {new Date(bookingDetails.semester_start_date).toLocaleDateString()}
            </p>
            <p>
              <strong>Semester End Date:</strong>{" "}
              {new Date(bookingDetails.semester_end_date).toLocaleDateString()}
            </p>
          </div>
          <div className="qr-code">
            <Payment bookingDetails={bookingDetails} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowBookingDetails(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Book;
