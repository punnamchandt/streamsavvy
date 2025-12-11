# StreamSavvy— Your Ultimate Entertainment Destination

StreamSavvy is a complete frontend application simulating a modern video streaming service. It demonstrates mastery of React hooks, context-based state management, client-side routing, and external API communication (mocked via JSON-Server).

# Setup & Installation

To run this project, you need Node.js and npm installed.

1.  ** Repository**
    

2.  **Install Dependencies**
    Install all required packages (React, Tailwind, Axios, Router, Toastify, etc.).
    ```bash
    npm install
    ```

3.  **Start the Backend (JSON-Server)**
    This command watches the `db.json` file on port 5000, enabling all CRUD operations.
    **You must run this command in a separate terminal window.**
    ```bash
    npx json-server --watch db.json --port 5000
    ```

4.  **Start the Frontend**
    Open a third terminal window and run the Vite development server.
    ```bash
    npm run dev
    ```

5.  **Access App**
    Open `http://localhost:5173` (or the URL provided by Vite) in your browser.

---

## 🛠 Project Architecture

| Feature | Technology | Implementation Detail |
| :--- | :--- | :--- |
| **Frontend** | React (Vite) | Functional Components & Hooks (useState, useEffect, useContext). |
| **Styling** | Tailwind CSS | Utility-first approach, used for full responsiveness and **Dark/Light mode**. |
| **Routing** | React Router DOM | Manages client-side navigation between pages (Home, Browse, Details, etc.). |
| **API Client** | Axios | Dedicated service layer (`services/movieService.js`) for CRUD operations. |
| **Mock Backend** | JSON-Server | Simulates a REST API for `/movies` and `/favorites` endpoints. |
| **Global State** | Context API | Used for `ThemeProvider`, `PlayerContext`, and `AuthProvider`. |

**Mock Authentication Credentials (for testing):**
* **Email:** `test@test.com`
* **Password:** `123`

---
*StreamSavvy – Your Ultimate Entertainment Destination

StreamSavvy is a modern frontend streaming application built using React, Tailwind CSS, and JSON-Server.
It simulates a real video-streaming platform and demonstrates clean architecture, reusable components, context-based state management, routing, and API communication using Axios.


*Features

Responsive user interface with Light/Dark mode

Browse movies and view detailed information

Add and remove movies from favorites

Mock authentication system

Global state management using React Context API

CRUD operations through JSON-Server

Dedicated API layer using Axios

*Technology Stack

| Feature          | Technology Used  | Description                                                       |
| ---------------- | ---------------- | ----------------------------------------------------------------- |
| Frontend         | React (Vite)     | Functional components and hooks (useState, useEffect, useContext) |
| Styling          | Tailwind CSS     | Utility-first responsive styling                                  |
| Routing          | React Router DOM | Client-side navigation                                            |
| HTTP Client      | Axios            | Centralized API service layer                                     |
| Backend (Mock)   | JSON-Server      | REST API for movies and favorites                                 |
| State Management | Context API      | ThemeProvider, AuthProvider, PlayerProvider                       |

## Setup and Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd streamsavvy
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start JSON-Server (Backend)
Run this in a separate terminal window.  
This starts the mock backend on port 5000 using `db.json`.

```bash
npx json-server --watch db.json --port 5000
```

Available API Endpoints:
- http://localhost:5000/movies  
- http://localhost:5000/favorites  

### 4. Start the Frontend (React + Vite)
```bash
npm run dev
```

### 5. Access the Application
Open the development URL shown in the terminal (commonly):
```
http://localhost:5173
```


## Project Structure

The folder structure of this project is as follows:

```
streamsavvy/
├── node_modules/         
├── public/               
├── src/                   
│
├── db.json               
├── index.html             
├── package.json           
├── package-lock.json      
│
├── postcss.config.js      
├── tailwind.config.js     
├── vite.config.js         
└── README.md              
```

### Folder Details

**node_modules/**  
Contains all installed npm packages. This folder is auto-generated and should not be edited manually.

**public/**  
Holds static assets that are served directly. These files do not go through Vite's processing.

**src/**  
Contains all the main source code for the application, including:
- Components  
- Pages  
- Context Providers  
- Services (API handlers)  
- Hooks  
- App.jsx (root component)  

**db.json**  
Mock database file used by JSON-Server to simulate backend API endpoints.

**index.html**  
Main HTML template into which the React app is injected.

**package.json**  
Defines project metadata, npm scripts, dependencies, and devDependencies.

**package-lock.json**  
Locks the specific versions of dependencies for consistent installs across systems.

**postcss.config.js**  
Configuration for PostCSS, used along with Tailwind CSS.

**tailwind.config.js**  
Configuration file for customizing Tailwind CSS (colors, themes, screens, etc.).

**vite.config.js**  
Configuration for Vite, handling bundling, plugins, and development server settings.

**README.md**  
Documentation file that explains the project.
