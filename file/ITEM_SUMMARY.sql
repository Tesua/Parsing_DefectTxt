USE [TEST]
GO

/****** Object:  Table [dbo].[Item_Summary]    Script Date: 2023-10-24 ¿ÀÈÄ 3:58:58 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Item_Summary](
	[Item] [nvarchar](50) NULL,
	[Name] [nvarchar](20) NULL,
	[Count] [int] NULL,
	[Total] [int] NULL,
	[Rate] [numeric](18, 2) NULL,
	[Option1] [nvarchar](50) NULL
) ON [PRIMARY]
GO


