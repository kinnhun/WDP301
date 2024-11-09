const express = require("express");
const InvoiceController = require("../controllers/invoice.controller");
const invoiceRouter = express.Router();

invoiceRouter.get("/", InvoiceController.getInvoices);
invoiceRouter.get("/types", InvoiceController.getInvoiceTypes);
invoiceRouter.post("/", InvoiceController.createInvoices);

module.exports = invoiceRouter;
