import dotenv from 'dotenv';
import EmailAgent from './agents/EmailAgent.js';

dotenv.config();

async function testEmail() {
  console.log('🧪 Testing Email Agent...\n');
  
  const emailAgent = new EmailAgent();
  
  try {
    const result = await emailAgent.sendEmail({
      to: 'utkarshchauhan763@gmail.com',
      subject: '✅ Test Email from FlowForge Automation',
      body: `Hello! 👋

This is a test email from your FlowForge Workflow Automation system.

If you're reading this, it means:
✅ Gmail App Password is configured correctly
✅ Nodemailer is working
✅ Your workflow automation is ready to send emails!

Time: ${new Date().toLocaleString()}

Best regards,
FlowForge Team 🚀`
    });
    
    if (result.success) {
      console.log('\n✅ SUCCESS! Email sent successfully!');
      console.log('📧 Check your inbox: utkarshchauhan763@gmail.com');
      console.log('📬 Message ID:', result.messageId);
    } else {
      console.log('\n❌ FAILED! Email could not be sent');
      console.log('Error:', result.error);
    }
  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
  }
  
  process.exit(0);
}

testEmail();
