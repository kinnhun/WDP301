const Invoice = require("../models/invoice");
const Semester = require("../models/semester");
const Room = require("../models/room");

module.exports = {
  getInvoices: async () => {
    try {
      const invoices = await Invoice.getInvoices();
      return invoices.recordset;
    } catch (error) {
      throw error;
    }
  },
  getInvoiceTypes: async () => {
    try {
      const invoiceTypes = await Invoice.getInvoiceTypes();
      return invoiceTypes.recordset;
    } catch (error) {
      throw error;
    }
  },
  createInvoice: async (invoice) => {
    try {
      const newInvoice = await Invoice.createInvoice(invoice);
      if (invoice.invoiceType === 1) {
        const semester = Semester.getSemesterByStatus("Active");
      }
      if (newInvoice.rowsAffected[0] === 0) {
        const error = new Error("Invoice created failed");
        error.status = 400;
        throw error;
      }
      return "Invoice created successfully";
    } catch (error) {
      throw error;
    }
  },
};
