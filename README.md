# Todo App

### This is a full-stack Todo application built with NestJS (for the backend) and Next.js (for the frontend). The application supports basic CRUD operations and includes authentication using JWT (JSON Web Tokens). It is built with TypeScript for both frontend and backend.

![Todo App Screenshot](frontend/public/todos.png)
![Todo App Screenshot](frontend/public/register.png)
![Todo App Screenshot](frontend/public/create.png)
![Todo App Screenshot](frontend/public/update.png)


## Features

- User authentication (login & register) with JWT
- Create, read, update, and delete todos
- Todos have a description, priority level (1, 2, or 3), due date, and completion status
- Secure API endpoints with authentication
- Modern UI using Next.js


## Tech Stack

- Backend (NestJS)
- NestJS (TypeScript-based Node.js framework)
- Prisma (ORM for database interaction)
- PostgreSQL (Database)
- JWT (Authentication)

  
## Frontend (Next.js)

- Next.js (React framework for SSR & CSR)
- React Hook Form + Zod (Form handling & validation)


## Installation

- Prerequisites
- Ensure you have the following installed:
- Node.js (LTS version recommended)
- PostgreSQL

## Backend Setup (NestJS)

1- Clone the repo:
![Todo App Screenshot](frontend/public/carbon.png)
2- Install dependencies:<br>
![Todo App Screenshot](frontend/public/carbon(1).png) <br>
3- Configure environment variables:
  - Create a .env file in the backend directory.
  - Add the following variables:
  - ![Todo App Screenshot](frontend/public/carbon(2).png)


4- Run database migrations:<br>
![Todo App Screenshot](frontend/public/carbon(3).png) <br>
5- Start the backend server:<br>
![Todo App Screenshot](frontend/public/carbon(5).png) <br>


## Frontend Setup (Next.js)

1- Navigate to the frontend directory: <br>
![Todo App Screenshot](frontend/public/carbon(6).png) <br>
2- Install dependencies: <br>
![Todo App Screenshot](frontend/public/carbon(1).png) <br>
3- Start the Next.js development server:<br>
![Todo App Screenshot](frontend/public/carbon(7).png) <br>


## Running the App

Once both backend and frontend are running, open http://localhost:3000 in your browser to access the Todo App.
