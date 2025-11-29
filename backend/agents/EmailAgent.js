import nodemailer from 'nodemailer';

// Email Service Agent with Real Email Sending
class EmailAgent {
  constructor() {
    this.sentEmails = [];
    this.transporter = null;
    this.initializeTransporter();
  }

  initializeTransporter() {
    // Configure with Gmail SMTP or any other email service
    // For Gmail: Enable "Less secure app access" or use App Password
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com', // Replace with your email
        pass: process.env.EMAIL_PASSWORD || 'your-app-password'  // Replace with App Password
      }
    });

    console.log('🤖 Email Agent initialized');
    console.log('📧 Ready to send emails via SMTP');
  }

  async sendEmail({ to, subject, body, from = 'FlowForge Automation <noreply@flowforge.com>' }) {
    try {
      const emailData = {
        id: `email-${Date.now()}`,
        from: process.env.EMAIL_USER || from,
        to: to,
        subject: subject,
        body: body,
        timestamp: new Date().toISOString(),
        status: 'sending'
      };

      // Send actual email
      const info = await this.transporter.sendMail({
        from: emailData.from,
        to: emailData.to,
        subject: emailData.subject,
        text: emailData.body,
        html: `<div style="font-family: Arial, sans-serif; padding: 20px;">
                <h2 style="color: #4F46E5;">${emailData.subject}</h2>
                <p>${emailData.body}</p>
                <hr style="margin: 20px 0; border: none; border-top: 1px solid #E5E7EB;">
                <p style="color: #6B7280; font-size: 12px;">
                  Sent by FlowForge Workflow Automation<br>
                  ${new Date(emailData.timestamp).toLocaleString()}
                </p>
              </div>`
      });

      emailData.status = 'sent';
      emailData.messageId = info.messageId;
      this.sentEmails.push(emailData);

      console.log('\n✅ ====== EMAIL SENT SUCCESSFULLY ======');
      console.log(`   To: ${to}`);
      console.log(`   Subject: ${subject}`);
      console.log(`   Message ID: ${info.messageId}`);
      console.log(`   Time: ${emailData.timestamp}`);
      console.log('✅ ======================================\n');

      return {
        success: true,
        messageId: info.messageId,
        to: to,
        subject: subject,
        body: body,
        timestamp: emailData.timestamp,
        preview: `Email sent successfully to ${to}`
      };
    } catch (error) {
      console.error('❌ Email sending failed:', error.message);
      
      // Fallback to demo mode if email fails
      const emailData = {
        id: `email-${Date.now()}`,
        from: from,
        to: to,
        subject: subject,
        body: body,
        timestamp: new Date().toISOString(),
        status: 'failed'
      };
      
      this.sentEmails.push(emailData);

      return {
        success: false,
        error: error.message,
        to: to,
        subject: subject,
        body: body,
        timestamp: emailData.timestamp,
        preview: `Email failed: ${error.message}`
      };
    }
  }

  async sendBulkEmails(recipients, subject, body) {
    const results = [];
    
    console.log(`\n📧 Sending bulk emails to ${recipients.length} recipients...`);
    
    for (const recipient of recipients) {
      const result = await this.sendEmail({
        to: recipient,
        subject: subject,
        body: body
      });
      results.push({ recipient, ...result });
    }

    console.log(`✅ Bulk email complete: ${results.length} emails sent\n`);
    return results;
  }

  getSentEmails() {
    return this.sentEmails;
  }

  clearSentEmails() {
    this.sentEmails = [];
    console.log('📧 Email history cleared');
  }
}

export default EmailAgent;
