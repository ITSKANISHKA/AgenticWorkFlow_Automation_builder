# 🤖 Agentic Workflow Automation Builder

> 🚀 A No-Code + AI-Assisted platform to create, execute, and monitor automated workflows — powered by intelligent agents.

---

### 💡 About the Project
**Agentic Workflow Automation Builder** lets users **design and automate workflows visually** using drag-and-drop blocks — no coding required.  
It combines **AI suggestions** with a **multi-agent system** that handles workflow planning, execution, scheduling, and monitoring autonomously.

---

### 🧠 Key Highlights
- 🧩 **No-Code Workflow Builder** – Drag, connect, and deploy workflows visually  
- 🤖 **AI-Powered Suggestions** – Get smart, contextual guidance  
- ⚙️ **Agent-Based Automation** – Planner, Executor, Scheduler, and Alerter agents  
- 📊 **Real-Time Logs** – Live monitoring and alerts on the dashboard  
- 🔐 **Secure Authentication** – JWT-based user and role management  

---

### 🏗️ Tech Stack
**Frontend:** React.js, React Flow, Tailwind CSS  
**Backend:** FastAPI, Celery, Redis, PostgreSQL  
**Realtime:** Server-Sent Events (SSE)  
**Auth:** JWT  

---

### ⚡ Quick Start
```bash
# Clone the repo
git clone https://github.com/ITSKANISHKA/AgenticWorkFlow_Automation_builder.git

# Backend setup
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

# Frontend setup
cd ../frontend
npm install
npm run dev
