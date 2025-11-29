# 🧪 Complete Testing Guide - Role Switching & Multi-Recipient Emails

## ✅ Part 1: Multi-Recipient Email Test - ALREADY DONE!

**Result:** Successfully sent to 3 recipients:
- ✅ utkarshchauhan763@gmail.com
- ✅ 06kanishkaa@gmail.com  
- ✅ test@example.com

**Total:** 3/3 emails delivered successfully! 📧

---

## 🎭 Part 2: Testing Role Switching

### Frontend is Running at: http://localhost:5174/

---

## 📝 Step-by-Step Testing Process

### **TEST 1: User Role (View Only)**

#### Steps:
1. **Open Browser:** Go to http://localhost:5174/login
2. **Enter Details:**
   ```
   Email: user@test.com
   Password: anything123
   Login As: User (select from dropdown)
   ```
3. **Click "Login"**

#### Expected Result:
- ✅ **Blue Dashboard** appears
- ✅ Title: "User Dashboard" 
- ✅ "Welcome, user!" greeting with 👤 icon
- ✅ Blue gradient header card
- ✅ Yellow warning banner says: "As a User, you can only view..."
- ✅ **NO "Create Workflow" button**
- ✅ **NO "Browse Templates" button**
- ✅ **NO Recipient Manager section**
- ✅ Can only VIEW 2 sample workflows
- ✅ No Edit/Delete buttons, only View button

#### What to Check:
- Dashboard color is **Blue**
- Top shows "User Dashboard"
- Limited features (read-only)

---

### **TEST 2: Employee Role (Full Workflow Access)**

#### Steps:
1. **Logout:** Click "Logout" button (top right)
2. **Login Again:**
   ```
   Email: employee@test.com
   Password: anything123
   Login As: Employee (select from dropdown)
   ```
3. **Click "Login"**

#### Expected Result:
- ✅ **Green Dashboard** appears
- ✅ Title: "Employee Dashboard"
- ✅ "Welcome, employee!" with 👨‍💼 icon
- ✅ Green gradient header card
- ✅ **"Create New Workflow" button** (GREEN button)
- ✅ **"Browse Templates" button** visible
- ✅ **"Email Recipients" section** visible
- ✅ Can Add/Remove recipients
- ✅ Can Edit/Run/Delete workflows
- ✅ Full access to workflow builder

#### What to Check:
- Dashboard color is **Green**
- Can create workflows
- Recipient Manager present
- Edit/Run/Delete buttons available

---

### **TEST 3: Manager Role (Team Analytics)**

#### Steps:
1. **Logout:** Click "Logout"
2. **Login Again:**
   ```
   Email: manager@test.com
   Password: anything123
   Login As: Manager (select from dropdown)
   ```
3. **Click "Login"**

#### Expected Result:
- ✅ **Purple Dashboard** appears
- ✅ Title: "Manager Dashboard"
- ✅ "Welcome, manager!" with 👨‍💼 icon
- ✅ Purple gradient header card
- ✅ **Team Members section** with list:
   - Kanishka (Employee, 5 workflows)
   - Anushka (Employee, 4 workflows)
   - Utkarsh (Employee, 6 workflows)
- ✅ **Recent Activity feed** visible
- ✅ **Performance Metrics** with progress bars
- ✅ **Analytics charts** (94% success rate, etc.)
- ✅ Everything Employee has + Team oversight

#### What to Check:
- Dashboard color is **Purple**
- Team members list visible
- Analytics and metrics present
- Activity feed showing recent actions

---

## 📧 Part 3: Testing Multi-Recipient Workflow from Frontend

### **Complete Workflow Test:**

#### Step 1: Login as Employee
```
Email: employee@test.com
Password: test123
Role: Employee
```

#### Step 2: Add Recipients
1. **Scroll to "Email Recipients" section**
2. **Add emails one by one:**
   - Type: `utkarshchauhan763@gmail.com` → Click "Add"
   - Type: `06kanishkaa@gmail.com` → Click "Add"
   - Type: `yourfriend@gmail.com` → Click "Add"

