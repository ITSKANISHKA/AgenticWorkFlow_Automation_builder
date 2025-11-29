import dotenv from 'dotenv';
import EmailAgent from './agents/EmailAgent.js';

dotenv.config();

async function sendSpecialEmail() {
  console.log('📧 Sending email to Kanishka...\n');
  
  const emailAgent = new EmailAgent();
  
  try {
    const result = await emailAgent.sendEmail({
      to: '06kanishkaa@gmail.com',
      subject: '🎉 Project Success Reminder!',
      body: `Hi Kanishka! 👋

Agar tum khush ho toh kal project kai baad jab tumko time mile toh treat dena mat bhulna! 😊🎂

Best,
Utkarsh`
    });
    
    if (result.success) {
      console.log('\n✅ Email sent successfully to Kanishka!');
      console.log('📧 Check inbox: 06kanishkaa@gmail.com');
      console.log('📬 Message ID:', result.messageId);
    } else {
      console.log('\n❌ Failed to send email');
      console.log('Error:', result.error);
    }
  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
  }
  
  process.exit(0);
}

sendSpecialEmail();
