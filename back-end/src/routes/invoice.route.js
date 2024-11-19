const express = require("express");
const InvoiceController = require("../controllers/invoice.controller");
const invoiceRouter = express.Router();

invoiceRouter.get("/", InvoiceController.getInvoices);
invoiceRouter.get("/types", InvoiceController.getInvoiceTypes);
invoiceRouter.get("/:email", InvoiceController.getInvoiceByEmail);
invoiceRouter.post("/", InvoiceController.createInvoices);
invoiceRouter.patch("/:id", InvoiceController.updateInvoiceStatus);

module.exports = invoiceRouter;
