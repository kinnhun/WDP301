const sql = require("mssql");

module.exports = {
  getInvoices: () => {
    return sql.query`
        SELECT [Invoice].[id]
      ,[Invoice_Type].[name] as type
      ,[Invoice].[description]
      ,[Invoice].[amount]
      ,[Invoice].[status]
      ,[Invoice].[created_at]
      ,[Invoice].[payment_at]
      ,[Invoice].[expired_date]
      ,[Invoice].[ew_date]
      ,[Invoice].[electricity]
      ,[Invoice].[water]
      ,[Users].[email]
      ,[Rooms].[room_number]
  FROM [dbo].[Invoice]
  LEFT JOIN [Invoice_Type]
  ON [Invoice].[type_id] = [Invoice_Type].[id]
  LEFT JOIN [Users]
  ON [Invoice].[user_id] = [Users].[user_id]
  LEFT JOIN Rooms
  ON [Invoice].[room_id] = [Rooms].[room_id]
  ORDER BY [Invoice].[id] DESC
        `;
  },
  getInvoiceTypes: () => {
    return sql.query`
        SELECT * FROM [dbo].[Invoice_Type]
        `;
  },
  createInvoice: ({
    invoiceType,
    description,
    amount,
    status = 0,
    payment_at = null,
    expiredDate = null,
    ew_date = null,
    electricity = null,
    water = null,
    user_id,
    room_id = null,
  }) => {
    return sql.query`
        INSERT INTO [dbo].[Invoice]
        ([type_id]
        ,[description]
        ,[amount]
        ,[status]
        ,[created_at]
        ,[payment_at]
        ,[expired_date]
        ,[ew_date]
        ,[electricity]
        ,[water]
        ,[user_id]
        ,[room_id])
        VALUES
        (${invoiceType}
        ,${description}
        ,${amount}
        ,${status}
        ,SYSDATETIME()
        ,${payment_at}
        ,${expiredDate}
        ,${ew_date}
        ,${electricity}
        ,${water}
        ,${user_id}
        ,${room_id})
        `;
  },
  getInvoiceByEmail: (email) => {
    return sql.query`
         SELECT [Invoice].[id]
      ,[Invoice_Type].[name] as type
      ,[Invoice].[description]
      ,[Invoice].[amount]
      ,[Invoice].[status]
      ,[Invoice].[created_at]
      ,[Invoice].[payment_at]
      ,[Invoice].[expired_date]
      ,[Invoice].[ew_date]
      ,[Invoice].[electricity]
      ,[Invoice].[water]
      ,[Users].[email]
      ,[Rooms].[room_number]
  FROM [dbo].[Invoice]
  LEFT JOIN [Invoice_Type]
  ON [Invoice].[type_id] = [Invoice_Type].[id]
  LEFT JOIN [Users]
  ON [Invoice].[user_id] = [Users].[user_id]
  LEFT JOIN Rooms
  ON [Invoice].[room_id] = [Rooms].[room_id]
  WHERE email = ${email}
  ORDER BY [Invoice].[id] DESC
    `;
  },
  updateInvoiceStatus: (id) => {
    return sql.query`
        UPDATE [dbo].[Invoice]
        SET [status] = 1
        ,[payment_at] = SYSDATETIME()
        WHERE id = ${id}
        `;
  },
};
