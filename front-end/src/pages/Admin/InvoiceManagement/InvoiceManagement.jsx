import InvoiceTable from "./InvoiceTable";
import Menu from "./Menu";

const InvoiceManagement = () => {
  return (
    <div className="invoice-management">
      <Menu />
      <InvoiceTable />
    </div>
  );
};

export default InvoiceManagement;
