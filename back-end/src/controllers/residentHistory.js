const residentHistory = require('../models/residentHistory');



const getResident = async (req, res) => {
  const { user_id: userId } = req.params; // Lấy user_id từ request params

  try {
    const result = await residentHistory.getResidentHistory(userId);
    const bookingDetails = result.recordset; // Lấy danh sách booking từ recordset

    if (bookingDetails.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy thông tin booking cho user_id này.' });
    }

    res.status(200).json({ 
      message: 'Lấy thông tin booking thành công!', 
      data: bookingDetails 
    });
  } catch (err) {
    console.error('Lỗi khi lấy thông tin booking:', err);
    res.status(500).json({ message: 'Có lỗi xảy ra khi lấy thông tin booking.' });
  }
};


const getUserBed = async (req, res) => {
  try {
    const userId = req.params.userId; // Extract userId from request parameters
    const result = await residentHistory.getUserBed(userId);
    res.status(200).json(result);
  } catch (err) {
    console.error('Lỗi khi lấy thông tin username và bed_number:', err);
    res.status(500).json({ message: 'Có lỗi xảy ra khi lấy thông tin username và bed_number.' });
  }
};



// Hàm mới để lấy danh sách bạn cùng phòng trong cùng kỳ
const getRoommatesByRoomAndSemester = async (req, res) => {
  const { roomId, semester } = req.query;

  if (!roomId || !semester) {
    return res.status(400).json({ message: 'Vui lòng cung cấp roomId và semester.' });
  }

  try {
    const roommates = await residentHistory.getRoommatesByRoomAndSemester(roomId, semester);

    if (roommates.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy bạn cùng phòng cho phòng và kỳ này.' });
    }

    res.status(200).json({
      message: 'Lấy danh sách bạn cùng phòng thành công!',
      data: roommates
    });
  } catch (err) {
    console.error('Lỗi khi lấy danh sách bạn cùng phòng:', err);
    res.status(500).json({ message: 'Có lỗi xảy ra khi lấy danh sách bạn cùng phòng.' });
  }
};



module.exports ={getResident,getUserBed, getRoommatesByRoomAndSemester} ;


