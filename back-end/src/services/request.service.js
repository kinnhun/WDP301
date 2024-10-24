const Request = require("../models/request.js"); // Mô hình cho yêu cầu bảo trì

module.exports = {
  getAllRequests: async (req, res) => {
    try {
      const requests = await Request.getAllRequests();
      return requests.recordsets[0];
    } catch (error) {
      throw new Error();
    }
  },

  createRequest: async (roomId, userId, request_type, description) => {
    try {
      const request = await Request.createRequest(roomId, userId, request_type, description);
      if (request.rowsAffected[0] === 0) {
        const error = new Error("Create request failed");
        error.status = 500;
        throw error;
      }
      const newRequest = await Request.getNewestRequest();
      if (!newRequest.recordsets[0].length) {
        const error = new Error("Get request failed");
        error.status = 500;
        throw error;
      }

      return newRequest.recordsets[0];
    } catch (error) {
      throw error;
    }
  },
  getRequestByUserId: async (userId) => {
    try {
      const requests = await Request.getRequestByUserId(userId);
      return requests.recordsets[0];
    } catch (error) {
      throw error;
    }
  },
  getRequestTypes: async () => {
    try {
      const requestTypes = await Request.getRequestTypes();
      return requestTypes.recordsets[0];
    } catch (error) {
      throw error;
    }
  },

  getRequestById: async (id) => {
    try {
      const request = await Request.getRequestById(id);
      if (!request.recordsets[0].length) {
        const error = new Error("Request not found");
        error.status = 404;
        throw error;
      }
      return request.recordsets[0];
    } catch (error) {
      throw error;
    }
  },
};
