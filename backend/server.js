import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import EmailAgent from './agents/EmailAgent.js';
import WorkflowEngine from './agents/WorkflowEngine.js';
import SchedulerAgent from './agents/SchedulerAgent.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Agents
const emailAgent = new EmailAgent();
const workflowEngine = new WorkflowEngine(emailAgent);
const schedulerAgent = new SchedulerAgent(workflowEngine);

console.log('🤖 Agents initialized successfully!');

// In-memory storage (replace with database in production)
const workflows = new Map();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Auth Routes
app.post('/api/auth/register', (req, res) => {
  const { email, password, name } = req.body;
  
  // Mock registration - replace with database logic
  res.json({
    success: true,
    user: {
      id: Date.now().toString(),
      email,
      name,
      role: 'staff'
    },
    token: 'mock-jwt-token'
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // Mock login - replace with database logic
  res.json({
    success: true,
    user: {
      id: '1',
      email,
      name: email.split('@')[0],
      role: 'admin'
    },
    token: 'mock-jwt-token'
  });
});

// Workflow Routes
app.get('/api/workflows', (req, res) => {
  const workflowList = Array.from(workflows.values());
  res.json({
    success: true,
    workflows: workflowList
  });
});

app.post('/api/workflows', (req, res) => {
  const { name, description, blocks } = req.body;
  
  const workflow = {
    id: Date.now().toString(),
    name,
    description,
    blocks: blocks || [],
    createdAt: new Date().toISOString(),
    status: 'draft'
  };

  workflows.set(workflow.id, workflow);

  res.json({
    success: true,
    workflow: workflow
  });
});

app.get('/api/workflows/:id', (req, res) => {
  const { id } = req.params;
  const workflow = workflows.get(id);

  if (!workflow) {
    return res.status(404).json({
      success: false,
      message: 'Workflow not found'
    });
  }

  res.json({
    success: true,
    workflow: workflow
  });
});

app.put('/api/workflows/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, blocks, status } = req.body;

  const workflow = workflows.get(id);

  if (!workflow) {
    return res.status(404).json({
      success: false,
      message: 'Workflow not found'
    });
  }

  const updatedWorkflow = {
    ...workflow,
    name: name || workflow.name,
    description: description || workflow.description,
    blocks: blocks || workflow.blocks,
    status: status || workflow.status,
    updatedAt: new Date().toISOString()
  };

  workflows.set(id, updatedWorkflow);

  res.json({
    success: true,
    workflow: updatedWorkflow
  });
});

app.delete('/api/workflows/:id', (req, res) => {
  const { id } = req.params;
  
  if (!workflows.has(id)) {
    return res.status(404).json({
      success: false,
      message: 'Workflow not found'
    });
  }

  workflows.delete(id);

  res.json({
    success: true,
    message: 'Workflow deleted successfully'
  });
});

// Execute Workflow - Generic endpoint (accepts workflow in body)
app.post('/api/workflows/execute', async (req, res) => {
  const { workflow } = req.body;

  if (!workflow) {
    return res.status(400).json({
      success: false,
      message: 'Workflow data is required'
    });
  }

  try {
    console.log('\n🚀 ===== WORKFLOW EXECUTION REQUEST =====');
    console.log(`   Workflow: ${workflow.name}`);
    console.log(`   Blocks: ${workflow.blocks?.length || 0}`);
    console.log('==========================================\n');

    // Execute workflow using WorkflowEngine
    const result = await workflowEngine.executeWorkflow(workflow);

    console.log('\n✅ ===== EXECUTION COMPLETE =====');
    console.log(`   Success: ${result.success}`);
    console.log(`   Execution ID: ${result.executionId}`);
    console.log('==================================\n');

    res.json({
      success: result.success,
      executionId: result.executionId,
      completedAt: result.completedAt,
      message: result.success ? 'Workflow executed successfully' : 'Workflow execution failed',
      logs: result.logs
    });
  } catch (error) {
    console.error('\n❌ ===== EXECUTION FAILED =====');
    console.error(`   Error: ${error.message}`);
    console.error('================================\n');

    res.status(500).json({
      success: false,
      message: 'Workflow execution failed',
      error: error.message
    });
  }
});

// Execute Workflow by ID (REAL EXECUTION!)
app.post('/api/workflows/:id/execute', async (req, res) => {
  const { id } = req.params;
  const workflow = workflows.get(id);

  if (!workflow) {
    return res.status(404).json({
      success: false,
      message: 'Workflow not found'
    });
  }

  try {
    // Execute workflow using WorkflowEngine
    const result = await workflowEngine.executeWorkflow(workflow);

    // Update workflow status
    workflow.status = result.success ? 'completed' : 'failed';
    workflow.lastRun = new Date().toISOString();
    workflows.set(id, workflow);

    res.json({
      success: true,
      executionId: result.executionId,
      status: result.success ? 'completed' : 'failed',
      message: result.success ? 'Workflow executed successfully' : 'Workflow execution failed',
      logs: result.logs,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Workflow execution failed',
      error: error.message
    });
  }
});

// Schedule Workflow
app.post('/api/workflows/:id/schedule', (req, res) => {
  const { id } = req.params;
  const { schedule } = req.body;

  const workflow = workflows.get(id);

  if (!workflow) {
    return res.status(404).json({
      success: false,
      message: 'Workflow not found'
    });
  }

  const scheduleResult = schedulerAgent.scheduleWorkflow(workflow, schedule);

  res.json({
    success: true,
    schedule: scheduleResult
  });
});

// Get All Schedules
app.get('/api/schedules', (req, res) => {
  const schedules = schedulerAgent.getAllSchedules();
  res.json({
    success: true,
    schedules: schedules
  });
});

// Stop Schedule
app.delete('/api/schedules/:jobId', (req, res) => {
  const { jobId } = req.params;
  const result = schedulerAgent.stopSchedule(jobId);
  res.json(result);
});

// Workflow Logs Route
app.get('/api/workflows/:id/logs', (req, res) => {
  const { id } = req.params;
  const allLogs = workflowEngine.getAllExecutionLogs();
  
  const workflowLogs = allLogs
    .filter(entry => entry.logs.some(log => log.workflowId === id))
    .flatMap(entry => entry.logs);

  res.json({
    success: true,
    logs: workflowLogs
  });
});

// Get Execution Logs by Execution ID
app.get('/api/executions/:executionId/logs', (req, res) => {
  const { executionId } = req.params;
  const logs = workflowEngine.getExecutionLogs(executionId);

  res.json({
    success: true,
    executionId: executionId,
    logs: logs
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
