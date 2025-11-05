from fastapi import FastAPI
from app.database import Base, engine
from app import models
from app.routes import users, workflows, logs
from app.automation import start_scheduler  # 👈 NEW import

# Create all tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Agentic Workflow Automation Backend")

# Include all API routes
app.include_router(users.router)
app.include_router(workflows.router)
app.include_router(logs.router)

# Start background automation
start_scheduler()  # 👈 NEW line

@app.get("/")
def home():
    return {"message": "Automation backend is running 🚀"}
