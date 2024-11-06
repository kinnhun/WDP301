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
      ,[Users].[created_at]
  FROM [dbo].[Users]
  LEFT JOIN [Roles]
  ON [Users].[role_id] = [Roles].[role_id]
    `;
  },
  updateUserRole: (userId, role) => {
    return sql.query`
UPDATE [dbo].[Users]
   SET
      [role_id] = (SELECT role_id FROM Roles WHERE role_name = ${role})
 WHERE [Users].[user_id] = ${userId}
    `;
  },
  importUsers: (user) => {
    return sql.query(`
        INSERT INTO [dbo].[Users]
        ([username], [password], [gender], [email], [status], [role_id], [created_at], [updated_at])
        VALUES  ('${user.username}',
         '${user.password}',
         ${user.gender},
         '${user.email}',
         ${user.status},
         ${user.role_id},
         SYSDATETIME(),
         SYSDATETIME());
    `);
  },
  createUser: (user) => {
    return sql.query`
    INSERT INTO [dbo].[Users]
           ([username]
           ,[password]
           ,[gender]
           ,[email]
           ,[status]
           ,[role_id]
           ,[created_at]
           ,[updated_at])
     VALUES
           (${user.username}
           ,${user.password}
           ,${user.gender}
           ,${user.email}
           ,${user.status}
           ,${user.role}
           ,SYSDATETIME()
           ,SYSDATETIME())
    `;
  },
  getNewestUser: () => {
    return sql.query`
  SELECT TOP 1 [Users].[user_id]
      ,[Users].[username]
      ,[Users].[gender]
      ,[Users].[email]
      ,[Users].[status]
	  ,[Roles].[role_name] as role
      ,[Users].[created_at]
  FROM [dbo].[Users]
  LEFT JOIN [Roles]
  ON [Users].[role_id] = [Roles].[role_id]
  ORDER BY [Users].[user_id] DESC
    `;
  },
  deleteUser: (userId) => {
    return sql.query`
    DELETE FROM [dbo].[OTP_Temp]
      WHERE [OTP_Temp].[user_id] = ${userId}
DELETE FROM [dbo].[Users]
      WHERE [Users].[user_id] = ${userId}
    `;
  },

  getUserFullInfoById: (userId) => {
    return sql.query`
 SELECT TOP 1 
      [Users].[user_id],
      [Users].[username],
      [Users].[gender],
      [Users].[email],
      [Users].[status],
      [Roles].[role_name] AS role,
      [Rooms].[room_number] AS room,
      [Rooms].[floor_number] AS floor,
      [Beds].[bed_number] AS bed,
      [Rooms].[dorm],
      [RoomCategories].[category_name] AS roomType,
      [Bookings].[semester],
      [Users].[created_at],
      [Bookings].[start_date],
      [Bookings].[end_date]
  FROM [dbo].[Users]
  LEFT JOIN [Bookings] ON [Users].[user_id] = [Bookings].[user_id]
  LEFT JOIN [Rooms] ON [Bookings].[room_id] = [Rooms].[room_id]
  LEFT JOIN [Beds] ON [Bookings].[bed_id] = [Beds].[bed_id]
  LEFT JOIN [Roles] ON [Users].[role_id] = [Roles].[role_id]
  LEFT JOIN [RoomCategories] ON [Rooms].[room_type_id] = [RoomCategories].[room_type_id]
  WHERE [Users].[user_id] = 5
  ORDER BY [Bookings].[booking_id] DESC;
      `;
  },
};
