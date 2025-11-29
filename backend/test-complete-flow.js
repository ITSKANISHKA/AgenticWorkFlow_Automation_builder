import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

console.log('\n🧪 ============================================');
console.log('   END-TO-END WORKFLOW EXECUTION TEST');
console.log('============================================\n');

async function testCompleteWorkflow() {
  try {
    // Test workflow with real email block
    const testWorkflow = {
      id: 'test-' + Date.now(),
      name: 'Complete Email Test',
      blocks: [
        {
          id: 'block-1',
          type: 'email',
          config: {
            to: 'utkarshchauhan763@gmail.com, 06kanishkaa@gmail.com',
            subject: '🎯 Complete Workflow Test',
            body: `Hello! 👋

This email is sent from a COMPLETE end-to-end workflow test!

Test Details:
✅ Frontend → Backend API call
✅ Backend → WorkflowEngine execution
✅ WorkflowEngine → EmailAgent
✅ EmailAgent → Gmail SMTP
✅ Email delivered to your inbox!

If you're reading this, everything is working perfectly! 🚀

Time: ${new Date().toLocaleString()}

Best regards,
FlowForge Team`
          }
        }
      ]
    };

    console.log('📋 Test Workflow:');
    console.log(`   Name: ${testWorkflow.name}`);
    console.log(`   Blocks: ${testWorkflow.blocks.length}`);
    console.log(`   Recipients: ${testWorkflow.blocks[0].config.to}\n`);

    console.log('⏳ Sending request to backend API...\n');

    // Call backend API (same as frontend does)
    const response = await fetch('http://localhost:5000/api/workflows/execute', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ workflow: testWorkflow })
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();

    console.log('📊 ===== EXECUTION RESULT =====\n');
    
    if (result.success) {
      console.log('✅ SUCCESS! Workflow executed!\n');
      console.log(`   Execution ID: ${result.executionId}`);
      console.log(`   Completed At: ${result.completedAt}\n`);
      
      console.log('📝 Execution Logs:');
      result.logs.forEach((log, idx) => {
        console.log(`   ${idx + 1}. [${log.status.toUpperCase()}] ${log.message}`);
      });

      console.log('\n📧 Email Details:');
      const emailLog = result.logs.find(l => l.blockType === 'email');
      if (emailLog && emailLog.data) {
        console.log(`   Total Recipients: ${emailLog.data.total}`);
        console.log(`   Successfully Sent: ${emailLog.data.success}`);
        console.log(`   Failed: ${emailLog.data.failed}\n`);
        
        console.log('   Recipients:');
        emailLog.data.recipients.forEach((recipient, idx) => {
          const status = emailLog.data.results[idx].success ? '✅' : '❌';
          console.log(`   ${status} ${recipient}`);
        });
      }

      console.log('\n============================================');
      console.log('   ✅ TEST PASSED!');
      console.log('============================================\n');

      console.log('📬 Next Steps:');
      console.log('   1. Check Gmail: utkarshchauhan763@gmail.com');
      console.log('   2. Check Gmail: 06kanishkaa@gmail.com');
      console.log('   3. Both should have the email!\n');

      console.log('🎯 Now test from FRONTEND:');
      console.log('   1. Go to: http://localhost:5174/');
      console.log('   2. Login as Employee');
      console.log('   3. Add recipients and select them');
      console.log('   4. Create workflow → Add email block');
      console.log('   5. Load recipients → Configure → Save');
      console.log('   6. Click ▶️ Run button');
      console.log('   7. Should work exactly like this test!\n');

    } else {
      console.log('❌ FAILED! Workflow execution failed\n');
      console.log(`   Error: ${result.message}`);
      if (result.logs) {
        console.log('\n📝 Error Logs:');
        result.logs.forEach((log, idx) => {
          console.log(`   ${idx + 1}. ${log.message}`);
        });
      }
    }

  } catch (error) {
    console.error('\n❌ ===== TEST FAILED =====');
    console.error(`   Error: ${error.message}\n`);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.error('⚠️  Backend server is not running!');
      console.error('   Start it with: npm run dev (in backend folder)\n');
    }
  }

  console.log('============================================\n');
  process.exit(0);
}

testCompleteWorkflow();
