# StreamSavvy— Your Ultimate Entertainment Destination

StreamSavvy is a modern frontend streaming application built using React, Tailwind CSS, and JSON-Server.
It simulates a real video-streaming platform and demonstrates clean architecture, reusable components, context-based state management, routing, and API communication using Axios.


**#Features**

Responsive user interface with Light/Dark mode

Browse movies and view detailed information

Add and remove movies from favorites

Mock authentication system

Global state management using React Context API

CRUD operations through JSON-Server

Dedicated API layer using Axios

**#Technology Stack**

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

