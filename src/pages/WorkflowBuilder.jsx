import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useWorkflow } from '../context/WorkflowContext';
import { Save, Play, ArrowLeft, Mail, Database, MessageSquare, Clock, GitBranch, CheckSquare } from 'lucide-react';

// Available workflow blocks
const BLOCK_TYPES = [
  { id: 'trigger', name: 'Trigger', icon: Clock, color: 'bg-blue-500', description: 'Start workflow' },
  { id: 'condition', name: 'Condition', icon: GitBranch, color: 'bg-yellow-500', description: 'If/Else logic' },
  { id: 'action', name: 'Action', icon: CheckSquare, color: 'bg-green-500', description: 'Perform task' },
  { id: 'email', name: 'Send Email', icon: Mail, color: 'bg-purple-500', description: 'Send email notification' },
  { id: 'database', name: 'Database', icon: Database, color: 'bg-red-500', description: 'Database operation' },
  { id: 'api', name: 'API Call', icon: MessageSquare, color: 'bg-indigo-500', description: 'Call external API' },
];

// Sortable Block Component
const SortableBlock = ({ block, onRemove, onEdit }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const blockType = BLOCK_TYPES.find(t => t.id === block.type);
  const Icon = blockType?.icon || CheckSquare;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white border-2 border-gray-200 rounded-lg p-4 mb-3 cursor-move hover:border-indigo-400 transition-colors"
    >
      <div className="flex items-center gap-3">
        <div className={`${blockType?.color} p-2 rounded`}>
          <Icon className="text-white" size={20} />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">{blockType?.name}</h4>
          <p className="text-sm text-gray-600">{block.config?.name || 'Unnamed block'}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(block)}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded"
          >
            Edit
          </button>
          <button
            onClick={() => onRemove(block.id)}
            className="px-3 py-1 text-sm bg-red-100 text-red-700 hover:bg-red-200 rounded"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

