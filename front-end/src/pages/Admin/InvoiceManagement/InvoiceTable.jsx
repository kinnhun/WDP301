import { useState, useEffect } from "react";
import axios from "../../../utils/axios";
import toast from "react-hot-toast";
import Spinner from "../../../components/Spinner/Spinner";
import { formatDate } from "../../../utils/formatDate";

const InvoiceTable = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [invoices, setInvoices] = useState([]);

  const getInvoices = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/invoice");
      if (response.status === 200) {
        setInvoices(response.data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getInvoices();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  console.log(invoices);
  return (
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
        {invoices.length > 0 &&
          invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.type}</td>
              <td>{invoice.amount}</td>
              <td>{invoice.status === 0 ? "Unpaid" : "Paid"}</td>
              <td>{invoice.created_at && formatDate(invoice.created_at)}</td>
              <td>{invoice.expired_date && formatDate(invoice.expired_date)}</td>
              <td>{invoice.payment_at && formatDate(invoice.payment_at)}</td>
              <td>{invoice.email}</td>
              <td>{invoice.room}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default InvoiceTable;
