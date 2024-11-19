import axios from "../../../utils/axios";
import MyPagination from "../../../components/Pagination/Pagination";
import { useEffect, useState } from "react";
import { verifyAccessToken } from "../../../utils/jwt";
import { formatDate } from "../../../utils/formatDate";
import Spinner from "../../../components/Spinner/Spinner";
import toast from "react-hot-toast";

const Invoice = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [types, setTypes] = useState([]);
  const [allInvoices, setAllInvoices] = useState([]); // Lưu toàn bộ dữ liệu
  const [filteredInvoices, setFilteredInvoices] = useState([]); // Dữ liệu sau khi lọc
  const [filters, setFilters] = useState({ status: "", type: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Số hóa đơn mỗi trang

  const getInvoices = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    const user = verifyAccessToken(token);
    if (user) {
      try {
        setIsLoading(true);
        const response = await axios.get(`/invoice/${user.email}`);
        if (response.status === 200) {
          setAllInvoices(response.data.data); // Lưu toàn bộ dữ liệu
          setFilteredInvoices(response.data.data); // Khởi tạo dữ liệu lọc
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const applyFilters = () => {
    const filtered = allInvoices.filter((invoice) => {
      const matchesStatus =
        filters.status === "" ||
        (filters.status === "Paid" && invoice.status) ||
        (filters.status === "Unpaid" && !invoice.status);
      const matchesType =
        filters.type === "" || invoice.type.toLowerCase().includes(filters.type.toLowerCase());
      return matchesStatus && matchesType;
    });
    setFilteredInvoices(filtered);
    setCurrentPage(1); // Reset về trang đầu tiên
  };

  const handleFilterChange = (field, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePayment = async (id) => {
    try {
      const response = await axios.patch(`/invoice/${id}`);
      if (response.status === 200) {
        toast.success("Payment successful");
        getInvoices();
      }
    } catch (error) {
      console.error(error);
      toast.error("Payment failed");
    }
  };

  const getInvoiceTypes = async () => {
    try {
      const response = await axios.get("/invoice/types");
      if (response.status === 200) {
        setTypes(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getInvoices();
    getInvoiceTypes();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, allInvoices]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentInvoices = filteredInvoices.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      {/* Filters Section */}
      <div className="filters">
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
            <th></th>
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
                <td>
                  {invoice.status === false && (
                    <button className="btn btn-primary" onClick={() => handlePayment(invoice.id)}>
                      Pay
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No invoices found.</td>
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

export default Invoice;
