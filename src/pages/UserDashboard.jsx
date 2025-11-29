import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PlayCircle, Eye, Clock, CheckCircle } from 'lucide-react';

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Mock user workflows
  const userWorkflows = [
    { id: '1', name: 'Personal Email Reminder', status: 'completed', createdAt: new Date() },
    { id: '2', name: 'Daily Task Automation', status: 'running', createdAt: new Date() },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">User Dashboard</h1>
            <p className="text-gray-600">Welcome, {user?.name}! 👤</p>
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
        {/* User Info Card */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-2">👤 User Portal</h2>
          <p className="text-blue-100">View and manage your personal workflows</p>
          <div className="mt-4 flex gap-4">
            <div className="bg-white/20 backdrop-blur rounded-lg px-4 py-2">
              <p className="text-sm opacity-80">Your Workflows</p>
              <p className="text-2xl font-bold">{userWorkflows.length}</p>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-lg px-4 py-2">
              <p className="text-sm opacity-80">Running</p>
              <p className="text-2xl font-bold">
                {userWorkflows.filter(w => w.status === 'running').length}
              </p>
            </div>
          </div>
        </div>

        {/* Access Limitations Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <h3 className="text-yellow-800 font-semibold flex items-center gap-2">
            ℹ️ User Access Level
          </h3>
          <p className="text-yellow-700 text-sm mt-1">
            As a User, you can view your personal workflows but cannot create new ones. 
            Contact your manager for Employee access to create workflows.
          </p>
        </div>

        {/* Your Workflows */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Your Workflows</h2>
          </div>

          <div className="divide-y divide-gray-200">
            {userWorkflows.map((workflow) => (
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
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        workflow.status === 'running' 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {workflow.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 mt-2">
                      Created: {workflow.createdAt.toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                      title="View Details"
                    >
                      <Eye size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm font-medium">Total Executions</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">24</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm font-medium">Success Rate</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">96%</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm font-medium">Last Activity</h3>
            <p className="text-lg font-semibold text-gray-900 mt-2">2 hours ago</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