#### Step 3: Select Recipients
- **Click on each email** to select them (they'll turn blue with checkmark)
- Click **"Select All"** button to select everyone
- Verify: "3 of 3 selected" shows at top

#### Step 4: Create Workflow
1. Click **"Create New Workflow"** button (green)
2. Click **"📧 Send Email"** from left sidebar
3. The email block appears on canvas
4. Click **"Edit"** button on the email block

#### Step 5: Configure Email
1. In the popup modal:
2. Click **"Load Selected Recipients"** button
3. It will auto-fill: `utkarshchauhan763@gmail.com, 06kanishkaa@gmail.com, yourfriend@gmail.com`
4. **Subject:** `Team Update from FlowForge`
5. **Body:** 
   ```
   Hello Team! 👋
   
   This is a test email sent to multiple recipients.
   Our workflow automation is working perfectly!
   
   Best regards,
   FlowForge Team
   ```
6. Click **"Save"**

#### Step 6: Save & Run Workflow
1. Change workflow name to: `Multi-Recipient Email Test`
2. Click **"Save"** (top right)
3. You'll be redirected to Dashboard
4. Find "Multi-Recipient Email Test" workflow
5. Click **▶️ Run** button

#### Step 7: Check Results

**Backend Terminal will show:**
```
✅ ====== EMAIL SENT SUCCESSFULLY ======
   To: utkarshchauhan763@gmail.com
✅ ======================================

✅ ====== EMAIL SENT SUCCESSFULLY ======
   To: 06kanishkaa@gmail.com
✅ ======================================

✅ ====== EMAIL SENT SUCCESSFULLY ======
   To: yourfriend@gmail.com
✅ ======================================

Sent 3/3 emails successfully
```

**Check Inboxes:**
- ✅ utkarshchauhan763@gmail.com should receive email
- ✅ 06kanishkaa@gmail.com should receive email
- ✅ yourfriend@gmail.com should receive email

---

## 🔍 Troubleshooting

### Issue: "Can't see Create Workflow button"
**Solution:** Make sure you're logged in as **Employee** or **Manager**, not User

### Issue: "Recipients not loading"
**Solution:** 
1. Go to Dashboard
2. Select recipients (click to make them blue)
3. Click "Export Selected" to verify
4. Then go to workflow builder and click "Load Selected Recipients"

### Issue: "Email not received"
**Solution:**
1. Check spam folder
2. Check backend terminal for error messages
3. Verify Gmail App Password in `.env` file
4. Make sure recipient email is valid

### Issue: "Role not changing"
**Solution:**
1. Make sure you **logout** first
2. Then login with different role selection
3. Clear browser cache if needed: Ctrl+Shift+Delete

---

## ✅ Complete Test Checklist

### Role Switching Tests:
- [ ] Logged in as User → Blue dashboard, view-only
- [ ] Logged in as Employee → Green dashboard, can create
- [ ] Logged in as Manager → Purple dashboard, team analytics
- [ ] User cannot access /builder (redirects to dashboard)
- [ ] Employee can access /builder 
- [ ] Manager can see team members list

### Multi-Recipient Tests:
- [ ] Added 3+ email addresses to recipient list
- [ ] Selected multiple recipients (blue checkmarks)
- [ ] Created workflow with email block
- [ ] Loaded selected recipients successfully
- [ ] Configured subject and body
- [ ] Saved workflow
- [ ] Executed workflow (clicked Run)
- [ ] Backend shows success for each email
- [ ] All recipients received the email

---

## 📊 Test Summary

**Automated Test Results:**
```
✅ Multi-Recipient Email: PASSED
   - 3/3 emails sent successfully
   - utkarshchauhan763@gmail.com: ✅
   - 06kanishkaa@gmail.com: ✅
   - test@example.com: ✅
```

**Manual Testing Required:**
- Role switching (User → Employee → Manager)
- Frontend workflow creation
- Recipient selection UI
- Dashboard feature visibility

---

## 🎯 For Presentation Tomorrow

### Demo Flow:
1. **Show Role System:**
   - Login as User → Show limited access
   - Logout → Login as Employee → Show creation features
   - Logout → Login as Manager → Show team analytics

2. **Show Multi-Recipient:**
   - As Employee, add 3 email addresses
   - Select all of them
   - Create email workflow
   - Load selected recipients
   - Run workflow
   - Show backend terminal (3 success messages)
   - Open Gmail inbox to prove delivery

3. **Key Points:**
   - "3 different role-based dashboards"
   - "Automatic permission enforcement"
   - "Multi-recipient email automation"
   - "Real Gmail integration working"

Perfect for impressing! 🚀
