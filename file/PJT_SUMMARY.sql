USE [TEST]
GO

/****** Object:  Table [dbo].[PJT_Summary]    Script Date: 2023-10-24 ¿ÀÈÄ 3:59:11 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[PJT_Summary](
	[Project] [nvarchar](50) NULL,
	[Name] [nvarchar](20) NULL,
	[Count] [int] NULL,
	[Total] [int] NULL,
	[Rate] [numeric](18, 2) NULL,
	[Option1] [nvarchar](50) NULL
) ON [PRIMARY]
GO


