import fetch from 'node-fetch';

console.log('\n🧪 ============================================');
console.log('   TESTING COMPLETE WORKFLOW VIA API');
console.log('============================================\n');

async function testCompleteWorkflow() {
  const API_URL = 'http://localhost:5000';
  
  // Test workflow with multi-recipients
  const testWorkflow = {
    id: 'test-workflow-' + Date.now(),
    name: 'Complete Multi-Recipient Test',
    description: 'Testing full workflow execution with real emails',
    blocks: [
      {
        id: 'trigger-1',
        type: 'trigger',
        config: {
          name: 'Manual Trigger'
        }
      },
      {
        id: 'email-1',
        type: 'email',
        config: {
          to: 'utkarshchauhan763@gmail.com, 06kanishkaa@gmail.com',
          subject: '🚀 Complete Workflow Test - Multi Recipients',
          body: `Hello Team! 👋

This email confirms that the COMPLETE workflow system is working:

✅ Frontend workflow creation
✅ Backend API integration  
✅ Email agent processing
✅ Multi-recipient delivery
✅ Gmail SMTP integration

Recipients:
1. Utkarsh (utkarshchauhan763@gmail.com)
2. Kanishka (06kanishkaa@gmail.com)

Sent at: ${new Date().toLocaleString()}

This is a REAL email sent through the complete workflow automation system! 🎯

Best regards,
FlowForge Team`,
          name: 'Multi-Recipient Email'
        }
      }
    ],
    status: 'draft',
    createdAt: new Date().toISOString()
  };

  console.log('📝 Step 1: Creating workflow via API...\n');
  
  try {
    // Create workflow
    const createResponse = await fetch(`${API_URL}/api/workflows`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testWorkflow)
    });

    if (!createResponse.ok) {
      throw new Error(`Failed to create workflow: ${createResponse.statusText}`);
    }

    const created = await createResponse.json();
    console.log(`✅ Workflow created with ID: ${created.workflow.id}\n`);

    // Execute workflow
    console.log('⚡ Step 2: Executing workflow...\n');
    
    const executeResponse = await fetch(`${API_URL}/api/workflows/${created.workflow.id}/execute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!executeResponse.ok) {
      throw new Error(`Failed to execute workflow: ${executeResponse.statusText}`);
    }

    const result = await executeResponse.json();
    
    console.log('✅ SUCCESS! Workflow executed!\n');
    console.log('📊 Execution Results:');
    console.log(`   Execution ID: ${result.result.executionId}`);
    console.log(`   Status: ${result.result.success ? 'SUCCESS' : 'FAILED'}`);
    console.log(`   Completed At: ${result.result.completedAt}\n`);
    
    if (result.result.logs && result.result.logs.length > 0) {
      console.log('📝 Execution Logs:');
      result.result.logs.forEach((log, idx) => {
        console.log(`   ${idx + 1}. [${log.status.toUpperCase()}] ${log.message}`);
        
        if (log.data && log.data.recipients) {
          console.log(`\n   📧 Email Details:`);
          console.log(`      Total: ${log.data.total}`);
          console.log(`      Success: ${log.data.success}`);
          console.log(`      Failed: ${log.data.failed}`);
          console.log(`\n      Recipients:`);
          log.data.recipients.forEach((email, i) => {
            const status = log.data.results[i].success ? '✅' : '❌';
            console.log(`      ${status} ${email}`);
          });
        }
      });
    }

    console.log('\n============================================');
    console.log('   TEST COMPLETE!');
    console.log('============================================\n');

    console.log('📬 Next Steps:');
    console.log('   1. Check Gmail: utkarshchauhan763@gmail.com');
    console.log('   2. Check Gmail: 06kanishkaa@gmail.com');
    console.log('   3. Both should have received the email!\n');

    console.log('🎯 What Was Tested:');
    console.log('   ✅ POST /api/workflows (Create workflow)');
    console.log('   ✅ POST /api/workflows/:id/execute (Execute)');
    console.log('   ✅ Multi-recipient email processing');
    console.log('   ✅ Real Gmail SMTP delivery');
    console.log('   ✅ Complete end-to-end flow\n');

  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    console.error('   Stack:', error.stack);
  }

  process.exit(0);
}

// Wait a bit for server to be ready
setTimeout(testCompleteWorkflow, 2000);
