const { getInvoiceTypes } = require("../models/invoice");
const InvoiceService = require("../services/invoice.service");
const { errorResponse, successResponse } = require("../utils/response");

module.exports = {
  getInvoices: async (req, res) => {
    try {
      const invoices = await InvoiceService.getInvoices();
      return successResponse({
        res,
        message: "Invoices retrieved successfully",
        data: invoices,
      });
    } catch (error) {
      return errorResponse({
        res,
        status: error.status || 500,
        message: "Get Invoices, failed",
        errors: error.message,
      });
    }
  },
  getInvoiceTypes: async (req, res) => {
    try {
      const invoiceTypes = await InvoiceService.getInvoiceTypes();
      return successResponse({
        res,
        message: "Invoice Types retrieved successfully",
        data: invoiceTypes,
      });
    } catch (error) {
      return errorResponse({
        res,
        status: error.status || 500,
        message: "Get Invoice Types failed",
        errors: error,
      });
    }
  },
  createInvoices: async (req, res) => {
    try {
      const { invoiceType, amount, expiredDate } = req.body;
      if (!invoiceType || !amount || !expiredDate) {
        const error = new Error("Type, amount and expired_date are required");
        error.status = 400;
        throw error;
      }
      const msg = await InvoiceService.createInvoice(req.body);
      return successResponse({
        res,
        message: msg,
      });
    } catch (error) {
      return errorResponse({
        res,
        status: error.status || 500,
        message: "Create Invoice failed",
        errors: error.message,
      });
    }
  },
  getInvoiceByEmail: async (req, res) => {
    try {
      const { email } = req.params;
      if (!email) {
        const error = new Error("Email is required");
        error.status = 404;
        throw error;
      }
      const invoices = await InvoiceService.getInvoiceByEmail(email);
      return successResponse({
        res,
        message: "Get Invoices successfully",
        data: invoices,
      });
    } catch (error) {
      return errorResponse({
        res,
        status: error.status || 500,
        message: "Get Invoice By Email Failed",
        errors: error.message,
      });
    }
  },
  updateInvoiceStatus: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        const error = new Error("Id is required");
        error.status = 404;
        throw error;
      }
      const msg = await InvoiceService.updateInvoiceStatus(id);
      return successResponse({
        res,
        message: msg,
      });
    } catch (error) {
      return errorResponse({
        res,
        status: error.status || 500,
        message: "Update Invoice Status Failed",
        errors: error.message,
      });
    }
  },
};
