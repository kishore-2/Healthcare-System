# Healthcare-System

## Project Concept

### Purpose:
A cloud-based healthcare management platform designed to streamline healthcare service delivery by improving transparency, accountability, and resource allocation across different healthcare levels.

### User Roles:
- **DDHS (District Hospital/Administration):**
  - Manages overall system operations.
  - Reviews and approves resource requests.
  - Monitors doctor attendance and performance.
- **PHC (Primary Health Center):**
  - Submits its own resource requests.
  - Manages and updates local attendance records.
  - Views resource requests from associated Sub-Centers.
- **Sub-Center:**
  - Submits resource requests for its local area.
  - Manages attendance for local doctors.

### Core Components:
- **Frontend:**
  - Static web pages (HTML, CSS, JavaScript) deployed via Azure Static Web Apps.
  - Separate dashboards and forms for login, attendance submission, resource requests, and approval system.
- **Backend:**
  - Azure Functions handling API requests (authentication, attendance submission, resource requests, data retrieval).
  - Azure SQL Database to store all data including user credentials, attendance records, and resource requests.
- **CI/CD Pipeline:**
  - Managed through GitHub Actions, ensuring automated builds and deployments to Azure.

## Detailed Working

### 1. User Authentication & Role Selection:
- **Login Page:**
  - Users select their role (DDHS, PHC, or Sub-Center) and enter their username and password.
  - Credentials are verified by an Azure Function that queries the Users table in the Azure SQL Database.
- **Role-Based Redirection:**
  - Successful login redirects users to their respective dashboards:
    - DDHS: Redirected to the DDHS Dashboard.
    - PHC/Sub-Center: Redirected to the PHC/Sub-Center Dashboard.

### 2. Doctor Attendance Management:
- **Attendance Submission Form:**
  - Doctors fill in their details (Name, ID) and mark their status (Present, Absent, or Available).
  - The form sends data via an HTTP POST request to an Azure Function.
  - The function uses an SQL output binding (or manual connection) to insert the attendance record into the DoctorAttendance table.
- **Data Retrieval:**
  - Dashboards fetch attendance records by calling a separate Azure Function that reads from the DoctorAttendance table.

### 3. Resource Request Workflow:
- **Request Submission:**
  - PHC/Sub-Center users submit resource requests (item name, quantity, requester) through a dedicated form.
  - The request is processed by an Azure Function and stored in the ResourceRequests table with a default “Pending” status.
- **Request Review & Approval:**
  - The DDHS dashboard displays all pending requests from both PHC and Sub-Centers.
  - DDHS users can review and approve or reject requests using an approval system (handled by a dedicated Azure Function).
  - Approved or rejected statuses are updated in the database and reflected in real time on dashboards.

### 4. Data Storage & Management:
- **Azure SQL Database:**
  - Stores all key data:
    - Users Table: Contains usernames, password hashes, and roles (DDHS, PHC, Sub-Center).
    - DoctorAttendance Table: Stores doctor attendance records with fields like DoctorID, DoctorName, Status, and Timestamp.
    - ResourceRequests Table: Stores resource requests with fields like RequestID, ItemName, Quantity, Requester, and Status.
- **Environment Variables & Security:**
  - Connection strings and other sensitive settings are stored in environment variables (using local.settings.json locally and Application Settings in Azure).

### 5. Deployment & CI/CD:
- **Azure Static Web Apps:**
  - Hosts the static frontend files, ensuring a responsive and scalable user interface.
- **Azure Functions:**
  - Provides serverless backend capabilities, ensuring efficient API processing.
- **GitHub Actions:**
  - Automates the build, test, and deployment process.
  - The workflow file uses a deployment token (or GitHub Identity) to securely deploy updates to Azure.

### 6. Monitoring & Maintenance:
- **Azure Application Insights:**
  - Used for logging and monitoring the performance and health of Azure Functions.
- **Alerts & Diagnostics:**
  - Configured in Azure to monitor for failures or performance issues, allowing for proactive maintenance.