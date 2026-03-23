# Full-Stack-Todo-App

Full-stack Todo application built with an ASP.NET Core backend and a React frontend. The application features complete CRUD operations and user authentication.

## ✨ Features

- **User Authentication**: Secure Login and Registration using JWT.
- **Full CRUD Support**: Create, Read, Update, and Delete tasks.

## 🚀 Tech Stack

- **Frontend**: React, Vite, CSS.
- **Backend**: .NET 8, ASP.NET Core, Dapper.
- **Database**: SQL Server.

## 🎬 Demos

### 🔐 Authentication Flow
| Registration | Login |
| :---: | :---: |
| ![Register](assets/register-demo.gif) | ![Login](assets/login-demo.gif) |

### 📝 Task Management
| View Tasks | Create Task |
| :---: | :---: |
| ![Read](assets/read-demo.gif) | ![Create](assets/create-demo.gif) |

| Update Task | Delete Task |
| :---: | :---: |
| ![Update](assets/update-demo.gif) | ![Delete](assets/delete-demo.gif) |

## 🛠️ Setup Instructions

### Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js](https://nodejs.org/)
- SQL Server

### Backend Setup

1. Open the solution in Visual Studio or VS Code.
2. Update the connection string in `appsettings.json` to point to your SQL Server instance.
3. Run the application:
   ```bash
   dotnet run
   ```

### Frontend Setup

1. Navigate to the `Client` directory:
   ```bash
   cd Client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 📸 UI Preview

The application features a dark, modern interface with vibrant action buttons and intuitive task management controls.

---