const WorkflowBuilder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { createWorkflow, updateWorkflow, workflows } = useWorkflow();

  const existingWorkflow = workflows.find(w => w.id === id);

  const [workflowName, setWorkflowName] = useState(existingWorkflow?.name || 'New Workflow');
  const [workflowDescription, setWorkflowDescription] = useState(existingWorkflow?.description || '');
  const [blocks, setBlocks] = useState(existingWorkflow?.blocks || []);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [showConfigModal, setShowConfigModal] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setBlocks((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        const newItems = [...items];
        const [removed] = newItems.splice(oldIndex, 1);
        newItems.splice(newIndex, 0, removed);

        return newItems;
      });
    }
  };

  const addBlock = (type) => {
    const newBlock = {
      id: Date.now().toString(),
      type: type,
      config: {
        name: `${BLOCK_TYPES.find(t => t.id === type)?.name} ${blocks.length + 1}`,
      },
    };
    setBlocks([...blocks, newBlock]);
  };

  const removeBlock = (id) => {
    setBlocks(blocks.filter(b => b.id !== id));
  };

  const editBlock = (block) => {
    setSelectedBlock(block);
    setShowConfigModal(true);
  };

  const updateBlockConfig = (blockId, config) => {
    setBlocks(blocks.map(b => 
      b.id === blockId ? { ...b, config: { ...b.config, ...config } } : b
    ));
    setShowConfigModal(false);
    setSelectedBlock(null);
  };

  const saveWorkflow = () => {
    const workflowData = {
      name: workflowName,
      description: workflowDescription,
      blocks: blocks,
    };

    if (id) {
      updateWorkflow(id, workflowData);
    } else {
      createWorkflow(workflowData);
    }

    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="p-2 hover:bg-gray-100 rounded transition-colors"
              >
                <ArrowLeft size={24} />
              </button>
              <div>
                <input
                  type="text"
                  value={workflowName}
                  onChange={(e) => setWorkflowName(e.target.value)}
                  className="text-2xl font-bold text-gray-900 border-none focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded px-2"
                />
                <input
                  type="text"
                  value={workflowDescription}
                  onChange={(e) => setWorkflowDescription(e.target.value)}
                  placeholder="Add description..."
                  className="block text-gray-600 border-none focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded px-2 mt-1"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={saveWorkflow}
                className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Save size={20} />
                Save
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Block Palette */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Blocks</h3>
              <div className="space-y-2">
                {BLOCK_TYPES.map((block) => {
                  const Icon = block.icon;
                  return (
                    <button
                      key={block.id}
                      onClick={() => addBlock(block.id)}
                      className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left"
                    >
                      <div className={`${block.color} p-2 rounded`}>
                        <Icon className="text-white" size={18} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{block.name}</p>
                        <p className="text-xs text-gray-600">{block.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Canvas */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow p-6 min-h-[600px]">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Workflow Canvas</h3>

              {blocks.length === 0 ? (
                <div className="flex items-center justify-center h-96 border-2 border-dashed border-gray-300 rounded-lg">
                  <div className="text-center">
                    <p className="text-gray-500 text-lg">No blocks added yet</p>
                    <p className="text-gray-400 mt-2">Click on a block from the left to add it</p>
                  </div>
                </div>
              ) : (
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                  <SortableContext items={blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
                    {blocks.map((block) => (
                      <SortableBlock
                        key={block.id}
                        block={block}
                        onRemove={removeBlock}
                        onEdit={editBlock}
                      />
                    ))}
                  </SortableContext>
                </DndContext>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Email Configuration Modal */}
      {showConfigModal && selectedBlock?.type === 'email' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Configure Email Block</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Recipients</label>
                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() => {
                      const stored = localStorage.getItem('selected_recipients');
                      const storedIds = localStorage.getItem('selected_recipient_ids');
                      
                      if (stored && storedIds) {
                        const emails = JSON.parse(stored);
                        const ids = JSON.parse(storedIds);
                        
                        if (emails.length > 0 && ids.length > 0) {
                          document.getElementById('email-to').value = emails.join(', ');
                          alert(`✅ Loaded ${emails.length} recipient(s):\n${emails.join('\n')}`);
                        } else {
                          alert('⚠️ No recipients selected!\n\nSteps:\n1. Go to Dashboard\n2. Add emails to "Email Recipients"\n3. Click on emails to select them (blue checkmark)\n4. Come back here and click this button again');
                        }
                      } else {
                        alert('⚠️ No recipients found!\n\nPlease:\n1. Go to Dashboard\n2. Scroll to "Email Recipients" section\n3. Add email addresses\n4. Select them (click to make blue)\n5. Return here and try again');
                      }
                    }}
                    className="px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200"
                  >
                    📥 Load Selected Recipients
                  </button>
                  <span className="text-xs text-gray-500 flex items-center">
                    (Or enter manually below)
                  </span>
                </div>
                <textarea
                  defaultValue={selectedBlock.config?.to || ''}
                  placeholder="email1@example.com, email2@example.com"
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  id="email-to"
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">Separate multiple emails with commas</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  defaultValue={selectedBlock.config?.subject || ''}
                  placeholder="Email subject..."
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  id="email-subject"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Body</label>
                <textarea
                  defaultValue={selectedBlock.config?.body || ''}
                  placeholder="Email content..."
                  rows="5"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  id="email-body"
                ></textarea>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    const to = document.getElementById('email-to').value;
                    const subject = document.getElementById('email-subject').value;
                    const body = document.getElementById('email-body').value;
                    updateBlockConfig(selectedBlock.id, { to, subject, body, name: `Email to ${to}` });
                  }}
                  className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setShowConfigModal(false);
                    setSelectedBlock(null);
                  }}
                  className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Other Block Types Configuration Modal */}
      {showConfigModal && selectedBlock?.type !== 'email' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Configure {BLOCK_TYPES.find(t => t.id === selectedBlock.type)?.name}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Block Name</label>
                <input
                  type="text"
                  defaultValue={selectedBlock.config?.name || ''}
                  placeholder="Enter block name..."
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  id="block-name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Configuration</label>
                <textarea
                  defaultValue={JSON.stringify(selectedBlock.config || {}, null, 2)}
                  placeholder='{"key": "value"}'
                  rows="5"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
                  id="block-config"
                ></textarea>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    const name = document.getElementById('block-name').value;
                    try {
                      const config = JSON.parse(document.getElementById('block-config').value);
                      updateBlockConfig(selectedBlock.id, { ...config, name });
                    } catch (e) {
                      alert('Invalid JSON configuration');
                    }
                  }}
                  className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setShowConfigModal(false);
                    setSelectedBlock(null);
                  }}
                  className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkflowBuilder;
