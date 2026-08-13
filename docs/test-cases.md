# CivicFix Test Cases

## 1. Introduction

Testing was performed to verify that the CivicFix application functions correctly for both citizens and administrators.

The testing covers authentication, issue reporting, issue tracking, administration, and status updates.

---

## 2. Functional Test Cases

| Test ID | Test Case | Input / Action | Expected Result | Status |
|---|---|---|---|---|
| TC-01 | Citizen Registration | Enter valid name, email and password | Citizen account is created successfully | PASS |
| TC-02 | Citizen Login | Enter valid citizen credentials | Citizen dashboard opens | PASS |
| TC-03 | Invalid Login | Enter incorrect email/password | Login failure message is displayed | PASS |
| TC-04 | Admin Login | Enter admin credentials | Admin dashboard opens | PASS |
| TC-05 | Report Issue | Enter issue title, description, location and category | Issue is successfully submitted | PASS |
| TC-06 | View My Reports | Citizen clicks My Reports | Citizen's submitted reports are displayed | PASS |
| TC-07 | View Issue Status | Citizen opens Issue Status | Current status of reports is displayed | PASS |
| TC-08 | Admin View Reports | Admin opens Admin Dashboard | All citizen reports are displayed | PASS |
| TC-09 | Update Issue Status | Admin changes status to In Progress | Issue status is updated successfully | PASS |
| TC-10 | Resolve Issue | Admin changes status to Resolved | Issue becomes Resolved | PASS |
| TC-11 | Citizen Status Verification | Citizen opens My Reports after admin update | Updated status is displayed | PASS |
| TC-12 | Logout | User clicks Logout | User is redirected to Login page | PASS |

---

## 3. Security Test Cases

| Test ID | Test Case | Expected Result | Status |
|---|---|---|---|
| ST-01 | Access dashboard without login | User is redirected to Login | PASS |
| ST-02 | Access admin page as citizen | Citizen is denied admin access | PASS |
| ST-03 | Access protected API without token | Request is rejected | PASS |
| ST-04 | Access admin API as citizen | Request is rejected with forbidden response | PASS |
| ST-05 | Password storage | Password is stored as a hashed value | PASS |

---

## 4. Integration Testing

The following integration flow was tested:

```text
Citizen Login
     ↓
Citizen Dashboard
     ↓
Report Issue
     ↓
FastAPI Backend
     ↓
PostgreSQL Database
     ↓
Admin Dashboard
     ↓
Update Issue Status
     ↓
PostgreSQL Database
     ↓
Citizen My Reports
     ↓
Updated Status Displayed