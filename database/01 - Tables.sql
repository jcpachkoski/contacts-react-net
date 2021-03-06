USE [jvContacts]
GO
/****** Object:  Table [dbo].[Contacts]    Script Date: 5/23/2019 8:01:02 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Contacts]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[Contacts](
	[Id] [uniqueidentifier] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
	[FirstName] [nvarchar](80) NOT NULL,
	[LastName] [nvarchar](80) NOT NULL,
	[Email] [nvarchar](500) NOT NULL,
	[PhoneNumber] [nvarchar](20) NULL,
	[Street1] [nvarchar](80) NULL,
	[Street2] [nvarchar](80) NULL,
	[City] [nvarchar](80) NULL,
	[State] [nvarchar](80) NULL,
	[Country] [nvarchar](80) NULL,
	[ZipCode] [nvarchar](10) NULL,
	[ImageUrl] [nvarchar](500) NULL,
	[CreatedBy] [nvarchar](max) NULL,
	[CreatedOn] [datetime2](7) NOT NULL,
	[ModifiedBy] [nvarchar](max) NULL,
	[ModifiedOn] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_Contacts] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[DF__Contacts__FirstN__38996AB5]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[Contacts] ADD  DEFAULT (N'') FOR [FirstName]
END
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[DF__Contacts__LastNa__398D8EEE]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[Contacts] ADD  DEFAULT (N'') FOR [LastName]
END
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[DF__Contacts__Email__3A81B327]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[Contacts] ADD  DEFAULT (N'') FOR [Email]
END
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[DF__Contacts__PhoneN__3B75D760]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[Contacts] ADD  DEFAULT (N'') FOR [PhoneNumber]
END
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[DF__Contacts__ImageU__3C69FB99]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[Contacts] ADD  DEFAULT (N'') FOR [ImageUrl]
END
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[DF__Contacts__Create__3D5E1FD2]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[Contacts] ADD  DEFAULT (getutcdate()) FOR [CreatedOn]
END
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[DF__Contacts__Modifi__3E52440B]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[Contacts] ADD  DEFAULT (getutcdate()) FOR [ModifiedOn]
END
GO
