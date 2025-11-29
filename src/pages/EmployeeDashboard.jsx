import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWorkflow } from '../context/WorkflowContext';
import { Plus, PlayCircle, Trash2, Eye, Clock, CheckCircle, Mail } from 'lucide-react';
import RecipientManager from '../components/RecipientManager';

const EmployeeDashboard = () => {
  const { user, logout } = useAuth();
  const { workflows, deleteWorkflow, executeWorkflow } = useWorkflow();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Employee Dashboard</h1>
            <p className="text-gray-600">Welcome, {user?.name}! 👨‍💼</p>
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Employee Info Card */}
        <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-2">👨‍💼 Employee Portal</h2>
          <p className="text-green-100">Create and manage workflow automations</p>
          <div className="mt-4 flex gap-4">
            <div className="bg-white/20 backdrop-blur rounded-lg px-4 py-2">
              <p className="text-sm opacity-80">Your Workflows</p>
              <p className="text-2xl font-bold">{workflows.length}</p>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-lg px-4 py-2">
              <p className="text-sm opacity-80">Running</p>
              <p className="text-2xl font-bold">
                {workflows.filter(w => w.status === 'running').length}
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm font-medium">Total Workflows</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">{workflows.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm font-medium">Running</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              {workflows.filter(w => w.status === 'running').length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm font-medium">Completed</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {workflows.filter(w => w.status === 'completed').length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm font-medium">Draft</h3>
            <p className="text-3xl font-bold text-gray-600 mt-2">
              {workflows.filter(w => w.status === 'draft').length}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => navigate('/builder')}
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            <Plus size={20} />
            Create New Workflow
          </button>
          <button
            onClick={() => navigate('/templates')}
            className="flex items-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 border border-gray-300 transition-colors font-medium"
          >
            Browse Templates
          </button>
        </div>

        {/* Recipient Manager */}
        <div className="mb-6">
          <RecipientManager />
        </div>

        {/* Workflows List */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Your Workflows</h2>
          </div>

          {workflows.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-500 text-lg">No workflows yet</p>
              <p className="text-gray-400 mt-2">Create your first workflow to get started</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {workflows.map((workflow) => (
                <div key={workflow.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        {workflow.status === 'running' ? (
                          <Clock className="text-blue-500" size={20} />
                        ) : (
                          <CheckCircle className="text-green-500" size={20} />
                        )}
                        <h3 className="text-lg font-semibold text-gray-900">{workflow.name}</h3>
                        <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
                          {workflow.status}
                        </span>
                      </div>
                      <p className="text-gray-600 mt-1">{workflow.description || 'No description'}</p>
                      <p className="text-sm text-gray-400 mt-2">
                        Created: {new Date(workflow.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/builder/${workflow.id}`)}
                        className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                        title="Edit"
                      >
                        <Eye size={20} />
                      </button>
                      <button
                        onClick={() => executeWorkflow(workflow.id)}
                        disabled={workflow.status === 'running'}
                        className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded transition-colors disabled:opacity-50"
                        title="Run"
                      >
                        <PlayCircle size={20} />
                      </button>
                      <button
                        onClick={() => deleteWorkflow(workflow.id)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default EmployeeDashboard;
