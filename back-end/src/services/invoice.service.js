const Invoice = require("../models/invoice");
const Room = require("../models/room");
const User = require("../models/user");

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
      if (invoice.room) {
        const users = await Room.getUserIdByRoomNumber(invoice.room);
        if (users.recordset.length === 0) {
          const error = new Error("Not found user in this room");
          error.status = 404;
          throw error;
        }
        for (let i = 0; i < users.recordset.length; i++) {
          await Invoice.createInvoice({
            ...invoice,
            room_id: users.recordset[i].room_id,
            user_id: users.recordset[i].user_id,
            amount: invoice.amount / users.recordset.length,
          });
        }
      } else if (invoice.email) {
        const user = await User.getUserByEmail(invoice.email);
        if (user.recordset.length === 0) {
          const error = new Error("User not found");
          error.status = 404;
          throw error;
        }
        let roomId = await Room.getRoomIdByEmail(invoice.email);
        if (roomId.recordset.length === 0) {
          const error = new Error("Room not found");
          error.status = 404;
          throw error;
        }
        await Invoice.createInvoice({
          ...invoice,
          user_id: user.recordset[0].user_id,
          room_id: roomId.recordset[0].room_id,
        });
      }
      return "Invoice created successfully";
    } catch (error) {
      throw error;
    }
  },
};
