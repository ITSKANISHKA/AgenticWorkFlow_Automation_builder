import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkflow } from '../context/WorkflowContext';
import { ArrowLeft, Mail, Users, TrendingUp, FileText, Clock, Database } from 'lucide-react';

const TEMPLATES = [
  {
    id: 'email-automation',
    name: 'Email Automation',
    description: 'Automatically send emails based on triggers',
    icon: Mail,
    category: 'Marketing',
    blocks: [
      { id: '1', type: 'trigger', config: { name: 'Schedule Trigger' } },
      { id: '2', type: 'database', config: { name: 'Fetch Recipients' } },
      { id: '3', type: 'email', config: { name: 'Send Email' } },
    ],
  },
  {
    id: 'customer-onboarding',
    name: 'Customer Onboarding',
    description: 'Welcome new customers with automated messages',
    icon: Users,
    category: 'Customer Service',
    blocks: [
      { id: '1', type: 'trigger', config: { name: 'New User Signup' } },
      { id: '2', type: 'email', config: { name: 'Send Welcome Email' } },
      { id: '3', type: 'database', config: { name: 'Create User Record' } },
      { id: '4', type: 'api', config: { name: 'Notify Sales Team' } },
    ],
  },
  {
    id: 'sales-report',
    name: 'Daily Sales Report',
    description: 'Generate and send daily sales reports',
    icon: TrendingUp,
    category: 'Sales',
    blocks: [
      { id: '1', type: 'trigger', config: { name: 'Daily at 6 PM' } },
      { id: '2', type: 'database', config: { name: 'Fetch Sales Data' } },
      { id: '3', type: 'action', config: { name: 'Generate Report' } },
      { id: '4', type: 'email', config: { name: 'Send to Management' } },
    ],
  },
  {
    id: 'approval-workflow',
    name: 'Approval Workflow',
    description: 'Route requests through approval process',
    icon: FileText,
    category: 'HR',
    blocks: [
      { id: '1', type: 'trigger', config: { name: 'New Request' } },
      { id: '2', type: 'condition', config: { name: 'Check Amount' } },
      { id: '3', type: 'email', config: { name: 'Request Approval' } },
      { id: '4', type: 'action', config: { name: 'Update Status' } },
    ],
  },
  {
    id: 'data-backup',
    name: 'Automated Data Backup',
    description: 'Backup critical data on schedule',
    icon: Database,
    category: 'Operations',
    blocks: [
      { id: '1', type: 'trigger', config: { name: 'Daily at Midnight' } },
      { id: '2', type: 'database', config: { name: 'Export Data' } },
      { id: '3', type: 'api', config: { name: 'Upload to Cloud' } },
      { id: '4', type: 'email', config: { name: 'Send Confirmation' } },
    ],
  },
  {
    id: 'task-reminder',
    name: 'Task Reminder',
    description: 'Send reminders for pending tasks',
    icon: Clock,
    category: 'Productivity',
    blocks: [
      { id: '1', type: 'trigger', config: { name: 'Hourly Check' } },
      { id: '2', type: 'database', config: { name: 'Fetch Pending Tasks' } },
      { id: '3', type: 'condition', config: { name: 'Check Due Date' } },
      { id: '4', type: 'email', config: { name: 'Send Reminder' } },
    ],
  },
];

const Templates = () => {
  const navigate = useNavigate();
  const { createWorkflow } = useWorkflow();

  const useTemplate = (template) => {
    const workflow = createWorkflow({
      name: template.name,
      description: template.description,
      blocks: template.blocks,
    });
    navigate(`/builder/${workflow.id}`);
  };

  const getCategoryColor = (category) => {
    const colors = {
      Marketing: 'bg-purple-100 text-purple-700',
      'Customer Service': 'bg-blue-100 text-blue-700',
      Sales: 'bg-green-100 text-green-700',
      HR: 'bg-yellow-100 text-yellow-700',
      Operations: 'bg-red-100 text-red-700',
      Productivity: 'bg-indigo-100 text-indigo-700',
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Workflow Templates</h1>
              <p className="text-gray-600">Start with a pre-built template</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEMPLATES.map((template) => {
            const Icon = template.icon;
            return (
              <div
                key={template.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-indigo-100 p-3 rounded-lg">
                        <Icon className="text-indigo-600" size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{template.name}</h3>
                        <span className={`inline-block px-2 py-1 rounded text-xs font-medium mt-1 ${getCategoryColor(template.category)}`}>
                          {template.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">{template.description}</p>

                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">Includes {template.blocks.length} blocks:</p>
                    <div className="flex flex-wrap gap-1">
                      {template.blocks.map((block) => (
                        <span
                          key={block.id}
                          className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                        >
                          {block.config.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => useTemplate(template)}
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                  >
                    Use Template
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Template */}
        <div className="mt-8 bg-white rounded-lg shadow p-6 text-center">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Don't see what you need?</h3>
          <p className="text-gray-600 mb-4">Start from scratch and build your custom workflow</p>
          <button
            onClick={() => navigate('/builder')}
            className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            Create Custom Workflow
          </button>
        </div>
      </main>
    </div>
  );
};

export default Templates;
