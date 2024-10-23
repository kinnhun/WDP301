const RequestService = require("../services/request.service"); // Mô hình cho yêu cầu bảo trì
const { successResponse, errorResponse } = require("../utils/response.js");

// Lấy tất cả yêu cầu bảo trì
const getAllRequests = async (req, res) => {
  try {
    const result = await RequestService.getAllRequests(); // Gọi đúng hàm getAllRequests từ model
    const requests = result.recordset; // Truy xuất dữ liệu từ kết quả truy vấn SQL
    return successResponse({
      res,
      message: "Lấy yêu cầu bảo trì thành công",
      data: requests,
    });
  } catch (error) {
    return errorResponse({
      res,
      status: 500,
      message: "Lấy yêu cầu bảo trì thất bại",
      errors: error.message,
    });
  }
};

// Tạo yêu cầu bảo trì mới
const createRequest = async (req, res) => {
  try {
    const { room_id, user_id, description, request_type } = req.body;
    // console.log(room_id, user_id, description, request_type);
    if (!room_id || !user_id || !description || !request_type) {
      return errorResponse({
        res,
        status: 400,
        message: "Missing required fields",
      });
    }
    const newRequest = await RequestService.createRequest(
      room_id,
      user_id,
      request_type,
      description
    );

    return successResponse({
      res,
      message: "Create request successfully",
      data: newRequest,
    });
  } catch (error) {
    return errorResponse({
      res,
      status: 500,
      message: "Tạo yêu cầu bảo trì thất bại",
      errors: error.message,
    });
  }
};

const getRequestByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const requests = await RequestService.getRequestByUserId(userId);
    return successResponse({
      res,
      message: "Lấy yêu cầu thành công",
      data: requests,
    });
  } catch (error) {
    return errorResponse({
      res,
      status: 500,
      message: "Lấy yêu cầu bảo trì thất bại",
      errors: error.message,
    });
  }
};

// Lấy yêu cầu bảo trì theo ID
const getRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await RequestService.getRequestById(id);

    return successResponse({
      res,
      message: "Lấy yêu cầu bảo trì thành công",
      data: request,
    });
  } catch (error) {
    return errorResponse({
      res,
      status: 500,
      message: "Lấy yêu cầu bảo trì thất bại",
      errors: error.message,
    });
  }
};

// Cập nhật yêu cầu bảo trì
const updateRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    await MaintenanceRequest.updateRequest(id, updates);

    return successResponse({
      res,
      message: "Cập nhật yêu cầu bảo trì thành công",
    });
  } catch (error) {
    return errorResponse({
      res,
      status: 500,
      message: "Cập nhật yêu cầu bảo trì thất bại",
      errors: error.message,
    });
  }
};

// Xóa yêu cầu bảo trì
const deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;
    await MaintenanceRequest.deleteRequest(id);

    return successResponse({
      res,
      message: "Xóa yêu cầu bảo trì thành công",
    });
  } catch (error) {
    return errorResponse({
      res,
      status: 500,
      message: "Xóa yêu cầu bảo trì thất bại",
      errors: error.message,
    });
  }
};

module.exports = {
  getAllRequests,
  createRequest,
  getRequestById,
  updateRequest,
  deleteRequest,
  getRequestByUserId,
};
