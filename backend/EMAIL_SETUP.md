# Email Setup Configuration Guide

## Using Gmail for Email Sending

### Step 1: Enable 2-Step Verification
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Scroll to "Signing in to Google"
3. Enable **2-Step Verification**

### Step 2: Create App Password
1. Go to [App Passwords](https://myaccount.google.com/apppasswords)
2. Select app: **Mail**
3. Select device: **Windows Computer**
4. Click **Generate**
5. Copy the 16-character password

### Step 3: Configure Backend
Edit `backend/.env` file:
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
```

### Step 4: Restart Backend Server
```bash
cd backend
npm run dev
```

---

## Alternative: Use Ethereal Email (For Testing)

If you don't want to use your real Gmail:

1. Go to [Ethereal Email](https://ethereal.email/)
2. Click "Create Ethereal Account"
3. Copy the credentials shown
4. Update `backend/agents/EmailAgent.js`:

```javascript
this.transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'your-ethereal-user',
    pass: 'your-ethereal-password'
  }
});
```

5. Emails won't actually deliver but you can view them at ethereal.email

---

## Testing Email Workflow

1. **Open Frontend**: http://localhost:5174/
2. **Login/Register** with any credentials
3. **Go to Templates** → Select **Email Automation**
4. **Configure Email Block**:
   - To: `your-test-email@gmail.com`
   - Subject: `Test Workflow Email`
   - Body: `This is an automated email from FlowForge!`
5. **Click Save** → Then click **▶️ Run**
6. **Check**:
   - Backend terminal for success/failure message
   - Your email inbox for the received email

---

## Troubleshooting

### Error: "Invalid login credentials"
- Make sure you're using App Password, not regular Gmail password
- Verify 2-Step Verification is enabled

### Error: "Connection timeout"
- Check your internet connection
- Some networks block SMTP ports (587, 465)
- Try using Ethereal Email instead

### Email not received
- Check spam folder
- Verify recipient email is correct
- Look at backend terminal for error messages

---

## Demo Mode (Fallback)

If you just want to demo without real emails, the system automatically falls back to console logging if email sending fails. You'll see formatted logs in the terminal showing what would have been sent.
