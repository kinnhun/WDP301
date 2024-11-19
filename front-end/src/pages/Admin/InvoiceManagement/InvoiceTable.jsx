import { useState, useEffect } from "react";
import axios from "../../../utils/axios";
import Spinner from "../../../components/Spinner/Spinner";
import { formatDate } from "../../../utils/formatDate";
import MyPagination from "../../../components/Pagination/Pagination";
import "./InvoiceTable.scss";

const InvoiceTable = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [allInvoices, setAllInvoices] = useState([]); // Tất cả hóa đơn được tải một lần từ API
  const [displayedInvoices, setDisplayedInvoices] = useState([]); // Hóa đơn được hiển thị sau khi lọc và phân trang
  const [filters, setFilters] = useState({
    room: "",
    email: "",
    status: "",
    type: "",
  });
  const [types, setTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 10;
  const indexOfLast = currentPage * itemPerPage;
  const indexOfFirst = indexOfLast - itemPerPage;
  const currentInvoices = displayedInvoices.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(displayedInvoices.length / itemPerPage);

  const fetchInvoiceTypes = async () => {
    try {
      const response = await axios.get("/invoice/types");
      if (response.status === 200) {
        setTypes(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchInvoices = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/invoice");
      if (response.status === 200) {
        setAllInvoices(response.data.data);
        setDisplayedInvoices(response.data.data); // Hiển thị tất cả hóa đơn lúc đầu
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...allInvoices];

    // Lọc theo Room
    if (filters.room) {
      filtered = filtered.filter((invoice) =>
        invoice.room_number.toLowerCase().includes(filters.room.toLowerCase())
      );
    }

    // Lọc theo Email
    if (filters.email) {
      filtered = filtered.filter((invoice) =>
        invoice.email.toLowerCase().includes(filters.email.toLowerCase())
      );
    }

    // Lọc theo Status
    if (filters.status) {
      filtered = filtered.filter(
        (invoice) =>
          (filters.status === "Paid" && invoice.status === true) ||
          (filters.status === "Unpaid" && invoice.status === false)
      );
    }

    // Lọc theo Type
    if (filters.type) {
      filtered = filtered.filter((invoice) => invoice.type === filters.type);
    }

    // Cập nhật hóa đơn hiển thị theo trang

    setDisplayedInvoices(filtered);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearch = () => {
    setCurrentPage(1); // Reset về trang đầu tiên khi tìm kiếm
    applyFilters(); // Áp dụng bộ lọc
  };

  useEffect(() => {
    fetchInvoiceTypes();
    fetchInvoices();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, currentPage, allInvoices]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      {/* Filters Section */}
      <div className="filters">
        <div className="form-group">
          <input
            type="text"
            value={filters.room}
            placeholder="Search by Room"
            onChange={(e) => handleFilterChange("room", e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            value={filters.email}
            placeholder="Search by Email"
            onChange={(e) => handleFilterChange("email", e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
            className="form-control"
          >
            <option value="">All</option>
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
          </select>
        </div>
        <div className="form-group">
          <select
            value={filters.type}
            onChange={(e) => handleFilterChange("type", e.target.value)}
            className="form-control"
          >
            <option value="">All</option>
            {types.map((type) => (
              <option key={type.id} value={type.name}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* Invoice Table */}
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Created Date</th>
            <th>Expired Date</th>
            <th>Paid Date</th>
            <th>User</th>
            <th>Room</th>
          </tr>
        </thead>
        <tbody>
          {currentInvoices.length > 0 ? (
            currentInvoices.map((invoice) => (
              <tr key={invoice.id}>
                <td>{invoice.type}</td>
                <td>{invoice.amount}</td>
                <td>{invoice.status === false ? "Unpaid" : "Paid"}</td>
                <td>{invoice.created_at && formatDate(invoice.created_at)}</td>
                <td>{invoice.expired_date && formatDate(invoice.expired_date)}</td>
                <td>{invoice.payment_at && formatDate(invoice.payment_at)}</td>
                <td>{invoice.email}</td>
                <td>{invoice.room_number}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No invoices found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <MyPagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default InvoiceTable;
