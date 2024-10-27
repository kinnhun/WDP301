USE [wdp3]
GO
/****** Object:  Table [dbo].[Beds]    Script Date: 10/23/2024 11:48:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Beds](
	[bed_id] [int] IDENTITY(1,1) NOT NULL,
	[room_id] [int] NOT NULL,
	[bed_number] [nvarchar](10) NOT NULL,
	[availability_status] [nvarchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[bed_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Bookings]    Script Date: 10/23/2024 11:48:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Bookings](
	[booking_id] [int] IDENTITY(1,1) NOT NULL,
	[user_id] [int] NOT NULL,
	[room_id] [int] NOT NULL,
	[start_date] [datetime] NOT NULL,
	[end_date] [datetime] NOT NULL,
	[total_amount] [decimal](10, 2) NOT NULL,
	[payment_status] [nvarchar](50) NOT NULL,
	[booking_status] [nvarchar](50) NOT NULL,
	[created_at] [datetime] NULL,
	[updated_at] [datetime] NULL,
	[bed_id] [int] NULL,
	[semester] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[booking_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Feedback]    Script Date: 10/23/2024 11:48:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Feedback](
	[feedback_id] [int] IDENTITY(1,1) NOT NULL,
	[booking_id] [int] NOT NULL,
	[content] [nvarchar](max) NOT NULL,
	[created_at] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[feedback_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OTP_Temp]    Script Date: 10/23/2024 11:48:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OTP_Temp](
	[otp_id] [int] IDENTITY(1,1) NOT NULL,
	[user_id] [int] NOT NULL,
	[otp_code] [varchar](10) NOT NULL,
	[created_at] [datetime] NULL,
	[expired_at] [datetime] NULL,
 CONSTRAINT [PK__OTP_Temp__AEE35435B0B0765D] PRIMARY KEY CLUSTERED 
(
	[otp_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Posts]    Script Date: 10/23/2024 11:48:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Posts](
	[post_id] [int] IDENTITY(1,1) NOT NULL,
	[user_id] [int] NOT NULL,
	[title] [nvarchar](100) NOT NULL,
	[content] [nvarchar](max) NOT NULL,
	[post_type] [nvarchar](50) NOT NULL,
	[target_user_id] [int] NULL,
	[created_at] [datetime] NULL,
	[updated_at] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[post_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Reports]    Script Date: 10/23/2024 11:48:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Reports](
	[report_id] [int] IDENTITY(1,1) NOT NULL,
	[user_id] [int] NOT NULL,
	[room_id] [int] NOT NULL,
	[content] [nvarchar](max) NOT NULL,
	[report_status] [nvarchar](50) NOT NULL,
	[created_at] [datetime] NULL,
	[updated_at] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[report_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[request_type]    Script Date: 10/23/2024 11:48:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[request_type](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[type_name] [nvarchar](100) NOT NULL,
	[created_at] [datetime] NULL,
	[updated_at] [datetime] NULL,
	[description] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Requests]    Script Date: 10/23/2024 11:48:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Requests](
	[request_id] [int] IDENTITY(1,1) NOT NULL,
	[room_id] [int] NOT NULL,
	[user_id] [int] NOT NULL,
	[description] [nvarchar](max) NOT NULL,
	[status] [nvarchar](50) NOT NULL,
	[created_at] [datetime] NULL,
	[updated_at] [datetime] NULL,
	[reply] [nvarchar](max) NULL,
	[semester] [nvarchar](max) NULL,
	[request_type] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[request_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Roles]    Script Date: 10/23/2024 11:48:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Roles](
	[role_id] [int] IDENTITY(1,1) NOT NULL,
	[role_name] [nvarchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[role_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RoomCategories]    Script Date: 10/23/2024 11:48:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RoomCategories](
	[room_type_id] [int] IDENTITY(1,1) NOT NULL,
	[category_name] [nvarchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[room_type_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Rooms]    Script Date: 10/23/2024 11:48:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Rooms](
	[room_id] [int] IDENTITY(1,1) NOT NULL,
	[room_number] [nvarchar](10) NOT NULL,
	[room_type_id] [int] NOT NULL,
	[price] [decimal](10, 2) NOT NULL,
	[availability_status] [nvarchar](50) NOT NULL,
	[created_at] [datetime] NULL,
	[updated_at] [datetime] NULL,
	[floor_number] [int] NULL,
	[dorm] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[room_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 10/23/2024 11:48:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[user_id] [int] IDENTITY(1,1) NOT NULL,
	[username] [nvarchar](50) NOT NULL,
	[password] [nvarchar](255) NOT NULL,
	[gender] [bit] NOT NULL,
	[email] [nvarchar](100) NOT NULL,
	[status] [bit] NOT NULL,
	[role_id] [int] NOT NULL,
	[created_at] [datetime] NULL,
	[updated_at] [datetime] NULL,
 CONSTRAINT [PK__Users__B9BE370F15E58299] PRIMARY KEY CLUSTERED 
(
	[user_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Beds] ON 

INSERT [dbo].[Beds] ([bed_id], [room_id], [bed_number], [availability_status]) VALUES (1, 3, N'1', N'Available')
INSERT [dbo].[Beds] ([bed_id], [room_id], [bed_number], [availability_status]) VALUES (2, 3, N'2', N'Available')
INSERT [dbo].[Beds] ([bed_id], [room_id], [bed_number], [availability_status]) VALUES (3, 3, N'1', N'Occupied')
INSERT [dbo].[Beds] ([bed_id], [room_id], [bed_number], [availability_status]) VALUES (4, 3, N'2', N'Available')
INSERT [dbo].[Beds] ([bed_id], [room_id], [bed_number], [availability_status]) VALUES (5, 4, N'1', N'Occupied')
INSERT [dbo].[Beds] ([bed_id], [room_id], [bed_number], [availability_status]) VALUES (6, 4, N'2', N'Occupied')
INSERT [dbo].[Beds] ([bed_id], [room_id], [bed_number], [availability_status]) VALUES (7, 4, N'1', N'Available')
INSERT [dbo].[Beds] ([bed_id], [room_id], [bed_number], [availability_status]) VALUES (8, 4, N'2', N'Available')
INSERT [dbo].[Beds] ([bed_id], [room_id], [bed_number], [availability_status]) VALUES (9, 4, N'1', N'Occupied')
INSERT [dbo].[Beds] ([bed_id], [room_id], [bed_number], [availability_status]) VALUES (10, 4, N'2', N'Available')
SET IDENTITY_INSERT [dbo].[Beds] OFF
GO
SET IDENTITY_INSERT [dbo].[Bookings] ON 

INSERT [dbo].[Bookings] ([booking_id], [user_id], [room_id], [start_date], [end_date], [total_amount], [payment_status], [booking_status], [created_at], [updated_at], [bed_id], [semester]) VALUES (5, 4, 11, CAST(N'2024-10-01T00:00:00.000' AS DateTime), CAST(N'2024-10-05T00:00:00.000' AS DateTime), CAST(500000.00 AS Decimal(10, 2)), N'Completed', N'Confirmed', CAST(N'2024-10-23T08:02:00.367' AS DateTime), CAST(N'2024-10-23T08:02:00.367' AS DateTime), 1, NULL)
INSERT [dbo].[Bookings] ([booking_id], [user_id], [room_id], [start_date], [end_date], [total_amount], [payment_status], [booking_status], [created_at], [updated_at], [bed_id], [semester]) VALUES (6, 4, 2, CAST(N'2024-10-02T00:00:00.000' AS DateTime), CAST(N'2024-10-06T00:00:00.000' AS DateTime), CAST(600000.00 AS Decimal(10, 2)), N'Pending', N'Pending', CAST(N'2024-10-23T08:02:00.367' AS DateTime), CAST(N'2024-10-23T08:02:00.367' AS DateTime), 1, NULL)
INSERT [dbo].[Bookings] ([booking_id], [user_id], [room_id], [start_date], [end_date], [total_amount], [payment_status], [booking_status], [created_at], [updated_at], [bed_id], [semester]) VALUES (7, 4, 3, CAST(N'2024-10-03T00:00:00.000' AS DateTime), CAST(N'2024-10-07T00:00:00.000' AS DateTime), CAST(550000.00 AS Decimal(10, 2)), N'Failed', N'Cancelled', CAST(N'2024-10-23T08:02:00.367' AS DateTime), CAST(N'2024-10-23T08:02:00.367' AS DateTime), 2, NULL)
INSERT [dbo].[Bookings] ([booking_id], [user_id], [room_id], [start_date], [end_date], [total_amount], [payment_status], [booking_status], [created_at], [updated_at], [bed_id], [semester]) VALUES (8, 4, 4, CAST(N'2024-10-04T00:00:00.000' AS DateTime), CAST(N'2024-10-08T00:00:00.000' AS DateTime), CAST(700000.00 AS Decimal(10, 2)), N'Completed', N'Confirmed', CAST(N'2024-10-23T08:02:00.367' AS DateTime), CAST(N'2024-10-23T08:02:00.367' AS DateTime), 2, NULL)
INSERT [dbo].[Bookings] ([booking_id], [user_id], [room_id], [start_date], [end_date], [total_amount], [payment_status], [booking_status], [created_at], [updated_at], [bed_id], [semester]) VALUES (9, 4, 5, CAST(N'2024-10-05T00:00:00.000' AS DateTime), CAST(N'2024-10-09T00:00:00.000' AS DateTime), CAST(450000.00 AS Decimal(10, 2)), N'Pending', N'Pending', CAST(N'2024-10-23T08:02:00.367' AS DateTime), CAST(N'2024-10-23T08:02:00.367' AS DateTime), 3, NULL)
INSERT [dbo].[Bookings] ([booking_id], [user_id], [room_id], [start_date], [end_date], [total_amount], [payment_status], [booking_status], [created_at], [updated_at], [bed_id], [semester]) VALUES (10, 4, 6, CAST(N'2024-10-06T00:00:00.000' AS DateTime), CAST(N'2024-10-10T00:00:00.000' AS DateTime), CAST(800000.00 AS Decimal(10, 2)), N'Completed', N'Confirmed', CAST(N'2024-10-23T08:02:00.367' AS DateTime), CAST(N'2024-10-23T08:02:00.367' AS DateTime), 3, NULL)
INSERT [dbo].[Bookings] ([booking_id], [user_id], [room_id], [start_date], [end_date], [total_amount], [payment_status], [booking_status], [created_at], [updated_at], [bed_id], [semester]) VALUES (11, 4, 7, CAST(N'2024-10-07T00:00:00.000' AS DateTime), CAST(N'2024-10-11T00:00:00.000' AS DateTime), CAST(600000.00 AS Decimal(10, 2)), N'Failed', N'Cancelled', CAST(N'2024-10-23T08:02:00.367' AS DateTime), CAST(N'2024-10-23T08:02:00.367' AS DateTime), 4, NULL)
INSERT [dbo].[Bookings] ([booking_id], [user_id], [room_id], [start_date], [end_date], [total_amount], [payment_status], [booking_status], [created_at], [updated_at], [bed_id], [semester]) VALUES (12, 4, 8, CAST(N'2024-10-08T00:00:00.000' AS DateTime), CAST(N'2024-10-12T00:00:00.000' AS DateTime), CAST(750000.00 AS Decimal(10, 2)), N'Pending', N'Pending', CAST(N'2024-10-23T08:02:00.367' AS DateTime), CAST(N'2024-10-23T08:02:00.367' AS DateTime), 4, NULL)
INSERT [dbo].[Bookings] ([booking_id], [user_id], [room_id], [start_date], [end_date], [total_amount], [payment_status], [booking_status], [created_at], [updated_at], [bed_id], [semester]) VALUES (13, 4, 9, CAST(N'2024-10-09T00:00:00.000' AS DateTime), CAST(N'2024-10-13T00:00:00.000' AS DateTime), CAST(500000.00 AS Decimal(10, 2)), N'Completed', N'Confirmed', CAST(N'2024-10-23T08:02:00.367' AS DateTime), CAST(N'2024-10-23T08:02:00.367' AS DateTime), 5, NULL)
INSERT [dbo].[Bookings] ([booking_id], [user_id], [room_id], [start_date], [end_date], [total_amount], [payment_status], [booking_status], [created_at], [updated_at], [bed_id], [semester]) VALUES (14, 4, 10, CAST(N'2024-10-10T00:00:00.000' AS DateTime), CAST(N'2024-10-14T00:00:00.000' AS DateTime), CAST(650000.00 AS Decimal(10, 2)), N'Pending', N'Pending', CAST(N'2024-10-23T08:02:00.367' AS DateTime), CAST(N'2024-10-23T08:02:00.367' AS DateTime), 5, NULL)
INSERT [dbo].[Bookings] ([booking_id], [user_id], [room_id], [start_date], [end_date], [total_amount], [payment_status], [booking_status], [created_at], [updated_at], [bed_id], [semester]) VALUES (15, 4, 5, CAST(N'2024-10-23T00:00:00.000' AS DateTime), CAST(N'2024-10-30T00:00:00.000' AS DateTime), CAST(500000.00 AS Decimal(10, 2)), N'Pending', N'Pending', CAST(N'2024-10-23T09:13:27.053' AS DateTime), CAST(N'2024-10-23T09:13:27.053' AS DateTime), 3, NULL)
SET IDENTITY_INSERT [dbo].[Bookings] OFF
GO
SET IDENTITY_INSERT [dbo].[Posts] ON 

INSERT [dbo].[Posts] ([post_id], [user_id], [title], [content], [post_type], [target_user_id], [created_at], [updated_at]) VALUES (12, 3, N'Post Title 1', N'This is the content of post 1', N'Notification', 3, CAST(N'2024-10-21T10:00:00.000' AS DateTime), CAST(N'2024-10-21T10:00:00.000' AS DateTime))
INSERT [dbo].[Posts] ([post_id], [user_id], [title], [content], [post_type], [target_user_id], [created_at], [updated_at]) VALUES (13, 3, N'Post Title 2', N'This is the content of post 2', N'Notification', 3, CAST(N'2024-10-21T10:05:00.000' AS DateTime), CAST(N'2024-10-21T10:05:00.000' AS DateTime))
INSERT [dbo].[Posts] ([post_id], [user_id], [title], [content], [post_type], [target_user_id], [created_at], [updated_at]) VALUES (14, 3, N'Post Title 3', N'This is the content of post 3', N'Notification', 3, CAST(N'2024-10-21T10:10:00.000' AS DateTime), CAST(N'2024-10-21T10:10:00.000' AS DateTime))
INSERT [dbo].[Posts] ([post_id], [user_id], [title], [content], [post_type], [target_user_id], [created_at], [updated_at]) VALUES (15, 3, N'Post Title 4', N'This is the content of post 4', N'Notification', 3, CAST(N'2024-10-21T10:15:00.000' AS DateTime), CAST(N'2024-10-21T10:15:00.000' AS DateTime))
INSERT [dbo].[Posts] ([post_id], [user_id], [title], [content], [post_type], [target_user_id], [created_at], [updated_at]) VALUES (16, 3, N'Post Title 5', N'This is the content of post 5', N'Notification', 3, CAST(N'2024-10-21T10:20:00.000' AS DateTime), CAST(N'2024-10-21T10:20:00.000' AS DateTime))
INSERT [dbo].[Posts] ([post_id], [user_id], [title], [content], [post_type], [target_user_id], [created_at], [updated_at]) VALUES (17, 3, N'Post Title 6', N'This is the content of post 6', N'Notification', 3, CAST(N'2024-10-21T10:25:00.000' AS DateTime), CAST(N'2024-10-21T10:25:00.000' AS DateTime))
INSERT [dbo].[Posts] ([post_id], [user_id], [title], [content], [post_type], [target_user_id], [created_at], [updated_at]) VALUES (18, 3, N'Post Title 7', N'This is the content of post 7', N'Notification', 3, CAST(N'2024-10-21T10:30:00.000' AS DateTime), CAST(N'2024-10-21T10:30:00.000' AS DateTime))
INSERT [dbo].[Posts] ([post_id], [user_id], [title], [content], [post_type], [target_user_id], [created_at], [updated_at]) VALUES (19, 3, N'Post Title 8', N'This is the content of post 8', N'Notification', 3, CAST(N'2024-10-21T10:35:00.000' AS DateTime), CAST(N'2024-10-21T10:35:00.000' AS DateTime))
INSERT [dbo].[Posts] ([post_id], [user_id], [title], [content], [post_type], [target_user_id], [created_at], [updated_at]) VALUES (20, 3, N'Post Title 9', N'This is the content of post 9', N'Notification', 3, CAST(N'2024-10-21T10:40:00.000' AS DateTime), CAST(N'2024-10-21T10:40:00.000' AS DateTime))
INSERT [dbo].[Posts] ([post_id], [user_id], [title], [content], [post_type], [target_user_id], [created_at], [updated_at]) VALUES (21, 3, N'Post Title 10', N'This is the content of post 10', N'Notification', 3, CAST(N'2024-10-21T10:45:00.000' AS DateTime), CAST(N'2024-10-21T10:45:00.000' AS DateTime))
SET IDENTITY_INSERT [dbo].[Posts] OFF
GO
SET IDENTITY_INSERT [dbo].[request_type] ON 

INSERT [dbo].[request_type] ([id], [type_name], [created_at], [updated_at], [description]) VALUES (1, N'Maintenance', CAST(N'2024-10-20T23:34:25.600' AS DateTime), CAST(N'2024-10-20T23:34:25.600' AS DateTime), N'Yêu cầu bảo trì')
INSERT [dbo].[request_type] ([id], [type_name], [created_at], [updated_at], [description]) VALUES (2, N'Repair', CAST(N'2024-10-20T23:34:25.600' AS DateTime), CAST(N'2024-10-20T23:34:25.600' AS DateTime), N'Yêu cầu bảo trì')
INSERT [dbo].[request_type] ([id], [type_name], [created_at], [updated_at], [description]) VALUES (3, N'Installation', CAST(N'2024-10-20T23:34:25.600' AS DateTime), CAST(N'2024-10-20T23:34:25.600' AS DateTime), N'Yêu cầu bảo trì')
SET IDENTITY_INSERT [dbo].[request_type] OFF
GO
SET IDENTITY_INSERT [dbo].[Requests] ON 

INSERT [dbo].[Requests] ([request_id], [room_id], [user_id], [description], [status], [created_at], [updated_at], [reply], [semester], [request_type]) VALUES (4, 11, 3, N'Leak in the bathroom', N'Pending', CAST(N'2024-10-23T10:00:00.000' AS DateTime), CAST(N'2024-10-23T10:00:00.000' AS DateTime), NULL, N'Fall 2024', 1)
INSERT [dbo].[Requests] ([request_id], [room_id], [user_id], [description], [status], [created_at], [updated_at], [reply], [semester], [request_type]) VALUES (5, 2, 3, N'Broken window', N'Pending', CAST(N'2024-10-23T10:05:00.000' AS DateTime), CAST(N'2024-10-23T10:05:00.000' AS DateTime), NULL, N'Fall 2024', 1)
INSERT [dbo].[Requests] ([request_id], [room_id], [user_id], [description], [status], [created_at], [updated_at], [reply], [semester], [request_type]) VALUES (6, 3, 3, N'AC not working', N'Pending', CAST(N'2024-10-23T10:10:00.000' AS DateTime), CAST(N'2024-10-23T10:10:00.000' AS DateTime), NULL, N'Fall 2024', 1)
INSERT [dbo].[Requests] ([request_id], [room_id], [user_id], [description], [status], [created_at], [updated_at], [reply], [semester], [request_type]) VALUES (7, 4, 3, N'Door lock issue', N'Pending', CAST(N'2024-10-23T10:15:00.000' AS DateTime), CAST(N'2024-10-23T10:15:00.000' AS DateTime), NULL, N'Fall 2024', 1)
INSERT [dbo].[Requests] ([request_id], [room_id], [user_id], [description], [status], [created_at], [updated_at], [reply], [semester], [request_type]) VALUES (8, 5, 3, N'Water heater malfunction', N'Pending', CAST(N'2024-10-23T10:20:00.000' AS DateTime), CAST(N'2024-10-23T10:20:00.000' AS DateTime), NULL, N'Fall 2024', 1)
INSERT [dbo].[Requests] ([request_id], [room_id], [user_id], [description], [status], [created_at], [updated_at], [reply], [semester], [request_type]) VALUES (9, 6, 3, N'Wi-Fi signal weak', N'Pending', CAST(N'2024-10-23T10:25:00.000' AS DateTime), CAST(N'2024-10-23T10:25:00.000' AS DateTime), NULL, N'Fall 2024', 1)
INSERT [dbo].[Requests] ([request_id], [room_id], [user_id], [description], [status], [created_at], [updated_at], [reply], [semester], [request_type]) VALUES (10, 7, 3, N'Floor tiles broken', N'Pending', CAST(N'2024-10-23T10:30:00.000' AS DateTime), CAST(N'2024-10-23T10:30:00.000' AS DateTime), NULL, N'Fall 2024', 1)
INSERT [dbo].[Requests] ([request_id], [room_id], [user_id], [description], [status], [created_at], [updated_at], [reply], [semester], [request_type]) VALUES (11, 8, 3, N'Room lights flickering', N'Pending', CAST(N'2024-10-23T10:35:00.000' AS DateTime), CAST(N'2024-10-23T10:35:00.000' AS DateTime), NULL, N'Fall 2024', 1)
INSERT [dbo].[Requests] ([request_id], [room_id], [user_id], [description], [status], [created_at], [updated_at], [reply], [semester], [request_type]) VALUES (12, 9, 3, N'Shower not draining', N'Pending', CAST(N'2024-10-23T10:40:00.000' AS DateTime), CAST(N'2024-10-23T10:40:00.000' AS DateTime), NULL, N'Fall 2024', 1)
INSERT [dbo].[Requests] ([request_id], [room_id], [user_id], [description], [status], [created_at], [updated_at], [reply], [semester], [request_type]) VALUES (13, 10, 3, N'Heating system problem', N'Pending', CAST(N'2024-10-23T10:45:00.000' AS DateTime), CAST(N'2024-10-23T10:45:00.000' AS DateTime), NULL, N'Fall 2024', 1)
SET IDENTITY_INSERT [dbo].[Requests] OFF
GO
SET IDENTITY_INSERT [dbo].[Roles] ON 

INSERT [dbo].[Roles] ([role_id], [role_name]) VALUES (1, N'admin')
INSERT [dbo].[Roles] ([role_id], [role_name]) VALUES (2, N'manager')
INSERT [dbo].[Roles] ([role_id], [role_name]) VALUES (3, N'staff')
INSERT [dbo].[Roles] ([role_id], [role_name]) VALUES (4, N'student')
SET IDENTITY_INSERT [dbo].[Roles] OFF
GO
SET IDENTITY_INSERT [dbo].[RoomCategories] ON 

INSERT [dbo].[RoomCategories] ([room_type_id], [category_name]) VALUES (3, N'3 Bed')
INSERT [dbo].[RoomCategories] ([room_type_id], [category_name]) VALUES (2, N'4 Bed')
INSERT [dbo].[RoomCategories] ([room_type_id], [category_name]) VALUES (1, N'6 Bed')
SET IDENTITY_INSERT [dbo].[RoomCategories] OFF
GO
SET IDENTITY_INSERT [dbo].[Rooms] ON 

INSERT [dbo].[Rooms] ([room_id], [room_number], [room_type_id], [price], [availability_status], [created_at], [updated_at], [floor_number], [dorm]) VALUES (2, N'101', 1, CAST(5000000.00 AS Decimal(10, 2)), N'Available', CAST(N'2024-10-23T10:00:00.000' AS DateTime), CAST(N'2024-10-23T10:00:00.000' AS DateTime), 1, N'A')
INSERT [dbo].[Rooms] ([room_id], [room_number], [room_type_id], [price], [availability_status], [created_at], [updated_at], [floor_number], [dorm]) VALUES (3, N'102', 1, CAST(5500000.00 AS Decimal(10, 2)), N'Available', CAST(N'2024-10-23T10:05:00.000' AS DateTime), CAST(N'2024-10-23T10:05:00.000' AS DateTime), 1, N'B')
INSERT [dbo].[Rooms] ([room_id], [room_number], [room_type_id], [price], [availability_status], [created_at], [updated_at], [floor_number], [dorm]) VALUES (4, N'103', 2, CAST(6000000.00 AS Decimal(10, 2)), N'Available', CAST(N'2024-10-23T10:10:00.000' AS DateTime), CAST(N'2024-10-23T10:10:00.000' AS DateTime), 1, N'B')
INSERT [dbo].[Rooms] ([room_id], [room_number], [room_type_id], [price], [availability_status], [created_at], [updated_at], [floor_number], [dorm]) VALUES (5, N'104', 2, CAST(6200000.00 AS Decimal(10, 2)), N'Available', CAST(N'2024-10-23T10:15:00.000' AS DateTime), CAST(N'2024-10-23T10:15:00.000' AS DateTime), 1, N'A')
INSERT [dbo].[Rooms] ([room_id], [room_number], [room_type_id], [price], [availability_status], [created_at], [updated_at], [floor_number], [dorm]) VALUES (6, N'105', 1, CAST(5700000.00 AS Decimal(10, 2)), N'Booked', CAST(N'2024-10-23T10:20:00.000' AS DateTime), CAST(N'2024-10-23T10:20:00.000' AS DateTime), 1, N'A')
INSERT [dbo].[Rooms] ([room_id], [room_number], [room_type_id], [price], [availability_status], [created_at], [updated_at], [floor_number], [dorm]) VALUES (7, N'106', 3, CAST(6500000.00 AS Decimal(10, 2)), N'Booked', CAST(N'2024-10-23T10:25:00.000' AS DateTime), CAST(N'2024-10-23T10:25:00.000' AS DateTime), 1, N'A')
INSERT [dbo].[Rooms] ([room_id], [room_number], [room_type_id], [price], [availability_status], [created_at], [updated_at], [floor_number], [dorm]) VALUES (8, N'107', 3, CAST(6700000.00 AS Decimal(10, 2)), N'Booked', CAST(N'2024-10-23T10:30:00.000' AS DateTime), CAST(N'2024-10-23T10:30:00.000' AS DateTime), 1, N'A')
INSERT [dbo].[Rooms] ([room_id], [room_number], [room_type_id], [price], [availability_status], [created_at], [updated_at], [floor_number], [dorm]) VALUES (9, N'108', 1, CAST(5800000.00 AS Decimal(10, 2)), N'Under Maintenance', CAST(N'2024-10-23T10:35:00.000' AS DateTime), CAST(N'2024-10-23T10:35:00.000' AS DateTime), 1, N'B')
INSERT [dbo].[Rooms] ([room_id], [room_number], [room_type_id], [price], [availability_status], [created_at], [updated_at], [floor_number], [dorm]) VALUES (10, N'109', 2, CAST(6300000.00 AS Decimal(10, 2)), N'Under Maintenance', CAST(N'2024-10-23T10:40:00.000' AS DateTime), CAST(N'2024-10-23T10:40:00.000' AS DateTime), 1, N'B')
INSERT [dbo].[Rooms] ([room_id], [room_number], [room_type_id], [price], [availability_status], [created_at], [updated_at], [floor_number], [dorm]) VALUES (11, N'110', 1, CAST(5900000.00 AS Decimal(10, 2)), N'Under Maintenance', CAST(N'2024-10-23T10:45:00.000' AS DateTime), CAST(N'2024-10-23T10:45:00.000' AS DateTime), 1, N'B')
SET IDENTITY_INSERT [dbo].[Rooms] OFF
GO
SET IDENTITY_INSERT [dbo].[Users] ON 

INSERT [dbo].[Users] ([user_id], [username], [password], [gender], [email], [status], [role_id], [created_at], [updated_at]) VALUES (3, N'kienthe160037', N'123', 1, N'trungkien2981412@gmail.com', 1, 1, CAST(N'2022-02-01T00:00:00.000' AS DateTime), CAST(N'2023-01-02T00:00:00.000' AS DateTime))
INSERT [dbo].[Users] ([user_id], [username], [password], [gender], [email], [status], [role_id], [created_at], [updated_at]) VALUES (4, N'kien', N'123456', 1, N'kientthe160037@fpt.edu.vn', 1, 4, CAST(N'2022-01-02T00:00:00.000' AS DateTime), CAST(N'2023-03-01T00:00:00.000' AS DateTime))
SET IDENTITY_INSERT [dbo].[Users] OFF
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Roles__783254B1C28A7059]    Script Date: 10/23/2024 11:48:09 AM ******/
ALTER TABLE [dbo].[Roles] ADD UNIQUE NONCLUSTERED 
(
	[role_name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__RoomCate__5189E255AF8C7D28]    Script Date: 10/23/2024 11:48:09 AM ******/
ALTER TABLE [dbo].[RoomCategories] ADD UNIQUE NONCLUSTERED 
(
	[category_name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Rooms__FE22F61BDDCA0F9D]    Script Date: 10/23/2024 11:48:09 AM ******/
ALTER TABLE [dbo].[Rooms] ADD UNIQUE NONCLUSTERED 
(
	[room_number] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Users__AB6E61643AF79B36]    Script Date: 10/23/2024 11:48:09 AM ******/
ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [UQ__Users__AB6E61643AF79B36] UNIQUE NONCLUSTERED 
(
	[email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Users__F3DBC5723FCE6A6B]    Script Date: 10/23/2024 11:48:09 AM ******/
ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [UQ__Users__F3DBC5723FCE6A6B] UNIQUE NONCLUSTERED 
(
	[username] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Bookings] ADD  DEFAULT (getdate()) FOR [created_at]
GO
ALTER TABLE [dbo].[Bookings] ADD  DEFAULT (getdate()) FOR [updated_at]
GO
ALTER TABLE [dbo].[Feedback] ADD  DEFAULT (getdate()) FOR [created_at]
GO
ALTER TABLE [dbo].[OTP_Temp] ADD  CONSTRAINT [DF__OTP_Temp__create__412EB0B6]  DEFAULT (getdate()) FOR [created_at]
GO
ALTER TABLE [dbo].[Posts] ADD  DEFAULT (getdate()) FOR [created_at]
GO
ALTER TABLE [dbo].[Posts] ADD  DEFAULT (getdate()) FOR [updated_at]
GO
ALTER TABLE [dbo].[Reports] ADD  DEFAULT (getdate()) FOR [created_at]
GO
ALTER TABLE [dbo].[Reports] ADD  DEFAULT (getdate()) FOR [updated_at]
GO
ALTER TABLE [dbo].[request_type] ADD  DEFAULT (getdate()) FOR [created_at]
GO
ALTER TABLE [dbo].[request_type] ADD  DEFAULT (getdate()) FOR [updated_at]
GO
ALTER TABLE [dbo].[Requests] ADD  DEFAULT (getdate()) FOR [created_at]
GO
ALTER TABLE [dbo].[Requests] ADD  DEFAULT (getdate()) FOR [updated_at]
GO
ALTER TABLE [dbo].[Rooms] ADD  DEFAULT (getdate()) FOR [created_at]
GO
ALTER TABLE [dbo].[Rooms] ADD  DEFAULT (getdate()) FOR [updated_at]
GO
ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [DF__Users__created_a__48CFD27E]  DEFAULT (getdate()) FOR [created_at]
GO
ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [DF__Users__updated_a__49C3F6B7]  DEFAULT (getdate()) FOR [updated_at]
GO
ALTER TABLE [dbo].[Beds]  WITH CHECK ADD FOREIGN KEY([room_id])
REFERENCES [dbo].[Rooms] ([room_id])
GO
ALTER TABLE [dbo].[Bookings]  WITH CHECK ADD FOREIGN KEY([bed_id])
REFERENCES [dbo].[Beds] ([bed_id])
GO
ALTER TABLE [dbo].[Bookings]  WITH CHECK ADD FOREIGN KEY([room_id])
REFERENCES [dbo].[Rooms] ([room_id])
GO
ALTER TABLE [dbo].[Bookings]  WITH CHECK ADD  CONSTRAINT [FK__Bookings__user_i__4D94879B] FOREIGN KEY([user_id])
REFERENCES [dbo].[Users] ([user_id])
GO
ALTER TABLE [dbo].[Bookings] CHECK CONSTRAINT [FK__Bookings__user_i__4D94879B]
GO
ALTER TABLE [dbo].[Feedback]  WITH CHECK ADD FOREIGN KEY([booking_id])
REFERENCES [dbo].[Bookings] ([booking_id])
GO
ALTER TABLE [dbo].[OTP_Temp]  WITH CHECK ADD  CONSTRAINT [FK_UserID] FOREIGN KEY([user_id])
REFERENCES [dbo].[Users] ([user_id])
GO
ALTER TABLE [dbo].[OTP_Temp] CHECK CONSTRAINT [FK_UserID]
GO
ALTER TABLE [dbo].[Posts]  WITH CHECK ADD  CONSTRAINT [FK__Posts__target_us__52593CB8] FOREIGN KEY([target_user_id])
REFERENCES [dbo].[Users] ([user_id])
GO
ALTER TABLE [dbo].[Posts] CHECK CONSTRAINT [FK__Posts__target_us__52593CB8]
GO
ALTER TABLE [dbo].[Posts]  WITH CHECK ADD  CONSTRAINT [FK__Posts__user_id__534D60F1] FOREIGN KEY([user_id])
REFERENCES [dbo].[Users] ([user_id])
GO
ALTER TABLE [dbo].[Posts] CHECK CONSTRAINT [FK__Posts__user_id__534D60F1]
GO
ALTER TABLE [dbo].[Reports]  WITH CHECK ADD FOREIGN KEY([room_id])
REFERENCES [dbo].[Rooms] ([room_id])
GO
ALTER TABLE [dbo].[Reports]  WITH CHECK ADD  CONSTRAINT [FK__Reports__user_id__5535A963] FOREIGN KEY([user_id])
REFERENCES [dbo].[Users] ([user_id])
GO
ALTER TABLE [dbo].[Reports] CHECK CONSTRAINT [FK__Reports__user_id__5535A963]
GO
ALTER TABLE [dbo].[Requests]  WITH CHECK ADD FOREIGN KEY([room_id])
REFERENCES [dbo].[Rooms] ([room_id])
GO
ALTER TABLE [dbo].[Requests]  WITH CHECK ADD  CONSTRAINT [FK__Maintenan__user___5070F446] FOREIGN KEY([user_id])
REFERENCES [dbo].[Users] ([user_id])
GO
ALTER TABLE [dbo].[Requests] CHECK CONSTRAINT [FK__Maintenan__user___5070F446]
GO
ALTER TABLE [dbo].[Requests]  WITH CHECK ADD  CONSTRAINT [FK_MaintenanceRequests_RequestType] FOREIGN KEY([request_type])
REFERENCES [dbo].[request_type] ([id])
GO
ALTER TABLE [dbo].[Requests] CHECK CONSTRAINT [FK_MaintenanceRequests_RequestType]
GO
ALTER TABLE [dbo].[Rooms]  WITH CHECK ADD FOREIGN KEY([room_type_id])
REFERENCES [dbo].[RoomCategories] ([room_type_id])
GO
ALTER TABLE [dbo].[Beds]  WITH CHECK ADD CHECK  (([availability_status]='Occupied' OR [availability_status]='Available'))
GO
ALTER TABLE [dbo].[Bookings]  WITH CHECK ADD CHECK  (([booking_status]='Cancelled' OR [booking_status]='Pending' OR [booking_status]='Confirmed'))
GO
ALTER TABLE [dbo].[Bookings]  WITH CHECK ADD CHECK  (([payment_status]='Failed' OR [payment_status]='Pending' OR [payment_status]='Completed'))
GO
ALTER TABLE [dbo].[Posts]  WITH CHECK ADD CHECK  (([post_type]='Notification' OR [post_type]='News' OR [post_type]='Announcement'))
GO
ALTER TABLE [dbo].[Reports]  WITH CHECK ADD CHECK  (([report_status]='Closed' OR [report_status]='Open'))
GO
ALTER TABLE [dbo].[Requests]  WITH CHECK ADD CHECK  (([status]='Completed' OR [status]='Pending'))
GO
ALTER TABLE [dbo].[Rooms]  WITH CHECK ADD CHECK  (([availability_status]='Under Maintenance' OR [availability_status]='Booked' OR [availability_status]='Available'))
GO
