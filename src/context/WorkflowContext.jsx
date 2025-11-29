import React, { createContext, useState, useContext } from 'react';

const WorkflowContext = createContext(null);

export const WorkflowProvider = ({ children }) => {
  const [workflows, setWorkflows] = useState([]);
  const [currentWorkflow, setCurrentWorkflow] = useState(null);

  const createWorkflow = (workflow) => {
    const newWorkflow = {
      ...workflow,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'draft'
    };
    setWorkflows(prev => [...prev, newWorkflow]);
    return newWorkflow;
  };

  const updateWorkflow = (id, updates) => {
    setWorkflows(prev =>
      prev.map(wf => wf.id === id ? { ...wf, ...updates } : wf)
    );
  };

  const deleteWorkflow = (id) => {
    setWorkflows(prev => prev.filter(wf => wf.id !== id));
  };

  const executeWorkflow = async (id) => {
    try {
      // Find workflow
      const workflow = workflows.find(wf => wf.id === id);
      if (!workflow) {
        alert('Workflow not found!');
        return;
      }

      // Update status to running
      updateWorkflow(id, { status: 'running', lastRun: new Date().toISOString() });
      
      console.log('🚀 Executing workflow:', workflow.name);
      console.log('📧 Sending emails to recipients...');

      // Call backend API
      const response = await fetch('http://localhost:5000/api/workflows/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ workflow })
      });

      const result = await response.json();

      if (result.success) {
        updateWorkflow(id, { 
          status: 'completed',
          lastExecutionId: result.executionId,
          lastExecutionTime: result.completedAt
        });
        
        console.log('✅ Workflow executed successfully!');
        console.log('📊 Results:', result);
        
        alert(`✅ Workflow Executed Successfully!\n\n${result.logs.map(log => log.message).join('\n')}`);
      } else {
        updateWorkflow(id, { status: 'failed' });
        console.error('❌ Workflow execution failed:', result.error);
        alert(`❌ Workflow Failed!\n\nError: ${result.error}`);
      }
    } catch (error) {
      updateWorkflow(id, { status: 'failed' });
      console.error('❌ Error executing workflow:', error);
      alert(`❌ Error!\n\n${error.message}\n\nMake sure backend server is running on port 5000`);
    }
  };

  return (
    <WorkflowContext.Provider value={{
      workflows,
      currentWorkflow,
      setCurrentWorkflow,
      createWorkflow,
      updateWorkflow,
      deleteWorkflow,
      executeWorkflow
    }}>
      {children}
    </WorkflowContext.Provider>
  );
};

export const useWorkflow = () => {
  const context = useContext(WorkflowContext);
  if (!context) {
    throw new Error('useWorkflow must be used within WorkflowProvider');
  }
  return context;
};
