import axios from 'axios';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [rooms, setRooms] = useState([]);
  const [availableRooms, setAvailableRooms] = useState(0);
  const [bookedRooms, setBookedRooms] = useState(0);
  const [maintenanceRooms, setMaintenanceRooms] = useState(0);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Phòng Trống',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'Phòng Đã Đặt',
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  });

  // Lấy dữ liệu phòng khi component được mount
  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/room');
      const roomsData = response.data.data;
      setRooms(roomsData);

      // Tính số lượng phòng theo trạng thái
      const availableCount = roomsData.filter(room => room.availability_status === 'Available').length;
      const bookedCount = roomsData.filter(room => room.availability_status === 'Booked').length;
      const maintenanceCount = roomsData.filter(room => room.availability_status === 'Under Maintenance').length;

      setAvailableRooms(availableCount);
      setBookedRooms(bookedCount);
      setMaintenanceRooms(maintenanceCount);

      // Xử lý dữ liệu cho biểu đồ
      processChartData(roomsData);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu phòng:", error);
    }
  };

  const processChartData = (roomsData) => {
    const dataByPeriod = roomsData.reduce((acc, room) => {
      const period = new Date(room.updated_at).toLocaleDateString(); // Nhóm theo ngày cập nhật
      if (!acc[period]) {
        acc[period] = { available: 0, booked: 0 };
      }
      if (room.availability_status === 'Available') {
        acc[period].available += 1;
      } else if (room.availability_status === 'Booked') {
        acc[period].booked += 1;
      }
      return acc;
    }, {});

    // Dữ liệu cho biểu đồ
    const labels = Object.keys(dataByPeriod);
    const availableData = labels.map(period => dataByPeriod[period].available);
    const bookedData = labels.map(period => dataByPeriod[period].booked);

    const newChartData = {
      labels,
      datasets: [
        {
          label: 'Phòng Trống',
          data: availableData,
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
        {
          label: 'Phòng Đã Đặt',
          data: bookedData,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    };

    setChartData(newChartData);
  };

  return (
    <div>
      <div className="row">
        {/* Room Summary Cards */}
        <div className="col-xl-4 col-lg-4">
          <div className="card tilebox-one">
            <div className="card-body">
              <i className='uil uil-bed float-end'></i>
              <h6 className="text-uppercase mt-0">Phòng Trống</h6>
              <h2 className="my-2">{availableRooms}</h2>
            </div>
          </div>
        </div>

        <div className="col-xl-4 col-lg-4">
          <div className="card tilebox-one">
            <div className="card-body">
              <i className='uil uil-check-circle float-end'></i>
              <h6 className="text-uppercase mt-0">Phòng Đã Đặt</h6>
              <h2 className="my-2">{bookedRooms}</h2>
            </div>
          </div>
        </div>

        <div className="col-xl-4 col-lg-4">
          <div className="card tilebox-one">
            <div className="card-body">
              <i className='uil uil-wrench float-end'></i>
              <h6 className="text-uppercase mt-0">Đang Bảo Trì</h6>
              <h2 className="my-2">{maintenanceRooms}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Biểu đồ phòng trống và đã đặt theo kỳ */}
      <div className="card mt-4">
        <div className="card-body">
          <h4 className="header-title mb-3">Biểu Đồ Trạng Thái Phòng Theo Kỳ</h4>
          {chartData && chartData.labels.length > 0 ? (
            <Bar data={chartData} options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Số Lượng Phòng Trống và Đã Đặt Theo Kỳ',
                },
              },
            }} />
          ) : (
            <p>Đang tải dữ liệu biểu đồ...</p>
          )}
        </div>
      </div>

    
    </div>
  );
};

export default Dashboard;
