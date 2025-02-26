# Employee Management Application

## Overview
A web-based platform to manage employees efficiently with role-based access control.

## Features
- **Authentication:** Secure login with JWT.
- **Roles:**
  - **Admin**: Creates users, assigns roles, and manages tasks.
  - **Manager**: Assigns tasks to employees.
  - **Employee**: Views and completes tasks.
- **Task Management:** Admins/Managers assign tasks; Employees update status.
- **Tech Stack:** React, Node.js, Express, MongoDB.

## Installation
1. Clone repo & install dependencies:
   ```sh
   git clone <repo-link> && cd employee-management
   npm install
   ```
2. Create `.env` file:
   ```env
   JWT_SECRET=<your_secret>
   MONGO_URL=<your_mongo_url>
   PORT=7000
   ```
3. Run backend & frontend:
   ```sh
   npm start
   cd frontend && npm start
   ```

## Demo Credentials
- **Admin:** admin@gmail.com | `admin`
- **Employee:** employee@gmail.com | `employee`

## Deployment
[Live App](https://employeemanagement-ccan.onrender.com)

## License
MIT License

