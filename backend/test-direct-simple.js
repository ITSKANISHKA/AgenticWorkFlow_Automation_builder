import dotenv from 'dotenv';
import EmailAgent from './agents/EmailAgent.js';
import WorkflowEngine from './agents/WorkflowEngine.js';

dotenv.config();

console.log('\n🧪 DIRECT WORKFLOW ENGINE TEST\n');

async function testDirectExecution() {
  const emailAgent = new EmailAgent();
  const workflowEngine = new WorkflowEngine(emailAgent);

  const workflow = {
    id: 'direct-test',
    name: 'Direct Multi-Recipient Test',
    blocks: [
      {
        id: 'email-1',
        type: 'email',
        config: {
          to: 'utkarshchauhan763@gmail.com, 06kanishkaa@gmail.com',
          subject: '✅ Direct Test - System Working!',
          body: `Hello! 👋

This confirms your workflow automation is working end-to-end!

✅ Email Agent: Working
✅ Workflow Engine: Working  
✅ Multi-Recipients: Working
✅ Gmail Integration: Working

You should receive this at:
- utkarshchauhan763@gmail.com
- 06kanishkaa@gmail.com

Time: ${new Date().toLocaleString()}

Best,
FlowForge Team 🚀`
        }
      }
    ]
  };

  console.log('⚡ Executing workflow...\n');

  try {
    const result = await workflowEngine.executeWorkflow(workflow);

    if (result.success) {
      console.log('✅ SUCCESS!\n');
      console.log('📊 Results:');
      result.logs.forEach((log, idx) => {
        console.log(`   ${idx + 1}. ${log.message}`);
        if (log.data && log.data.recipients) {
          console.log(`      📧 Sent to ${log.data.success}/${log.data.total} recipients`);
          log.data.recipients.forEach(email => {
            console.log(`         ✅ ${email}`);
          });
        }
      });

      console.log('\n📬 Check your inboxes!');
      console.log('   - utkarshchauhan763@gmail.com');
      console.log('   - 06kanishkaa@gmail.com\n');
    } else {
      console.log('❌ FAILED:', result.error);
    }
  } catch (error) {
    console.error('❌ ERROR:', error.message);
  }

  process.exit(0);
}

testDirectExecution();
