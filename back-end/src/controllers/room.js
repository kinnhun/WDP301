const Room = require("../models/room.js"); // Mô hình cho phòng
const { successResponse, errorResponse } = require("../utils/response.js");

// Lấy tất cả phòng
const getAllRooms = async (req, res) => {
  try {
    const result = await Room.getAllRooms();
    const rooms = result.recordset; // Lấy danh sách phòng

    console.log("Danh sách phòng:", rooms); // Kiểm tra dữ liệu ở đây

    return successResponse({
      res,
      message: "Lấy danh sách phòng thành công",
      data: rooms,
    });
  } catch (error) {
    return errorResponse({
      res,
      status: 500,
      message: "Lấy danh sách phòng thất bại",
      errors: error.message,
    });
  }
};

// Lấy thông tin phòng theo ID
const getRoomById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Room.getRoomById(id);
    const room = result;

    if (!room) {
      return errorResponse({
        res,
        status: 404,
        message: "Phòng không tồn tại",
      });
    }

    return successResponse({
      res,
      message: "Lấy thông tin phòng thành công",
      data: room,
    });
  } catch (error) {
    return errorResponse({
      res,
      status: 500,
      message: "Lấy thông tin phòng thất bại",
      errors: error.message,
    });
  }
};

// Tạo phòng mới
const createRoom = async (req, res) => {
  try {
    const { room_number, room_type_id, price, availability_status } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!room_number || !room_type_id || !price || !availability_status) {
      return res.status(400).json({
        success: false,
        message: "Thiếu thông tin cần thiết để tạo phòng",
      });
    }

    await Room.createRoom(room_number, room_type_id, price, availability_status);

    return successResponse({
      res,
      message: "Tạo phòng mới thành công",
    });
  } catch (error) {
    return errorResponse({
      res,
      status: 500,
      message: "Tạo phòng mới thất bại",
      errors: error.message,
    });
  }
};

// Cập nhật thông tin phòng
const updateRoom = async (req, res) => {
  try {
    const { id } = req.params; // Lấy roomId từ tham số URL
    const { room_number, room_type_id, price, availability_status } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!room_number || !room_type_id || !price || !availability_status) {
      return res.status(400).json({
        success: false,
        message: "Thiếu thông tin cần thiết để cập nhật phòng",
      });
    }

    // Cập nhật thông tin phòng vào cơ sở dữ liệu
    await Room.updateRoom(id, { room_number, room_type_id, price, availability_status });

    return res.status(200).json({
      success: true,
      message: "Cập nhật phòng thành công",
    });
  } catch (error) {
    console.error("Error updating room:", error);
    return res.status(500).json({
      success: false,
      message: "Cập nhật phòng thất bại",
      errors: error.message,
    });
  }
};

// Xóa phòng
const deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;
    await Room.deleteRoom(id);

    return successResponse({
      res,
      message: "Xóa phòng thành công",
    });
  } catch (error) {
    return errorResponse({
      res,
      status: 500,
      message: "Xóa phòng thất bại",
      errors: error.message,
    });
  }
};

// Lấy danh sách phòng khả dụng
const getAvailableRooms = async (req, res) => {
  try {
    const result = await Room.getAvailableRooms(); // Gọi phương thức từ mô hình
    const availableRooms = result.recordset; // Lấy danh sách phòng khả dụng

    return successResponse({
      res,
      message: "Lấy danh sách phòng khả dụng thành công",
      data: availableRooms,
    });
  } catch (error) {
    return errorResponse({
      res,
      status: 500,
      message: "Lấy danh sách phòng khả dụng thất bại",
      errors: error.message,
    });
  }
};

// getRoomCategory
const getRoomCategory = async (req, res) => {
  try {
    const result = await Room.getRoomCategory();
    const roomCategory = result.recordset;

    return successResponse({
      res,
      message: "Lấy danh mục phòng thành công",
      data: roomCategory,
    });
  } catch (error) {
    console.log(error);
    return errorResponse({
      res,
      status: 500,
      message: "Lấy danh mục phòng thất bại",
      errors: error.message,
    });
  }
};

const getAllFloor = async (req, res) => {
  try {
    const result = await Room.getAllFloor();
    const floors = result.recordset;

    return successResponse({
      res,
      message: "Lấy danh sách tầng phòng thành công",
      data: floors,
    });
  } catch (error) {
    return errorResponse({
      res,
      status: 500,
      message: "Lấy số tầng phòng thất bại",
      errors: error.message,
    });
  }
};

