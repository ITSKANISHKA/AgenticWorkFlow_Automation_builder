# 🚀 FlowForge - Agentic Workflow Automation Builder

A powerful no-code workflow automation platform with role-based access, real Gmail integration, and multi-recipient email automation.

## 🎯 Project Overview

- **Team:** A4AI (Team ID: 60)
- **Institute:** GLA University  
- **Course:** Mini-Project
- **Date:** November 28, 2025

## ✨ Key Features

- ✅ **Role-Based Dashboards** - User, Employee, and Manager roles with different permissions
- ✅ **Drag-and-Drop Workflow Builder** - Visual workflow design with 6 block types
- ✅ **Real Gmail Integration** - Send actual emails via Gmail SMTP
- ✅ **Multi-Recipient Email System** - Add, select, and send to multiple recipients
- ✅ **Pre-Built Templates** - 6 ready-to-use workflow templates
- ✅ **Three-Agent Architecture** - EmailAgent, WorkflowEngine, and SchedulerAgent
- ✅ **User Authentication** - Secure login with role selection

## 🏗️ Tech Stack

**Frontend:** React 19, Vite 7, Tailwind CSS 3.4, React Router, @dnd-kit, Lucide React, Axios  
**Backend:** Node.js 22, Express 4, Nodemailer 6.9, Node-cron 3.0  
**Email:** Gmail SMTP with App Password authentication

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js v22 or higher
- npm package manager
- Gmail account with 2-Step Verification enabled

### Step 1️⃣: Backend Setup

1. **Navigate to backend folder:**
```powershell
cd backend
```

2. **Install dependencies:**
```powershell
npm install
```

3. **Configure Gmail credentials:**

Edit `backend/.env` file:
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
PORT=5000
NODE_ENV=development
```

**To get Gmail App Password:**
- Enable 2-Step Verification: https://myaccount.google.com/security
- Generate App Password: https://myaccount.google.com/apppasswords
- Copy 16-character password (remove spaces)

4. **Start backend server:**
```powershell
node server.js
```

**Expected output:**
```
🤖 Email Agent initialized
📧 Ready to send emails via SMTP
Server is running on port 5000
```

✅ **Keep this terminal running!**

---

### Step 2️⃣: Frontend Setup

**Open a NEW terminal** (keep backend running):

1. **Go back to project root:**
```powershell
cd ..
```

2. **Install dependencies:**
```powershell
npm install
```

3. **Start development server:**
```powershell
npm run dev
```

**Expected output:**
```
VITE v7.x.x ready in XXX ms
➜  Local:   http://localhost:5174/
```

✅ **Keep this terminal running too!**

---

### Step 3️⃣: Access Application

Open browser and go to: **http://localhost:5174/**

---

## 👥 Test the Application

### Login Credentials

**Employee Role (Full Access):**
```
Email: employee@test.com
Password: anything
Role: Employee (select from dropdown)
```

**Manager Role (Analytics):**
```
Email: manager@test.com
Password: anything
Role: Manager
```

**User Role (View Only):**
```
Email: user@test.com
Password: anything
Role: User
```

---

## 📧 Create Your First Email Workflow

### Step-by-Step Instructions

1. **Login as Employee** (employee@test.com)

2. **Add Email Recipients:**
   - Scroll to "Email Recipients" section
   - Type email addresses and click "Add" for each
   - Click on emails to select them (they turn blue ✅)

3. **Create Workflow:**
   - Click "Create New Workflow" button
   - Give it a name

4. **Add Email Block:**
   - Click "📧 Send Email" from left sidebar
   - Click "Edit" on the email block

5. **Configure Email:**
   - Click "📥 Load Selected Recipients"
   - Enter subject and message
   - Click "Save"

6. **Save and Run:**
   - Click "Save Workflow" (top right)
   - Find your workflow in the dashboard
   - Click ▶️ **Run** button

7. **Verify:**
   - Check backend terminal for success messages
   - Check Gmail inboxes for received emails ✉️

---

## 🧪 Testing

### Test Email Sending (Backend)

```powershell
cd backend
node test-direct-simple.js
```

Should send test emails and show success messages.

### Test Multi-Recipient

```powershell
node test-multi-recipients.js
```

Sends to 3 recipients at once.

---

## 🐛 Troubleshooting

### Backend Port Already in Use

```powershell
# Kill process on port 5000
Get-NetTCPConnection -LocalPort 5000 | Select-Object -ExpandProperty OwningProcess | ForEach-Object { Stop-Process -Id $_ -Force }

# Restart server
node server.js
```

### Email Not Sending

1. Verify 2-Step Verification enabled on Gmail
2. Generate NEW App Password
3. Update `.env` with correct credentials (no spaces)
4. Restart backend server

### Recipients Not Loading

1. Go to Dashboard
2. **Click on emails** to select them (must turn blue)
3. Verify "X of Y selected" shows at top
4. Then go to workflow builder

---

## 📁 Project Structure

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create .env file from example:**
```bash
cp .env.example .env
```

4. **Start backend server:**
```bash
npm run dev
```

The backend API will be available at `http://localhost:5000`

## 📁 Project Structure

```
Kanish_Project/
├── src/
│   ├── components/         # Reusable React components
│   ├── pages/             # Page components
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── WorkflowBuilder.jsx
│   │   └── Templates.jsx
│   ├── context/           # React Context providers
│   │   ├── AuthContext.jsx
│   │   └── WorkflowContext.jsx
│   ├── App.jsx            # Main app with routing
│   └── index.css          # Global styles
├── backend/
│   ├── server.js          # Express server
│   └── package.json       # Backend dependencies
├── package.json           # Frontend dependencies
└── README.md             # This file
```

## 🎨 Technology Stack

### Frontend
- React 19, Vite, React Router
- @dnd-kit (Drag and drop)
- Tailwind CSS, Lucide React
- Axios

### Backend
- Node.js, Express
- MongoDB, JWT, Bcrypt

## 📖 User Journeys

### Workflow Creator
Login → Dashboard → Create/Browse Templates → Drag-drop blocks → Configure → Save → Deploy

### Workflow Monitor  
Dashboard → View Workflows → Select → View Logs → Receive Alerts

## 🧪 Available Templates

1. Email Automation
2. Customer Onboarding
3. Daily Sales Report
4. Approval Workflow
5. Automated Data Backup
6. Task Reminder

## 🤝 Team Members

- **Kanishka** - Frontend, AI Engine, Security
- **Anushka** - Backend, Data Stores, Integrations

## 📧 Contact

kanishka.gla_cs.aiml23@gla.ac.in

---

**Made with ❤️ by Team A4AI**
