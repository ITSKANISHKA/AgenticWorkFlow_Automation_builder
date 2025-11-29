# 📝 Step-by-Step: How to Use the Workflow System

## ⚠️ Important: "Create New Workflow" Button Explained

When you click **"Create New Workflow"**, it takes you to the **Workflow Builder** page. This is a **blank canvas** where you need to:

1. ✅ Add workflow blocks (Email, Trigger, etc.)
2. ✅ Configure each block
3. ✅ Save the workflow
4. ✅ Go back to dashboard and **RUN** it

**The workflow builder does NOT automatically run anything!** It just lets you design the workflow.

---

## 🎯 Complete Workflow Process

### **Phase 1: Add Recipients (One Time Setup)**

1. **Login as Employee:**
   - Email: `employee@test.com`
   - Password: `test123` (or anything)
   - Role: **Employee**

2. **Scroll down to "Email Recipients" section**

3. **Add Email Addresses:**
   ```
   Type: utkarshchauhan763@gmail.com → Click "Add"
   Type: 06kanishkaa@gmail.com → Click "Add"
   Type: your-email@example.com → Click "Add"
   ```

4. **Select Recipients:**
   - **Click on each email card** 
   - They should turn **BLUE** with a ✅ checkmark
   - Top should show: "3 of 3 selected"

5. **Verify Selection:**
   - Click **"Export Selected"** button
   - Browser console (F12) should show the emails

✅ **Recipients are now saved in localStorage!**

---

### **Phase 2: Create Workflow**

6. **Click "Create New Workflow" button** (green button at top)
   - Browser navigates to: `http://localhost:5174/builder`
   - You see a **blank canvas** with sidebar on left

7. **Give Workflow a Name:**
   - Click on "New Workflow" at top
   - Change to: `My First Email Workflow`

8. **Add Email Block:**
   - Left sidebar shows 6 block types
   - Click on **"📧 Send Email"** (purple block)
   - Block appears in the center canvas area

9. **Configure Email Block:**
   - Click **"Edit"** button on the email block
   - A modal popup appears

10. **Load Recipients:**
    - Click **"📥 Load Selected Recipients"** button
    - Should show alert: "✅ Loaded 3 recipient(s)"
    - Text area fills with: `email1@example.com, email2@example.com, email3@example.com`

11. **Add Subject and Body:**
    ```
    Subject: Test Email from Workflow System
    Body: Hello! This is an automated email sent from our workflow automation platform. 🚀
    ```

12. **Save Block Configuration:**
    - Click **"Save"** button in modal
    - Modal closes, block now shows configured

13. **Save Workflow:**
    - Click **"Save Workflow"** button (top right, blue button)
    - Browser redirects back to Dashboard
    - Your workflow appears in the list

✅ **Workflow is now created and saved!**

---

### **Phase 3: Execute Workflow**

14. **Find Your Workflow in Dashboard:**
    - Should see: "My First Email Workflow"
    - Shows: Draft status, 1 block

15. **Run Workflow:**
    - Click **▶️ Run** button (green play button)
    - Workflow status changes to "Running"
    - Browser shows alert: "Executing workflow..."

16. **Check Backend Terminal:**
    ```
    ✅ ====== EMAIL SENT SUCCESSFULLY ======
       To: utkarshchauhan763@gmail.com
       Subject: Test Email from Workflow System
       Message ID: <abc123@gmail.com>
    ✅ ======================================

    ✅ ====== EMAIL SENT SUCCESSFULLY ======
       To: 06kanishkaa@gmail.com
    ✅ ======================================

    Sent 2/2 emails successfully
    ```

17. **Check Email Inboxes:**
    - Go to Gmail: https://mail.google.com/
    - **Check INBOX** (or Spam folder)
    - You should see the email! 📧

✅ **Workflow executed successfully!**

---

## 🔍 What Happens at Each Step

### When You Click "Create New Workflow":
- ✅ Browser navigates to `/builder` route
- ✅ WorkflowBuilder component loads
- ✅ Shows blank canvas with block sidebar
- ❌ **Does NOT automatically run anything**
- ❌ **Does NOT automatically load recipients**

### When You Add Blocks:
- ✅ Blocks added to state array
- ✅ Rendered on canvas
- ❌ **Not saved to backend yet**

