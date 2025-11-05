# automation.py
# ------------------------------
# This module handles all background automation
# such as checking workflows and executing steps automatically.

from apscheduler.schedulers.background import BackgroundScheduler
from app.database import SessionLocal
from app.models import Workflow, WorkflowLog
from datetime import datetime
import random

scheduler = BackgroundScheduler()

def execute_workflows():
    """Automatically checks and executes pending workflows"""
    db = SessionLocal()
    try:
        workflows = db.query(Workflow).all()
        for wf in workflows:
            # Simulate automation: randomly mark a workflow step
            step = random.choice(["Start", "Process Data", "Notify", "Complete"])
            log = WorkflowLog(
                workflow_id=wf.id,
                step=step,
                status="completed",
                message=f"Automated step '{step}' executed at {datetime.now()}"
            )
            db.add(log)
            db.commit()
        print(f"[Automation] {len(workflows)} workflows checked at {datetime.now()}")
    except Exception as e:
        print(f"[Automation Error]: {e}")
    finally:
        db.close()

def start_scheduler():
    """Starts the background scheduler"""
    scheduler.add_job(execute_workflows, 'interval', seconds=30)
    scheduler.start()
    print("[Automation] Scheduler started, checking workflows every 30 seconds.")
