import axios from "../../../utils/axios";
import MyPagination from "../../../components/Pagination/Pagination";
import { useEffect, useState } from "react";
import { verifyAccessToken } from "../../../utils/jwt";
import { formatDate } from "../../../utils/formatDate";
import Spinner from "../../../components/Spinner/Spinner";
import toast from "react-hot-toast";
import { Modal, Button } from "react-bootstrap"; // Import Modal từ react-bootstrap
import "./Invoice.scss";

const Invoice = () => {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [types, setTypes] = useState([]);
  const [allInvoices, setAllInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [filters, setFilters] = useState({ status: "", type: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [qrUrl, setQrUrl] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [transactionStatus, setTransactionStatus] = useState("pending");
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);

  const handleShowDetailModal = (invoice) => {
    setSelectedInvoice(invoice);
    setShowDetailModal(true);
  };

  const getInvoicesTypes = async () => {
    try {
      const response = await axios.get("/invoice/types");
      if (response.status === 200) {
        setTypes(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getInvoices = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    const user = verifyAccessToken(token);
    if (user) {
      try {
        setIsLoading(true);
        const response = await axios.get(`/invoice/${user.email}`);
        if (response.status === 200) {
          const currentTimeUTC = new Date();
          const timezoneOffset = 7; // GMT+7
          const currentTimeGMT7 = new Date(
            currentTimeUTC.getTime() + timezoneOffset * 60 * 60 * 1000
          );

          const invoices = response.data.data.map((invoice) => {
            const expiredDate = new Date(invoice.expired_date);

            if (expiredDate < currentTimeGMT7 && invoice.status === false) {
              // Tính số ngày chậm
              const daysLate = Math.floor((currentTimeGMT7 - expiredDate) / (1000 * 60 * 60 * 24));
              // Cộng thêm 20,000 mỗi ngày muộn
              const updatedAmount = invoice.amount + daysLate * 10000;

              return {
                ...invoice,
                expired: true,
                fine: daysLate * 10000,
                daysLate,
              };
            }

            return {
              ...invoice,
              expired: false,
              fine: 0,
            };
          });

          setAllInvoices(invoices);
          setFilteredInvoices(invoices);
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
    setCurrentPage(1);
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

  const handleShowModal = async (id, amount) => {
    try {
      setSelectedInvoiceId(id);
      const response = await axios.post(`http://localhost:8080/create-vietqr?rand=${Date.now()}`, {
        amount,
      });
      setQrUrl(response.data.qrUrl);
      setTransactionId(response.data.transactionId);
      setTransactionStatus("pending");
      setShowModal(true);
    } catch (error) {
      console.error("Error creating VietQR:", error.message);
    }
  };

  const checkTransactionStatus = async () => {
    if (transactionId) {
      try {
        const response = await axios.get(
          `http://localhost:8080/check-transaction-status/${transactionId}?rand=${Date.now()}`
        );
        setTransactionStatus(response.data.status);

        if (response.data.status === "success") {
          toast.success("Payment successful");
          setShowModal(false);
          await axios.patch(`/invoice/${selectedInvoiceId}`);
          getInvoices();
        }
      } catch (error) {
        console.error("Error checking transaction status:", error.message);
      }
    }
  };

  useEffect(() => {
    if (transactionStatus === "pending") {
      const interval = setInterval(checkTransactionStatus, 5000);
      return () => clearInterval(interval);
    }
  }, [transactionId, transactionStatus]);

  useEffect(() => {
    getInvoices();
    getInvoicesTypes();
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

  console.log(currentInvoices);

  return (
    <div className="invoice">
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
              <tr
                key={invoice.id}
                className={invoice.expired ? "bg-danger bg-gradient bg-opacity-25" : ""}
              >
                <td>{invoice.type}</td>
                <td>{(invoice.amount + invoice.fine).toLocaleString()} đ</td>
                <td>{invoice.status === false ? "Unpaid" : "Paid"}</td>
                <td>{invoice.created_at && formatDate(invoice.created_at)}</td>
                <td>{invoice.expired_date && formatDate(invoice.expired_date)}</td>
                <td>{invoice.payment_at && formatDate(invoice.payment_at)}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleShowDetailModal(invoice)}
                  >
                    View Detail
                  </button>

                  {invoice.status === false && (
                    <button
                      className="btn btn-primary pay-btn"
                      onClick={() => handleShowModal(invoice.id, invoice.amount)}
                    >
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

      {/* Modal for QR Code */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Scan to Pay</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {qrUrl ? (
            <div>
              <img src={qrUrl} alt="QR Code" style={{ width: "100%" }} />
              <p>Status: {transactionStatus}</p>
              {transactionStatus === "pending" && <p>Waiting for payment...</p>}
              {transactionStatus === "success" && <p>Payment Successful!</p>}
            </div>
          ) : (
            <p>Loading QR Code...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button
            variant="success"
            onClick={async () => {
              // Chuyển trạng thái sang success
              setTransactionStatus("success");

              // Hiển thị trạng thái thanh toán trong 10 giây
              setTimeout(() => {
                setShowModal(false);
                toast.success("Fake payment completed!");
                try {
                  // Gọi API để cập nhật trạng thái hóa đơn
                  axios.patch(`/invoice/${selectedInvoiceId}`);
                  getInvoices();
                } catch (error) {
                  console.error("Error updating invoice:", error);
                }
              }, 5000); // Đóng modal sau 10 giây
            }}
          >
            Fake Payment
          </Button>
        </Modal.Footer>
      </Modal>

      {/* detail modal */}
      <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Invoice Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedInvoice ? (
            <div>
              {/* Thông tin tổng quan hóa đơn */}
              <p>
                <strong>Type:</strong> {selectedInvoice.type}
              </p>
              <p>
                <strong>Amount:</strong> {selectedInvoice.amount.toLocaleString()} đ
              </p>
              <p>
                <strong>Status:</strong> {selectedInvoice.status ? "Paid" : "Unpaid"}
              </p>
              <p>
                <strong>Created Date:</strong>{" "}
                {selectedInvoice.created_at && formatDate(selectedInvoice.created_at)}
              </p>
              <p>
                <strong>Expired Date:</strong>{" "}
                {selectedInvoice.expired_date && formatDate(selectedInvoice.expired_date)}
              </p>
              <p>
                <strong>Paid Date:</strong>{" "}
                {selectedInvoice.payment_at && formatDate(selectedInvoice.payment_at)}
              </p>
              <p>
                <strong>Description:</strong>{" "}
                {selectedInvoice.description && selectedInvoice.description}
              </p>

              {selectedInvoice.expired && (
                <p className="text-danger">
                  <strong>Note:</strong> This invoice is expired!
                </p>
              )}

              {/* Bảng chi tiết các mục */}
              {selectedInvoice.type === "Electricity & Water" && (
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Electricity</td>
                      <td>{selectedInvoice.electricity}</td>
                      <td>3,000 đ</td>
                      <td>{(selectedInvoice.electricity * 3000).toLocaleString()} đ</td>
                    </tr>
                    <tr>
                      <td>Water</td>
                      <td>{selectedInvoice.water}</td>
                      <td>10,000 đ</td>
                      <td>{(selectedInvoice.water * 10000).toLocaleString()} đ</td>
                    </tr>
                    <tr>
                      <td>Total</td>
                      <td></td>
                      <td></td>
                      <td>
                        {(
                          selectedInvoice.water * 10000 +
                          selectedInvoice.electricity * 3000
                        ).toLocaleString()}
                        đ
                      </td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>
          ) : (
            <p>No details available.</p>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetailModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Invoice;
