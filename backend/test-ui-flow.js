/**
 * Test to simulate the complete UI workflow flow
 * This mimics what happens when user:
 * 1. Selects recipients on dashboard
 * 2. Clicks "Create New Workflow"
 * 3. Adds email block
 * 4. Loads selected recipients
 * 5. Saves workflow
 * 6. Runs workflow
 */

import fetch from 'node-fetch';

const API_URL = 'http://localhost:5000';

console.log('🧪 Testing Complete UI Workflow Flow\n');
console.log('=' .repeat(60));

// Simulate what localStorage would contain after selecting recipients
const selectedRecipients = [
  'utkarshchauhan763@gmail.com',
  '06kanishkaa@gmail.com'
];

console.log('\n📋 Step 1: User selected recipients on dashboard');
console.log('Selected:', selectedRecipients.join(', '));

// Simulate what happens when user creates a workflow
const workflow = {
  id: `workflow-${Date.now()}`,
  name: 'Test Workflow from UI Flow',
  description: 'Testing complete flow',
  blocks: [
    {
      id: 'email-block-1',
      type: 'email',
      config: {
        to: selectedRecipients.join(', '), // This is what "Load Selected Recipients" does
        subject: '✅ UI Flow Test - Complete Workflow',
        body: `Hello!

This email confirms that the complete workflow is working:

1. ✅ Recipients selected on dashboard
2. ✅ Workflow created in builder
3. ✅ Email block configured with selected recipients
4. ✅ Workflow saved
5. ✅ Workflow executed via API
6. ✅ Email sent successfully!

Time: ${new Date().toLocaleString()}

Team: A4AI (Kanishka, Anushka, Utkarsh)
Project: Workflow Automation Builder
`
      }
    }
  ],
  status: 'draft',
  createdAt: new Date().toISOString()
};

console.log('\n📝 Step 2: User created workflow with email block');
console.log('Workflow:', workflow.name);
console.log('Recipients in block:', workflow.blocks[0].config.to);

// Test the API endpoint
async function testWorkflowExecution() {
  try {
    console.log('\n🚀 Step 3: User clicked ▶️ Run button');
    console.log('Making POST request to:', `${API_URL}/api/workflows/execute`);
    
    const response = await fetch(`${API_URL}/api/workflows/execute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ workflow })
    });

    const result = await response.json();

    console.log('\n📬 Step 4: Backend processed workflow');
    console.log('Response status:', response.status);
    console.log('Success:', result.success);
    
    if (result.success) {
      console.log('\n✅ WORKFLOW EXECUTED SUCCESSFULLY!');
      console.log('\nExecution Details:');
      console.log('- Execution ID:', result.result.executionId);
      console.log('- Completed At:', new Date(result.result.completedAt).toLocaleString());
      console.log('- Total Logs:', result.result.logs.length);
      
      console.log('\n📧 Email Sending Details:');
      result.result.logs.forEach((log, index) => {
        console.log(`\nLog ${index + 1}:`);
        console.log('  Block:', log.blockId);
        console.log('  Type:', log.type);
        console.log('  Status:', log.status);
        console.log('  Message:', log.message);
        if (log.data) {
          console.log('  Recipients:', log.data.recipients?.join(', '));
          console.log('  Success Count:', log.data.success);
          console.log('  Failed Count:', log.data.failed);
        }
      });

      console.log('\n' + '='.repeat(60));
      console.log('✅ COMPLETE UI FLOW TEST PASSED!');
      console.log('='.repeat(60));
      console.log('\n📧 Check these inboxes:');
      selectedRecipients.forEach(email => {
        console.log(`   - ${email}`);
      });
      console.log('\nSubject: "✅ UI Flow Test - Complete Workflow"');
      
    } else {
      console.log('\n❌ WORKFLOW EXECUTION FAILED');
      console.log('Error:', result.error || result.message);
    }

  } catch (error) {
    console.log('\n❌ ERROR DURING TEST');
    console.log('Error:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n⚠️  Backend server is not running!');
      console.log('Please start it with: node server.js');
    }
  }
}

// Run the test
testWorkflowExecution();
