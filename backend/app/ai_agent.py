# ai_agent.py
# ------------------
# This simple AI agent suggests the next step in a workflow.
# Later, we can connect this to OpenAI or any ML model.

def suggest_next_step(current_step: str):
    # A simple dictionary of step suggestions
    suggestions = {
        "Start": "Send Email",
        "Send Email": "Wait for Approval",
        "Wait for Approval": "Notify Team",
        "Notify Team": "End",
    }

    # If no known step, return 'End' as default
    return suggestions.get(current_step, "End")
