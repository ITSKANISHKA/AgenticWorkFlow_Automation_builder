import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWorkflow } from '../context/WorkflowContext';
import { Users, TrendingUp, Mail, Clock, CheckCircle, AlertCircle, BarChart3 } from 'lucide-react';

const ManagerDashboard = () => {
  const { user, logout } = useAuth();
  const { workflows } = useWorkflow();
  const navigate = useNavigate();

  // Mock data for manager view
  const teamMembers = [
    { id: 1, name: 'Kanishka', role: 'Employee', workflows: 5, active: 3 },
    { id: 2, name: 'Anushka', role: 'Employee', workflows: 4, active: 2 },
    { id: 3, name: 'Utkarsh', role: 'Employee', workflows: 6, active: 4 },
  ];

  const recentActivity = [
    { user: 'Kanishka', action: 'Created workflow', workflow: 'Email Automation', time: '2 hours ago' },
    { user: 'Anushka', action: 'Executed workflow', workflow: 'Customer Onboarding', time: '4 hours ago' },
    { user: 'Utkarsh', action: 'Modified workflow', workflow: 'Daily Reports', time: '5 hours ago' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Manager Dashboard</h1>
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
        {/* Manager Info Card */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-2">👨‍💼 Manager Portal</h2>
          <p className="text-purple-100">Oversee team workflows and performance</p>
          <div className="mt-4 flex gap-4">
            <div className="bg-white/20 backdrop-blur rounded-lg px-4 py-2">
              <p className="text-sm opacity-80">Team Members</p>
              <p className="text-2xl font-bold">{teamMembers.length}</p>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-lg px-4 py-2">
              <p className="text-sm opacity-80">Total Workflows</p>
              <p className="text-2xl font-bold">
                {teamMembers.reduce((sum, member) => sum + member.workflows, 0)}
              </p>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-lg px-4 py-2">
              <p className="text-sm opacity-80">Active Now</p>
              <p className="text-2xl font-bold">
                {teamMembers.reduce((sum, member) => sum + member.active, 0)}
              </p>
            </div>
          </div>
        </div>

        {/* Analytics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-500 text-sm font-medium">Total Workflows</h3>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {teamMembers.reduce((sum, m) => sum + m.workflows, 0)}
                </p>
              </div>
              <BarChart3 className="text-purple-500" size={40} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-500 text-sm font-medium">Active Workflows</h3>
                <p className="text-3xl font-bold text-blue-600 mt-2">
                  {teamMembers.reduce((sum, m) => sum + m.active, 0)}
                </p>
              </div>
              <Clock className="text-blue-500" size={40} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-500 text-sm font-medium">Success Rate</h3>
                <p className="text-3xl font-bold text-green-600 mt-2">94%</p>
              </div>
              <CheckCircle className="text-green-500" size={40} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-500 text-sm font-medium">Team Size</h3>
                <p className="text-3xl font-bold text-purple-600 mt-2">{teamMembers.length}</p>
              </div>
              <Users className="text-purple-500" size={40} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Team Members Overview */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Users size={24} />
                Team Members
              </h2>
            </div>
            <div className="divide-y divide-gray-200">
              {teamMembers.map((member) => (
                <div key={member.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{member.name}</h3>
                      <p className="text-sm text-gray-600">{member.role}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Workflows: {member.workflows}</p>
                      <p className="text-sm text-green-600">Active: {member.active}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <TrendingUp size={24} />
                Recent Activity
              </h2>
            </div>
            <div className="divide-y divide-gray-200">
              {recentActivity.map((activity, idx) => (
                <div key={idx} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <AlertCircle size={16} className="text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">
                        <span className="font-semibold">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-sm text-gray-600">{activity.workflow}</p>
                      <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="mt-6 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">📊 Performance Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-gray-600 text-sm mb-2">Workflow Completion Rate</p>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div className="bg-green-500 h-4 rounded-full" style={{ width: '94%' }}></div>
              </div>
              <p className="text-sm text-gray-500 mt-1">94% Success Rate</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm mb-2">Team Productivity</p>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div className="bg-blue-500 h-4 rounded-full" style={{ width: '87%' }}></div>
              </div>
              <p className="text-sm text-gray-500 mt-1">87% Efficiency</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm mb-2">Email Deliverability</p>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div className="bg-purple-500 h-4 rounded-full" style={{ width: '98%' }}></div>
              </div>
              <p className="text-sm text-gray-500 mt-1">98% Delivered</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManagerDashboard;
