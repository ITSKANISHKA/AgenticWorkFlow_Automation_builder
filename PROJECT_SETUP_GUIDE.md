# 🚀 Project Setup Guide - FlowForge Workflow Automation

## 📋 Project Information

**Project Name:** FlowForge - Agentic Workflow Automation Builder  
**Team:** A4AI (Team ID: 60)  
**Institution:** GLA University  
**Team Members:** Kanishka, Anushka, Utkarsh  

---

## 🎯 What This Project Does

A workflow automation platform that lets you:
- Create automated workflows with drag-and-drop interface
- Send emails to multiple recipients automatically
- Manage workflows with role-based access (User, Employee, Manager)
- Execute workflows with real Gmail integration

---

## 📦 Prerequisites

Before starting, make sure you have:

1. **Node.js** (v22 or higher)
   - Download: https://nodejs.org/
   - Check version: `node --version`

2. **npm** (comes with Node.js)
   - Check version: `npm --version`

3. **Gmail Account** with 2-Step Verification enabled
   - Required for sending emails

4. **Code Editor** (VS Code recommended)
   - Download: https://code.visualstudio.com/

5. **Git** (optional, for cloning)
   - Download: https://git-scm.com/

---

## 📥 Step 1: Download/Clone Project

### Option A: Clone with Git
```bash
git clone <repository-url>
cd Kanish_Project
```

### Option B: Download ZIP
1. Download the project ZIP file
2. Extract to your desired location
3. Open terminal in the extracted folder

---

## 🔧 Step 2: Install Dependencies

### 2.1 Install Backend Dependencies

```bash
# Navigate to backend folder
cd backend

# Install packages
npm install
```

**This installs:**
- express (API server)
- cors (Cross-origin requests)
- nodemailer (Email sending)
- node-cron (Task scheduling)
- dotenv (Environment variables)

### 2.2 Install Frontend Dependencies

```bash
# Go back to project root
cd ..

# Install frontend packages
npm install
```

**This installs:**
- react & react-dom (UI framework)
- vite (Build tool)
- tailwindcss (Styling)
- react-router-dom (Routing)
- @dnd-kit (Drag-and-drop)
- lucide-react (Icons)
- axios (HTTP client)

---

## 📧 Step 3: Configure Gmail (Important!)

### 3.1 Enable 2-Step Verification

1. Go to: https://myaccount.google.com/security
2. Find **"2-Step Verification"**
3. Click and follow steps to enable it

### 3.2 Generate App Password

1. Go to: https://myaccount.google.com/apppasswords
2. Select app: **Mail**
3. Select device: **Windows Computer** (or your OS)
4. Click **Generate**
5. Copy the **16-character password** (example: `abcd efgh ijkl mnop`)

**Important:** Remove all spaces from the password!

### 3.3 Configure Environment Variables

Edit the file: `backend/.env`

```env
# Replace with YOUR Gmail credentials
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=abcdefghijklmnop

# Server Configuration (don't change these)
PORT=5000
NODE_ENV=development
```

**Example:**
```env
EMAIL_USER=johndoe@gmail.com
EMAIL_PASSWORD=xyzhwklmabcdpqrs
PORT=5000
NODE_ENV=development
```

---

## ▶️ Step 4: Run the Project

You need **TWO terminal windows** running at the same time.

### Terminal 1 - Backend Server

```bash
# Navigate to backend folder
cd backend

# Start server
node server.js
```

**Expected Output:**
```
🤖 Email Agent initialized
📧 Ready to send emails via SMTP
🤖 Agents initialized successfully!
Server is running on port 5000
```

✅ **Keep this terminal running!**

---

### Terminal 2 - Frontend Development Server

