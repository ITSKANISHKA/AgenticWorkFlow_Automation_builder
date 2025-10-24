import { useState } from 'react';
import { WorkflowProvider } from './context/WorkflowContext';
import WorkflowList from './components/WorkflowList';
import BlockTemplatesSidebar from './components/BlockTemplatesSidebar';
import WorkflowBuilder from './components/WorkflowBuilder';
import ExecutionMonitor from './components/ExecutionMonitor';
import AISuggestions from './components/AISuggestions';
import { Workflow, Activity, Sparkles } from 'lucide-react';

type Tab = 'builder' | 'executions' | 'suggestions';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('builder');

  return (
    <WorkflowProvider>
      <div className="h-screen flex flex-col bg-slate-50">
        <header className="bg-white border-b border-slate-200 shadow-sm">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Workflow size={24} className="text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-800">FlowForge</h1>
                  <p className="text-sm text-slate-500">AI-Powered Workflow Automation</p>
                </div>
              </div>

              <nav className="flex gap-2">
                <button
                  onClick={() => setActiveTab('builder')}
                  className={`px-4 py-2 rounded-md font-medium text-sm flex items-center gap-2 transition-colors ${
                    activeTab === 'builder'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Workflow size={16} />
                  Builder
                </button>
                <button
                  onClick={() => setActiveTab('executions')}
                  className={`px-4 py-2 rounded-md font-medium text-sm flex items-center gap-2 transition-colors ${
                    activeTab === 'executions'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Activity size={16} />
                  Executions
                </button>
                <button
                  onClick={() => setActiveTab('suggestions')}
                  className={`px-4 py-2 rounded-md font-medium text-sm flex items-center gap-2 transition-colors ${
                    activeTab === 'suggestions'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Sparkles size={16} />
                  AI Suggestions
                </button>
              </nav>
            </div>
          </div>
        </header>

        <main className="flex-1 flex overflow-hidden">
          <WorkflowList />

          {activeTab === 'builder' && (
            <>
              <BlockTemplatesSidebar />
              <div className="flex-1 overflow-hidden">
                <WorkflowBuilder />
              </div>
            </>
          )}

          {activeTab === 'executions' && (
            <div className="flex-1 overflow-hidden">
              <ExecutionMonitor />
            </div>
          )}

          {activeTab === 'suggestions' && (
            <div className="flex-1 overflow-hidden">
              <AISuggestions />
            </div>
          )}
        </main>
      </div>
    </WorkflowProvider>
  );
}

export default App;
