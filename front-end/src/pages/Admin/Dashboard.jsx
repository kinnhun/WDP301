import axios from 'axios';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

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
  
  const [revenueChartData, setRevenueChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Doanh Thu (VND)',
        data: [],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  });

  useEffect(() => {
    fetchRooms();
    fetchRevenueData(); // Thêm dòng này để lấy dữ liệu doanh thu
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

      // Xử lý dữ liệu cho biểu đồ trạng thái phòng
      processChartData(roomsData);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu phòng:", error);
    }
  };

  // Hàm mới để lấy dữ liệu doanh thu
  const fetchRevenueData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/booking');
      const bookingsData = response.data.data;

      // Xử lý dữ liệu doanh thu
      processRevenueChartData(bookingsData);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu doanh thu:", error);
    }
  };

  const processChartData = (roomsData) => {
    const dataByPeriod = roomsData.reduce((acc, room) => {
      const period = new Date(room.updated_at).toLocaleDateString();
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

    const labels = Object.keys(dataByPeriod);
    const availableData = labels.map(period => dataByPeriod[period].available);
    const bookedData = labels.map(period => dataByPeriod[period].booked);

    setChartData({
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
    });
  };

  const processRevenueChartData = (bookingsData) => {
    const revenueByPeriod = bookingsData.reduce((acc, booking) => {
      const period = new Date(booking.updated_at).toLocaleDateString();
      if (!acc[period]) {
        acc[period] = 0;
      }
      if (booking.payment_status === 'Completed') {
        acc[period] += booking.total_amount / 1000000; // Chia cho 1,000,000 để tính theo đơn vị triệu đồng
      }
      return acc;
    }, {});
  
    const labels = Object.keys(revenueByPeriod);
    const revenueData = labels.map(period => revenueByPeriod[period]);
  
    setRevenueChartData({
      labels,
      datasets: [
        {
          label: 'Doanh Thu (Triệu VND)',
          data: revenueData,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
        },
      ],
    });
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

      {/* Biểu đồ doanh thu theo kỳ */}
      <div className="card mt-4">
        <div className="card-body">
          <h4 className="header-title mb-3">Biểu Đồ Doanh Thu Theo Kỳ</h4>
          {revenueChartData && revenueChartData.labels.length > 0 ? (
            <Line data={revenueChartData} options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Doanh Thu (VND) Theo Kỳ',
                },
              },
            }} />
          ) : (
            <p>Đang tải dữ liệu biểu đồ doanh thu...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
