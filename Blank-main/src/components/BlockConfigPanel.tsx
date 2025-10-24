import React, { useState } from 'react';
import { X } from 'lucide-react';
import { WorkflowBlock } from '../types/workflow';

interface BlockConfigPanelProps {
  block: WorkflowBlock;
  onClose: () => void;
  onUpdate: (updates: Partial<WorkflowBlock>) => void;
}

const BlockConfigPanel: React.FC<BlockConfigPanelProps> = ({ block, onClose, onUpdate }) => {
  const [label, setLabel] = useState(block.label || '');
  const [config, setConfig] = useState(block.config);

  const handleConfigChange = (key: string, value: unknown) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onUpdate({ label, config });
  };

  return (
    <div className="absolute top-0 right-0 w-80 h-full bg-white shadow-xl border-l border-slate-200 z-10 overflow-y-auto">
      <div className="sticky top-0 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <h3 className="font-semibold text-slate-800">Configure Block</h3>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
          <X size={20} />
        </button>
      </div>

      <div className="p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Label</label>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Block label"
            className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="border-t border-slate-200 pt-4">
          <h4 className="text-sm font-medium text-slate-700 mb-3">Block Configuration</h4>

          {block.blockType === 'api_call' && (
            <>
              <div className="mb-3">
                <label className="block text-sm font-medium text-slate-700 mb-1">Method</label>
                <select
                  value={config.method as string || 'GET'}
                  onChange={(e) => handleConfigChange('method', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="PUT">PUT</option>
                  <option value="DELETE">DELETE</option>
                  <option value="PATCH">PATCH</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-slate-700 mb-1">URL</label>
                <input
                  type="text"
                  value={config.url as string || ''}
                  onChange={(e) => handleConfigChange('url', e.target.value)}
                  placeholder="https://api.example.com/endpoint"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </>
          )}

          {block.blockType === 'notification' && (
            <>
              <div className="mb-3">
                <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
                <select
                  value={config.type as string || 'email'}
                  onChange={(e) => handleConfigChange('type', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="email">Email</option>
                  <option value="slack">Slack</option>
                  <option value="sms">SMS</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-slate-700 mb-1">To</label>
                <input
                  type="text"
                  value={config.to as string || ''}
                  onChange={(e) => handleConfigChange('to', e.target.value)}
                  placeholder="recipient@example.com"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                <textarea
                  value={config.message as string || ''}
                  onChange={(e) => handleConfigChange('message', e.target.value)}
                  placeholder="Your message here..."
                  rows={4}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </>
          )}

          {block.blockType === 'condition' && (
            <>
              <div className="mb-3">
                <label className="block text-sm font-medium text-slate-700 mb-1">Field</label>
                <input
                  type="text"
                  value={config.field as string || ''}
                  onChange={(e) => handleConfigChange('field', e.target.value)}
                  placeholder="field_name"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-slate-700 mb-1">Operator</label>
                <select
                  value={config.operator as string || 'equals'}
                  onChange={(e) => handleConfigChange('operator', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="equals">Equals</option>
                  <option value="not_equals">Not Equals</option>
                  <option value="greater_than">Greater Than</option>
                  <option value="less_than">Less Than</option>
                  <option value="contains">Contains</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-slate-700 mb-1">Value</label>
                <input
                  type="text"
                  value={config.value as string || ''}
                  onChange={(e) => handleConfigChange('value', e.target.value)}
                  placeholder="comparison value"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </>
          )}

          {block.blockType === 'delay' && (
            <>
              <div className="mb-3">
                <label className="block text-sm font-medium text-slate-700 mb-1">Duration</label>
                <input
                  type="number"
                  value={config.duration as number || 1}
                  onChange={(e) => handleConfigChange('duration', parseInt(e.target.value))}
                  min="1"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-slate-700 mb-1">Unit</label>
                <select
                  value={config.unit as string || 'seconds'}
                  onChange={(e) => handleConfigChange('unit', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="seconds">Seconds</option>
                  <option value="minutes">Minutes</option>
                  <option value="hours">Hours</option>
                </select>
              </div>
            </>
          )}

          {block.blockType === 'data_transform' && (
            <div className="mb-3">
              <label className="block text-sm font-medium text-slate-700 mb-1">Transformation</label>
              <textarea
                value={JSON.stringify(config.operations || [], null, 2)}
                onChange={(e) => {
                  try {
                    handleConfigChange('operations', JSON.parse(e.target.value));
                  } catch (err) {
                    // Handle invalid JSON
                  }
                }}
                placeholder='[{"type": "map", "field": "value"}]'
                rows={6}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
        </div>

        <div className="flex gap-2 pt-4">
          <button
            onClick={handleSave}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Save Changes
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 transition-colors text-sm font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlockConfigPanel;
