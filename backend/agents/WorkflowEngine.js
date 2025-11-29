// Workflow Execution Engine
class WorkflowEngine {
  constructor(emailAgent, schedulerAgent) {
    this.emailAgent = emailAgent;
    this.schedulerAgent = schedulerAgent;
    this.executionLogs = new Map();
  }

  async executeWorkflow(workflow) {
    const executionId = Date.now().toString();
    const logs = [];

    console.log(`🚀 Starting workflow execution: ${workflow.name} (ID: ${executionId})`);

    try {
      // Process each block in sequence
      for (const block of workflow.blocks) {
        const blockResult = await this.executeBlock(block, workflow);
        
        logs.push({
          id: Date.now().toString(),
          workflowId: workflow.id,
          executionId: executionId,
          blockId: block.id,
          blockType: block.type,
          timestamp: new Date().toISOString(),
          status: blockResult.success ? 'success' : 'failed',
          message: blockResult.message,
          data: blockResult.data
        });

        console.log(`  ✓ Block executed: ${block.type} - ${blockResult.message}`);

        // If block fails and it's not optional, stop execution
        if (!blockResult.success && !block.optional) {
          throw new Error(`Block ${block.type} failed: ${blockResult.message}`);
        }
      }

      // Store logs
      this.executionLogs.set(executionId, logs);

      return {
        success: true,
        executionId: executionId,
        workflow: workflow,
        logs: logs,
        completedAt: new Date().toISOString()
      };

    } catch (error) {
      console.error('❌ Workflow execution failed:', error);
      
      logs.push({
        id: Date.now().toString(),
        workflowId: workflow.id,
        executionId: executionId,
        timestamp: new Date().toISOString(),
        status: 'failed',
        message: error.message
      });

      this.executionLogs.set(executionId, logs);

      return {
        success: false,
        executionId: executionId,
        workflow: workflow,
        error: error.message,
        logs: logs,
        failedAt: new Date().toISOString()
      };
    }
  }

  async executeBlock(block, workflow) {
    switch (block.type) {
      case 'trigger':
        return this.executeTrigger(block);
      
      case 'email':
        return this.executeEmail(block);
      
      case 'condition':
        return this.executeCondition(block);
      
      case 'action':
        return this.executeAction(block);
      
      case 'database':
        return this.executeDatabase(block);
      
      case 'api':
        return this.executeAPI(block);
      
      default:
        return {
          success: false,
          message: `Unknown block type: ${block.type}`
        };
    }
  }

  async executeTrigger(block) {
    // Trigger just marks the start
    return {
      success: true,
      message: `Workflow triggered: ${block.config?.name || 'Manual Trigger'}`,
      data: { triggeredAt: new Date().toISOString() }
    };
  }

  async executeEmail(block) {
    // Send email using EmailAgent
    const config = block.config || {};
    
    // Handle multiple recipients (comma-separated)
    let recipients = config.to || config.recipient || 'test@example.com';
    
    // Convert to array if comma-separated string
    if (typeof recipients === 'string') {
      recipients = recipients.split(',').map(email => email.trim()).filter(email => email);
    }

    const emailData = {
      subject: config.subject || 'Workflow Notification',
      body: config.body || config.message || 'This is an automated message from FlowForge.'
    };

    // Send to all recipients
    const results = [];
    for (const recipient of recipients) {
      const result = await this.emailAgent.sendEmail({
        to: recipient,
        subject: emailData.subject,
        body: emailData.body
      });
      results.push(result);
    }

    const successCount = results.filter(r => r.success).length;
    const failCount = results.length - successCount;

    return {
      success: successCount > 0,
      message: `Sent ${successCount}/${results.length} emails successfully` + 
               (failCount > 0 ? ` (${failCount} failed)` : ''),
      data: {
        total: results.length,
        success: successCount,
        failed: failCount,
        recipients: recipients,
        results: results
      }
    };
  }

  async executeCondition(block) {
    // Simple condition evaluation
    const config = block.config || {};
    const condition = config.condition || true;

    return {
      success: true,
      message: `Condition evaluated: ${condition}`,
      data: { result: condition }
    };
  }

  async executeAction(block) {
    // Generic action execution
    const config = block.config || {};
    
    return {
      success: true,
      message: `Action executed: ${config.name || 'Generic Action'}`,
      data: { actionType: config.actionType || 'generic' }
    };
  }

  async executeDatabase(block) {
    // Mock database operation
    const config = block.config || {};
    
    return {
      success: true,
      message: `Database operation: ${config.operation || 'query'}`,
      data: { operation: config.operation, mockData: [] }
    };
  }

  async executeAPI(block) {
    // Mock API call
    const config = block.config || {};
    
    return {
      success: true,
      message: `API called: ${config.url || 'mock-api'}`,
      data: { endpoint: config.url, method: config.method || 'GET' }
    };
  }

  getExecutionLogs(executionId) {
    return this.executionLogs.get(executionId) || [];
  }

  getAllExecutionLogs() {
    return Array.from(this.executionLogs.entries()).map(([id, logs]) => ({
      executionId: id,
      logs: logs
    }));
  }
}

export default WorkflowEngine;
