import React, { useState, useEffect } from 'react';
import { Mail, Plus, Trash2, CheckCircle } from 'lucide-react';

const RecipientManager = () => {
  const [recipients, setRecipients] = useState([]);
  const [newEmail, setNewEmail] = useState('');
  const [selectedRecipients, setSelectedRecipients] = useState([]);

  // Load recipients and selections from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('email_recipients');
    if (saved) {
      setRecipients(JSON.parse(saved));
    }
    
    const savedSelections = localStorage.getItem('selected_recipient_ids');
    if (savedSelections) {
      setSelectedRecipients(JSON.parse(savedSelections));
    }
  }, []);

  // Save selections whenever they change
  useEffect(() => {
    localStorage.setItem('selected_recipient_ids', JSON.stringify(selectedRecipients));
    
    // Also update the email list for workflow builder
    const emails = recipients
      .filter(r => selectedRecipients.includes(r.id))
      .map(r => r.email);
    localStorage.setItem('selected_recipients', JSON.stringify(emails));
  }, [selectedRecipients, recipients]);

  // Save recipients to localStorage
  const saveRecipients = (updatedRecipients) => {
    setRecipients(updatedRecipients);
    localStorage.setItem('email_recipients', JSON.stringify(updatedRecipients));
  };

  // Add new recipient
  const addRecipient = () => {
    if (newEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
      const recipient = {
        id: Date.now().toString(),
        email: newEmail,
        addedAt: new Date().toISOString(),
      };
      saveRecipients([...recipients, recipient]);
      setNewEmail('');
    } else {
      alert('Please enter a valid email address');
    }
  };

  // Remove recipient
  const removeRecipient = (id) => {
    saveRecipients(recipients.filter(r => r.id !== id));
    setSelectedRecipients(selectedRecipients.filter(rid => rid !== id));
  };

  // Toggle recipient selection
  const toggleSelection = (id) => {
    if (selectedRecipients.includes(id)) {
      setSelectedRecipients(selectedRecipients.filter(rid => rid !== id));
    } else {
      setSelectedRecipients([...selectedRecipients, id]);
    }
  };

  // Select all
  const selectAll = () => {
    setSelectedRecipients(recipients.map(r => r.id));
  };

  // Deselect all
  const deselectAll = () => {
    setSelectedRecipients([]);
  };

  // Get selected emails for workflow
  const getSelectedEmails = () => {
    return recipients
      .filter(r => selectedRecipients.includes(r.id))
      .map(r => r.email);
  };

  // Export function to be used by workflow
  const exportSelectedEmails = () => {
    const emails = getSelectedEmails();
    localStorage.setItem('selected_recipients', JSON.stringify(emails));
    return emails;
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Mail className="text-indigo-600" size={24} />
          <h2 className="text-xl font-bold text-gray-900">Email Recipients</h2>
        </div>
        <div className="text-sm text-gray-600">
          {selectedRecipients.length} of {recipients.length} selected
        </div>
      </div>

      {/* Add New Recipient */}
      <div className="mb-6">
        <div className="flex gap-2">
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addRecipient()}
            placeholder="Enter email address..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={addRecipient}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus size={20} />
            Add
          </button>
        </div>
      </div>

      {/* Bulk Actions */}
      {recipients.length > 0 && (
        <div className="flex gap-2 mb-4">
          <button
            onClick={selectAll}
            className="px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200"
          >
            Select All
          </button>
          <button
            onClick={deselectAll}
            className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
          >
            Deselect All
          </button>
          <button
            onClick={() => {
              const emails = exportSelectedEmails();
              alert(`Selected ${emails.length} email(s):\n${emails.join('\n')}`);
            }}
            disabled={selectedRecipients.length === 0}
            className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Export Selected ({selectedRecipients.length})
          </button>
        </div>
      )}

      {/* Recipient List */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {recipients.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Mail size={48} className="mx-auto mb-2 opacity-20" />
            <p>No recipients added yet</p>
            <p className="text-sm">Add email addresses to send workflows to</p>
          </div>
        ) : (
          recipients.map((recipient) => (
            <div
              key={recipient.id}
              className={`flex items-center justify-between p-3 rounded-lg border-2 transition-all cursor-pointer ${
                selectedRecipients.includes(recipient.id)
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => toggleSelection(recipient.id)}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                  selectedRecipients.includes(recipient.id)
                    ? 'bg-indigo-600 border-indigo-600'
                    : 'border-gray-300'
                }`}>
                  {selectedRecipients.includes(recipient.id) && (
                    <CheckCircle size={16} className="text-white" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{recipient.email}</p>
                  <p className="text-xs text-gray-500">
                    Added: {new Date(recipient.addedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeRecipient(recipient.id);
                }}
                className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Quick Stats */}
      {recipients.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-gray-900">{recipients.length}</p>
              <p className="text-sm text-gray-600">Total Recipients</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-indigo-600">{selectedRecipients.length}</p>
              <p className="text-sm text-gray-600">Selected</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipientManager;