### When You Click "Load Selected Recipients":
- ✅ Reads `selected_recipients` from localStorage
- ✅ Parses JSON array of emails
- ✅ Fills textarea with comma-separated list
- ✅ Shows alert with count

### When You Click "Save Workflow":
- ✅ Calls `createWorkflow()` from WorkflowContext
- ✅ Saves to workflows array (in-memory)
- ✅ Navigates back to `/dashboard`
- ✅ Workflow appears in list

### When You Click "▶️ Run":
- ✅ Calls `executeWorkflow()` from WorkflowContext
- ✅ Makes POST request to backend: `http://localhost:5000/api/workflows/execute`
- ✅ Backend WorkflowEngine processes blocks sequentially
- ✅ EmailAgent sends emails via Gmail SMTP
- ✅ Backend returns success/failure
- ✅ Frontend shows alert with results

---

## 🐛 Common Mistakes

### ❌ "I clicked Create New Workflow but nothing happened!"
**Why:** The button just navigates you to the builder page. You need to add blocks manually.

**Fix:** Add email blocks from the left sidebar, configure them, then save.

---

### ❌ "Load Recipients button says no recipients selected!"
**Why:** You didn't select the emails (click on them to turn blue).

**Fix:**
1. Go back to Dashboard
2. Scroll to Email Recipients
3. **CLICK on each email card** (not just add)
4. They must turn **BLUE** with ✅
5. Then go back to builder

---

### ❌ "I saved the workflow but emails didn't send!"
**Why:** Saving only stores the workflow. You must **RUN** it.

**Fix:** 
1. Go to Dashboard
2. Find your workflow in the list
3. Click the **▶️ Run** button (green play icon)

---

### ❌ "Run button clicked but no emails received!"
**Why:** Backend server might not be running.

**Fix:**
1. Check Terminal 1 shows: "Server is running on port 5000"
2. If not running, restart: `node server.js` in backend folder
3. Try running workflow again

---

## 📊 Visual Flow Diagram

```
Dashboard Page
    ↓
[Add Recipients] → Select (turn blue) → Saved to localStorage
    ↓
[Create New Workflow] → Navigate to /builder
    ↓
Workflow Builder Page
    ↓
[Add Email Block] → Drag from sidebar
    ↓
[Click Edit] → Modal opens
    ↓
[Load Recipients] → Reads localStorage → Fills textarea
    ↓
[Enter Subject/Body] → Type your message
    ↓
[Save Block] → Modal closes
    ↓
[Save Workflow] → Navigate back to /dashboard → Workflow in list
    ↓
Dashboard Page
    ↓
[Click ▶️ Run] → POST to backend
    ↓
Backend: WorkflowEngine → EmailAgent → Gmail SMTP
    ↓
✉️ Emails Delivered!
```

---

## ✅ Success Checklist

Before clicking Run, verify:

- [ ] Backend terminal shows "Server is running on port 5000"
- [ ] Frontend terminal shows "Local: http://localhost:5174/"
- [ ] Logged in as Employee or Manager (not User)
- [ ] Added at least 1 email to recipients
- [ ] **CLICKED** on email to select it (blue with ✅)
- [ ] Created workflow with at least 1 email block
- [ ] Clicked Edit on block
- [ ] Clicked "Load Selected Recipients" (showed success alert)
- [ ] Entered subject and body
- [ ] Clicked Save in modal
- [ ] Clicked "Save Workflow" button
- [ ] Workflow appears in dashboard list
- [ ] Clicked ▶️ Run button

If all checked, emails should send! 🎉

---

## 🎥 Quick Demo Flow (2 Minutes)

```bash
# Step 1: Add recipients (30 seconds)
- Scroll to Email Recipients
- Add 2-3 emails
- Click each to select (blue)

# Step 2: Create workflow (60 seconds)
- Click "Create New Workflow"
- Click "📧 Send Email" block
- Click "Edit" → "Load Recipients"
- Enter subject: "Test"
- Enter body: "Hello!"
- Click "Save"
- Click "Save Workflow"

# Step 3: Execute (30 seconds)
- Find workflow in list
- Click ▶️ Run
- Check backend terminal
- Check email inbox
```

✅ **Done! You've successfully automated an email!**

---

**Last Updated:** November 28, 2025  
**For Questions:** Check backend terminal for error messages, or check browser console (F12)
