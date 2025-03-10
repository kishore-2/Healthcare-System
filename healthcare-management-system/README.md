# Healthcare Management System

## Overview
The Healthcare Management System is a cloud-based application designed to streamline the management of healthcare resources and attendance tracking for doctors. This project utilizes Azure Functions for the backend and a static frontend for user interaction.

## Project Structure
```
healthcare-management-system
├── functions
│   ├── authenticate
│   ├── getAttendance
│   ├── getResourceRequests
│   ├── submitAttendance
│   └── submitResourceRequest
├── www
├── .gitignore
├── host.json
├── local.settings.json
├── package.json
└── README.md
```

## Features
- **User Authentication**: Secure login for different roles (DDHS, PHC, Sub-Center).
- **Attendance Management**: Doctors can submit their attendance, and administrators can view attendance records.
- **Resource Requests**: Users can submit requests for resources, and administrators can view all requests.

## Setup Instructions
1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd healthcare-management-system
   ```

2. **Install Dependencies**
   Ensure you have Node.js installed, then run:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Update the `local.settings.json` file with your Azure SQL connection string and other necessary environment variables.

4. **Run the Azure Functions Locally**
   Use the Azure Functions Core Tools to run the functions:
   ```bash
   func start
   ```

5. **Access the Frontend**
   Open `www/index.html` in your web browser to access the login page.

## Usage
- **Login**: Users can select their role and enter their credentials to access the system.
- **Dashboard**: Depending on the role, users will have access to different functionalities such as viewing attendance records or submitting resource requests.

## Security
- Credentials are verified against a secure Azure SQL database.
- Connection strings and sensitive information are stored in environment variables.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.