const getBedAvailableFromRoom = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Room ID:", id);

    const result = await Room.getBedAvailableFromRoom(id);
    const beds = result.recordset;

    console.log("Available beds:", beds);

    if (beds.length === 0) {
      return errorResponse({
        res,
        status: 404,
        message: "Không có giường nào có sẵn trong phòng này",
      });
    }

    return successResponse({
      res,
      message: "Lấy danh sách giường có sẵn thành công",
      data: beds,
    });
  } catch (error) {
    return errorResponse({
      res,
      status: 500,
      message: "Lấy danh sách giường có sẵn thất bại",
      errors: error.message,
    });
  }
};

const getAllAvailableRooms = async (req, res, next) => {
  try {
    const result = await Room.getAllAvailableRooms();
    const availableRooms = result.recordset;

    return successResponse({
      res,
      message: "Lấy danh sách phòng khả dụng thành công",
      data: availableRooms,
    });
  } catch (error) {
    return errorResponse({
      res,
      status: 500,
      message: "Lấy danh sách phòng khả dụng thất bại",
      errors: error.message,
    });
  }
};

// Lấy danh sách phòng theo dorm, room type, và floor
const getRoomsByDormRoomTypeFloor = async (req, res) => {
  try {
    // Lấy tham số từ params
    const { roomTypeId, floorNumber, dormName } = req.params;

    // Kiểm tra xem các tham số có hợp lệ không
    if (!roomTypeId || !floorNumber || !dormName) {
      return errorResponse({
        res,
        status: 400,
        message: "Thiếu thông tin cần thiết để tìm kiếm phòng",
      });
    }

    // Thực hiện truy vấn
    const result = await Room.getRoomsByDormRoomTypeFloor(roomTypeId, floorNumber, dormName);
    const rooms = result.recordset;

    // Kiểm tra xem có phòng nào không
    if (rooms.length === 0) {
      return errorResponse({
        res,
        status: 404,
        message: "Không tìm thấy phòng nào phù hợp",
      });
    }

    return successResponse({
      res,
      message: "Lấy danh sách phòng thành công",
      data: rooms,
    });
  } catch (error) {
    return errorResponse({
      res,
      status: 500,
      message: "Lấy danh sách phòng thất bại",
      errors: error.message,
    });
  }
};

const getDorm = async (req, res) => {
  try {
    const result = await Room.getDorm();
    const dorms = result.recordset;

    return successResponse({
      res,
      message: "Lấy danh sách phòng thành công",
      data: dorms,
    });
  } catch (error) {
    return errorResponse({
      res,
      status: 500,
      message: "Lấy danh sách phòng thất bại",
      errors: error.message,
    });
  }
};



// Thay đổi trạng thái của phòng
const updateRoomStatus = async (req, res) => {
  const { id, availability_status } = req.query; // Lấy room ID và trạng thái từ query params

  // Kiểm tra id và availability_status có được cung cấp hay không
  if (!id || isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: "Vui lòng cung cấp ID hợp lệ cho phòng.",
    });
  }

  if (!availability_status) {
    return res.status(400).json({
      success: false,
      message: "Vui lòng cung cấp trạng thái mới cho phòng.",
    });
  }

  try {
    // Gọi phương thức từ model để cập nhật trạng thái phòng
    const result = await Room.updateRoomStatus(parseInt(id, 10), availability_status);

    if (result.rowsAffected[0] === 0) {
      // Nếu không có dòng nào bị ảnh hưởng, tức là không tìm thấy phòng với ID này
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy phòng với ID này.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Cập nhật trạng thái phòng thành công!",
    });
  } catch (error) {
    console.error("Lỗi khi cập nhật trạng thái phòng:", error);
    return res.status(500).json({
      success: false,
      message: "Có lỗi xảy ra khi cập nhật trạng thái phòng.",
      errors: error.message,
    });
  }
};



module.exports = {
  getAllRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
  getAvailableRooms,
  getRoomCategory,
  getAllFloor,
  getBedAvailableFromRoom,
  getAllAvailableRooms,
  getRoomsByDormRoomTypeFloor,
  getDorm,
  updateRoomStatus
};
