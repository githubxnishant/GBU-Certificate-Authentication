# GBU Certificate Authentication

**A web application to validate and manage certificates issued by GBU.**

## Table of Contents

1. [Features](#features)  
2. [Tech Stack](#tech-stack)  
3. [Folder Structure](#folder-structure)  
4. [Installation](#installation)  
5. [Screenshots](#screenshots)



## Features

- **Admin Dashboard:** Secure admin login to manage certificates.  
- **Certificate Creation:** Add new certificates with details like Student Name, Roll No, Event, Fest, Date, and Category.  
- **Certificate Verification:** Users can verify a certificate using its ID.  
- **Website Traffic Counter:** Tracks total visits across the website, excluding certain routes.  
- **Responsive UI:** Works on desktops and tablets with a clean, professional design.  
- **Persistent Redux State:** State persists across page reloads for admin and app data.  


## Tech Stack

- **Languages:** TypeScript, JavaScript, EJS, HTML, CSS
- **Frontend:** React.js, TailwindCSS, Redux Toolkit, Axios, React Router DOM  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose)  
- **Authentication:** JWT Token-based authentication, Bcrypt based password-hashing


## Folder Structure

```
/frontend
├─ /public # Images, icons
├─ /src
│ ├─ /components # Reusable UI components
| |─ /constants # Demo data for dev
| |─ /context # Protected route
│ ├─ /pages # React pages (Home, Dashboard, Certificate    Details)
│ ├─ /store # Redux slices and store
| |─ /utils # Utility
│ ├─ globals.css # Stylesheet
│ └─ main.tsx # Entry point
|
/backend
├─ /controllers # API controllers
├─ /models # Mongoose models
├─ /routes # Express routes
├─ /middleware # JWT auth, verification middleware
|─ /views # EJS component
|─ db.js # Database handler
└─ index.js # Entry point
```

## Installation

### Backend Setup

1. Clone the repository:  

   ```bash
   git clone https://github.com/githubxnishant/GBU-Certificate-Authentication.git

   cd backend
   ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the backend folder:

    ```bash 
    PORT = 5000

    FRONTEND_URL = http://localhost:5173

    MONGODB_URI = <your_mongodb_connection_string>

    JWT_SECRET_KEY = <your_jwt_secret>
    ```

4. Start the backend server:

    ```bash
    node index.js
    ```

### Frontend Setup

1. Navigate to the frontend folder:

    ```
    cd frontend
    ```

2. Install dependencies:

    ```
    npm install
    ```

3. Create a `.env` file in the frontend folder:
    ```
    VITE_BACKEND_URL = http://localhost:5000
    ```

4. Start the frontend development server:

    ```
    npm run dev
    ```

5. Access the application at `http://localhost:5173/` in your browser.


## Screenshots

### Homepage

![Homepage](/frontend/src/previews/Homepage.png)

### Verification Page

![Verification](/frontend/src/previews/Verification.png)

### Admin Dashboard

![Dashboard](/frontend//src//previews//Dashboard.png)

### Records Page

![Records](/frontend/src/previews/Records.png)
