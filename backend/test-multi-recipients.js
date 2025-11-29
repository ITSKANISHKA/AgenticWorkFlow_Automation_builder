import dotenv from 'dotenv';
import EmailAgent from './agents/EmailAgent.js';
import WorkflowEngine from './agents/WorkflowEngine.js';

dotenv.config();

console.log('\n🧪 ============================================');
console.log('   TESTING MULTI-RECIPIENT EMAIL SYSTEM');
console.log('============================================\n');

async function testMultiRecipientEmail() {
  const emailAgent = new EmailAgent();
  const workflowEngine = new WorkflowEngine(emailAgent);

  // Test 1: Direct Multi-Recipient Email
  console.log('📧 TEST 1: Sending to Multiple Recipients Directly\n');
  console.log('Recipients:');
  console.log('  1. utkarshchauhan763@gmail.com');
  console.log('  2. 06kanishkaa@gmail.com');
  console.log('  3. test@example.com\n');

  const workflow = {
    id: 'test-multi-workflow',
    name: 'Multi-Recipient Test',
    blocks: [
      {
        id: 'email-1',
        type: 'email',
        config: {
          to: 'utkarshchauhan763@gmail.com, 06kanishkaa@gmail.com, test@example.com',
          subject: '🎯 Multi-Recipient Test Email',
          body: `Hello Team! 👋

This email is being sent to multiple recipients simultaneously.

Recipients:
✅ Utkarsh (utkarshchauhan763@gmail.com)
✅ Kanishka (06kanishkaa@gmail.com)
✅ Test User (test@example.com)

If you're reading this, the multi-recipient system is working perfectly! 🚀

Time: ${new Date().toLocaleString()}

Best regards,
FlowForge Automation Team`
        }
      }
    ]
  };

  try {
    console.log('⏳ Executing workflow...\n');
    const result = await workflowEngine.executeWorkflow(workflow);

    if (result.success) {
      console.log('✅ SUCCESS! Workflow executed successfully!\n');
      console.log('📊 Execution Results:');
      console.log(`   Execution ID: ${result.executionId}`);
      console.log(`   Completed At: ${result.completedAt}\n`);
      
      console.log('📝 Execution Logs:');
      result.logs.forEach((log, index) => {
        console.log(`   ${index + 1}. [${log.status.toUpperCase()}] ${log.message}`);
      });

      // Show detailed email results
      if (result.logs.length > 0) {
        const emailLog = result.logs.find(log => log.blockType === 'email');
        if (emailLog && emailLog.data) {
          console.log('\n📧 Email Sending Details:');
          console.log(`   Total Recipients: ${emailLog.data.total}`);
          console.log(`   Successfully Sent: ${emailLog.data.success}`);
          console.log(`   Failed: ${emailLog.data.failed}`);
          console.log(`\n   Recipients List:`);
          emailLog.data.recipients.forEach((recipient, idx) => {
            const status = emailLog.data.results[idx].success ? '✅' : '❌';
            console.log(`   ${status} ${recipient}`);
          });
        }
      }
    } else {
      console.log('❌ FAILED! Workflow execution failed');
      console.log(`   Error: ${result.error}`);
    }
  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
  }

  console.log('\n============================================');
  console.log('   TEST COMPLETE!');
  console.log('============================================\n');

  console.log('📬 Next Steps:');
  console.log('   1. Check Gmail inbox: utkarshchauhan763@gmail.com');
  console.log('   2. Check Gmail inbox: 06kanishkaa@gmail.com');
  console.log('   3. Both should have received the same email!\n');

  process.exit(0);
}

testMultiRecipientEmail();