Open a **NEW terminal window** (don't close Terminal 1):

```bash
# Navigate to project root (if not already there)
cd path/to/Kanish_Project

# Start frontend
npm run dev
```

**Expected Output:**
```
VITE v7.2.5  ready in 234 ms

➜  Local:   http://localhost:5174/
➜  Network: use --host to expose
```

✅ **Keep this terminal running too!**

---

## 🌐 Step 5: Open Application

Open your web browser and go to:

```
http://localhost:5174/
```

You should see the **Login Page**.

---

## 👤 Step 6: Login and Test

### Test Login Credentials

**Employee Role (Full Access):**
```
Email: employee@test.com
Password: test123
Role: Employee
```

**Manager Role (Team Analytics):**
```
Email: manager@test.com
Password: test123
Role: Manager
```

**User Role (View Only):**
```
Email: user@test.com
Password: test123
Role: User
```

---

## ✅ Step 7: Verify Setup

### Check Backend is Working:

In **Terminal 1** (backend), you should see:
```
Server is running on port 5000
```

### Check Frontend is Working:

In **Terminal 2** (frontend), you should see:
```
➜  Local:   http://localhost:5174/
```

### Check Browser:

You should see:
- Login page with email/password fields
- Role dropdown (User, Employee, Manager)
- Login button

---

## 🎯 Step 8: Test Email Sending (Optional but Recommended)

### Quick Backend Test:

```bash
# In backend folder
cd backend
node test-direct-simple.js
```

**This will:**
- Send test emails to configured addresses
- Show success/failure messages
- Verify Gmail integration is working

**Expected Output:**
```
✅ EMAIL SENT SUCCESSFULLY to your-email@gmail.com
   Message ID: <...@gmail.com>

Sent 1/1 emails successfully
```

---

## 📁 Project Structure

```
Kanish_Project/
├── backend/
│   ├── agents/
│   │   ├── EmailAgent.js          # Handles email sending
│   │   ├── WorkflowEngine.js      # Executes workflows
│   │   └── SchedulerAgent.js      # Manages scheduling
│   ├── .env                        # YOUR Gmail credentials HERE
│   ├── server.js                   # Main backend server
│   ├── package.json
│   └── test-*.js                   # Testing scripts
│
├── src/
│   ├── components/
│   │   └── RecipientManager.jsx   # Email recipient management
│   ├── context/
│   │   ├── AuthContext.jsx        # User authentication
│   │   └── WorkflowContext.jsx    # Workflow state management
│   ├── pages/
│   │   ├── Login.jsx              # Login page
│   │   ├── EmployeeDashboard.jsx  # Employee dashboard
│   │   ├── ManagerDashboard.jsx   # Manager dashboard
│   │   ├── UserDashboard.jsx      # User dashboard
│   │   ├── WorkflowBuilder.jsx    # Workflow editor
│   │   └── Templates.jsx          # Pre-built templates
│   ├── App.jsx                    # Main routing
│   ├── main.jsx                   # React entry point
│   └── index.css                  # Tailwind styles
│
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── README.md
└── PROJECT_SETUP_GUIDE.md         # This file
```

---

## 🐛 Troubleshooting

### Problem 1: "Port 5000 already in use"

**Solution (Windows):**
```powershell
# Kill process on port 5000
Get-NetTCPConnection -LocalPort 5000 | Select-Object -ExpandProperty OwningProcess | ForEach-Object { Stop-Process -Id $_ -Force }

# Restart backend
cd backend
node server.js
```

**Solution (Mac/Linux):**
```bash
# Find and kill process
lsof -ti:5000 | xargs kill -9

# Restart backend
cd backend
node server.js
```

---

### Problem 2: "npm install fails"

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

---

### Problem 3: "Email not sending - Invalid login credentials"

**Causes:**
- 2-Step Verification not enabled
- App Password incorrect
- Spaces in App Password

**Solution:**
1. Verify 2-Step Verification is ON
2. Generate NEW App Password
3. Copy password WITHOUT spaces
4. Update `backend/.env` file
5. Restart backend server

---

### Problem 4: "Frontend shows blank page"

**Solution:**
```bash
# Check browser console (F12)
# Look for errors

# Clear browser cache (Ctrl+Shift+Del)

# Restart frontend
npm run dev
```

---

### Problem 5: "Cannot connect to backend"

**Checklist:**
- [ ] Backend terminal shows "Server is running on port 5000"
- [ ] No firewall blocking port 5000
- [ ] Backend .env file configured correctly
- [ ] Both servers running simultaneously

**Solution:**
```bash
# Restart backend
cd backend
node server.js

# In new terminal, restart frontend
cd ..
npm run dev
```

---

## 🧪 Testing Checklist

Before presenting/using, verify:

- [ ] Backend starts without errors
- [ ] Frontend starts and shows on http://localhost:5174/
- [ ] Can login as Employee
- [ ] Can add email recipients
- [ ] Can select recipients (turn blue)
- [ ] Can create workflow
- [ ] Can add email block
- [ ] "Load Selected Recipients" works
- [ ] Can save workflow
- [ ] Can run workflow (▶️ button)
- [ ] Backend terminal shows email success messages
- [ ] Emails received in Gmail inbox

---

## 📚 Usage Guide

### Complete Workflow Process:

1. **Login as Employee**
   - Email: employee@test.com
   - Password: test123
   - Role: Employee

2. **Add Recipients**
   - Scroll to "Email Recipients" section
   - Type email addresses and click "Add"
   - Click on each email to select (turns blue)

3. **Create Workflow**
   - Click "Create New Workflow"
   - Click "📧 Send Email" from sidebar
   - Click "Edit" on block
   - Click "📥 Load Selected Recipients"
   - Enter subject and body
   - Click "Save"

4. **Save Workflow**
   - Click "Save Workflow" (top right)
   - Returns to dashboard

5. **Execute Workflow**
   - Find workflow in list
   - Click ▶️ "Run" button
   - Check backend terminal for success
   - Check Gmail inbox for email

---

## 🎓 For Developers

### Available Scripts:

**Frontend:**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

**Backend:**
```bash
node server.js       # Start backend server
node test-*.js       # Run various tests
```

### Adding New Features:

1. **Frontend:** Edit files in `src/` folder
2. **Backend:** Edit files in `backend/` folder
3. **Restart servers** after changes
4. **Test thoroughly** before committing

---

## 🌐 Deployment (Future)

### Backend Deployment:
- Recommended: Railway, Render, or Heroku
- Set environment variables (EMAIL_USER, EMAIL_PASSWORD)
- Use MongoDB/PostgreSQL instead of in-memory storage

### Frontend Deployment:
- Recommended: Vercel or Netlify
- Build with `npm run build`
- Update API URL in `src/context/WorkflowContext.jsx`

---

## 📞 Support & Contact

**Team A4AI:**
- Kanishka: 06kanishkaa@gmail.com
- Utkarsh: utkarshchauhan763@gmail.com

**For Issues:**
- Check backend terminal for error messages
- Check browser console (F12) for frontend errors
- Refer to Troubleshooting section above

---

## 📄 Documentation Files

- `README.md` - Project overview and features
- `PROJECT_SETUP_GUIDE.md` - This file
- `STEP_BY_STEP_USAGE.md` - Detailed usage instructions
- `PRESENTATION_SCRIPT.md` - Demo presentation guide
- `ROLE_SYSTEM_GUIDE.md` - Role-based access documentation

---

## ⚖️ License

MIT License - Free for educational and commercial use

---

## 🎉 Success!

If you can:
1. ✅ See both terminals running without errors
2. ✅ Open http://localhost:5174/ in browser
3. ✅ Login as Employee
4. ✅ Send a test email successfully

**Congratulations! Setup is complete!** 🎊

---

**Last Updated:** November 28, 2025  
**Version:** 1.0.0  
**Status:** Production Ready (with in-memory storage)

---

## 🚀 Quick Start Commands (Copy-Paste Ready)

```bash
# Terminal 1 - Backend
cd backend
node server.js

# Terminal 2 - Frontend (NEW TERMINAL)
npm run dev

# Browser
# Open: http://localhost:5174/
# Login: employee@test.com / test123 / Employee
```

✅ **That's it! You're ready to go!**
