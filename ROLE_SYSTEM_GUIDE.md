# 👥 Role-Based Dashboard System

## Overview
The system now has **3 different roles** with separate dashboards and permissions:

---

## 🎭 Three Role Types

### 1. 👤 **User** (Basic Access)
**Color Theme:** Blue  
**Access Level:** View Only  
**Permissions:**
- ✅ View their own workflows
- ✅ See workflow execution history
- ✅ View statistics
- ❌ Cannot create new workflows
- ❌ Cannot edit workflows
- ❌ Cannot access templates
- ❌ Cannot manage recipients

**Use Case:** End users who just need to monitor workflows created for them

---

### 2. 👨‍💼 **Employee** (Full Workflow Access)
**Color Theme:** Green  
**Access Level:** Create & Manage  
**Permissions:**
- ✅ Create new workflows
- ✅ Edit existing workflows
- ✅ Delete workflows
- ✅ Execute workflows
- ✅ Access all templates
- ✅ Manage email recipients
- ✅ View all workflow features
- ❌ Cannot see team analytics
- ❌ Cannot view other members' workflows

**Use Case:** Staff members who build and maintain automation workflows

---

### 3. 👨‍💼 **Manager** (Full System Access)
**Color Theme:** Purple  
**Access Level:** Complete Control + Analytics  
**Permissions:**
- ✅ Everything Employee can do
- ✅ View team member list
- ✅ See all team workflows
- ✅ Access team analytics
- ✅ View recent team activity
- ✅ Performance metrics
- ✅ Success rate tracking
- ✅ Team productivity overview

**Use Case:** Supervisors who oversee team workflow operations

---

## 🚀 How to Test

### Test User Role:
1. Go to: http://localhost:5174/login
2. Enter any email: `user@test.com`
3. Enter any password: `password`
4. **Select Role:** User
5. Click Login
6. **Result:** Blue dashboard, view-only access

### Test Employee Role:
1. Go to: http://localhost:5174/login
2. Enter: `employee@test.com`
3. Password: `password`
4. **Select Role:** Employee
5. Click Login
6. **Result:** Green dashboard, can create workflows

### Test Manager Role:
1. Go to: http://localhost:5174/login
2. Enter: `manager@test.com`
3. Password: `password`
4. **Select Role:** Manager
5. Click Login
6. **Result:** Purple dashboard with team analytics

---

## 📊 Dashboard Comparison

| Feature | User | Employee | Manager |
|---------|------|----------|---------|
| View Workflows | ✅ (Own only) | ✅ (Own only) | ✅ (All team) |
| Create Workflows | ❌ | ✅ | ✅ |
| Edit Workflows | ❌ | ✅ | ✅ |
| Delete Workflows | ❌ | ✅ | ✅ |
| Execute Workflows | ❌ | ✅ | ✅ |
| Templates Access | ❌ | ✅ | ✅ |
| Recipient Manager | ❌ | ✅ | ✅ |
| Team Analytics | ❌ | ❌ | ✅ |
| Team Members View | ❌ | ❌ | ✅ |
| Activity Logs | ❌ | ❌ | ✅ |
| Performance Metrics | ❌ | ❌ | ✅ |

---

## 🎨 Visual Differences

### User Dashboard (Blue):
```
👤 User Portal
- View-only mode
- Personal workflows list
- Basic statistics
- Yellow warning banner explaining limited access
```

### Employee Dashboard (Green):
```
👨‍💼 Employee Portal
- "Create New Workflow" button (Green)
- "Browse Templates" button
- Recipient Manager section
- Full workflow CRUD operations
- Edit/Run/Delete buttons enabled
```

### Manager Dashboard (Purple):
```
👨‍💼 Manager Portal
- Team Members overview
- Recent Activity feed
- Performance metrics with progress bars
- Team statistics (Total workflows, Active, Success rate)
- Analytics charts
- Everything Employee has + team oversight
```

---

## 🔒 Permission System

The app automatically:
1. **Redirects based on role** when accessing `/dashboard`
2. **Blocks unauthorized access** - If User tries to visit `/builder`, redirected to dashboard
3. **Shows/hides features** - Buttons only appear for allowed roles
4. **Role stored in localStorage** - Persists across sessions

---

## 📝 For Presentation

### Show Role Differences:

**Demo Flow:**
1. **Login as User** → Show limited view-only dashboard
2. **Logout → Login as Employee** → Show creation capabilities
3. **Logout → Login as Manager** → Show team analytics

**Talking Points:**
- "We have **role-based access control** for security"
- "**Users** can only view, **Employees** can create, **Managers** can oversee"
- "Each role has a **distinct dashboard** tailored to their needs"
- "System automatically **enforces permissions** based on login role"

---

## 🎯 Synopsis Match

Your synopsis requirement:
> "User ka alag dashboard, Employee ka alag, Manager ka alag"

✅ **Implemented:**
- 3 separate dashboards
- Different color themes (Blue/Green/Purple)
- Role-based permissions
- Different feature sets
- Automatic redirection based on role
- Protected routes for sensitive features

---

## 💡 Quick Switch Between Roles

Just logout and login again with different role selection:
- **User:** View only
- **Employee:** Full workflow access
- **Manager:** Team oversight

No need to restart servers! 🚀
