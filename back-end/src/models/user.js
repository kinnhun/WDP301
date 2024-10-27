const sql = require("mssql");

module.exports = {
  getUserByEmail: async (email) => {
    return sql.query`
    SELECT [user_id]
      ,[username]
      ,[password]
      ,[gender]
      ,[email]
      ,[status]
      ,[role_id]
    FROM [dbo].[Users]
    WHERE email LIKE ${email}
    `;
  },
  createUserOtp: (userId, otp) => {
    return sql.query`INSERT INTO [dbo].[OTP_Temp]
           ([user_id]
           ,[otp_code]
           ,[created_at]
           ,[expired_at])
     VALUES
           (${userId}
           ,${otp}
           ,SYSDATETIME()
           ,DATEADD(MINUTE, 10, SYSDATETIME()));`;
  },

  updateUserOTP: (userId, otp) => {
    return sql.query`UPDATE [dbo].[OTP_Temp]
   SET [otp_code] = ${otp}
      ,[expired_at] = DATEADD(MINUTE, 10, SYSDATETIME())
   WHERE [OTP_Temp].[user_id] = ${userId}`;
  },

  updateUserStatus: (email) => {
    return sql.query`
    UPDATE [dbo].[Users]
    SET [status] = 1
    WHERE [Users].[email] = ${email}`;
  },

  checkAccountVerified: (userId) => {
    return sql.query`
    SELECT [Users].[user_id]
      ,[Users].[username]
      ,[Users].[password]
      ,[Users].[gender]
      ,[Users].[email]
      ,[Users].[status]
      ,[Users].[role_id]
      ,[OTP_Temp].[otp_code] as otp
    FROM [dbo].[Users]
    JOIN [dbo].[OTP_Temp]
    ON [Users].[user_id] = [OTP_Temp].[user_id]
    WHERE [Users].[user_id] = ${userId}
    `;
  },
  getUsers: () => {
    return sql.query`
  SELECT [Users].[user_id]
      ,[Users].[username]
      ,[Users].[gender]
      ,[Users].[email]
      ,[Users].[status]
	  ,[Roles].[role_name] as role
      ,[Rooms].[room_number] as room
	  ,[Rooms].[floor_number] as floor
	  ,[Beds].[bed_number] as bed
	  ,[Rooms].[dorm],
	  [RoomCategories].[category_name] as roomType
	  ,[Bookings].[semester]
      ,[Users].[created_at]
	  ,[Bookings].[start_date]
	  ,[Bookings].[end_date]
  FROM [dbo].[Users]
  LEFT JOIN [Bookings]
  ON [Users].[user_id] = [Bookings].[user_id]
  LEFT JOIN [Rooms]
  ON [Bookings].[room_id] = [Rooms].[room_id]
  LEFT JOIN [Beds]
  ON [Bookings].[bed_id] = [Beds].[bed_id]
  LEFT JOIN [Roles]
  ON [Users].[role_id] = [Roles].[role_id]
  LEFT JOIN [RoomCategories]
  ON [Rooms].[room_type_id] = [RoomCategories].[room_type_id]
    `;
  },
};
