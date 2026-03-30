React CRUD Application using Express.js and MySQL

This is a full-stack CRUD (Create, Read, Update, Delete) application built using React for the frontend, Express.js for the backend, and MySQL as the database. It demonstrates how to build and connect a complete web application with API integration.

📌 Introduction

This project demonstrates the implementation of a CRUD application using modern web technologies. The frontend is developed using React, while the backend is built with Express.js and connected to a MySQL database. Axios is used for API communication, and CORS enables cross-origin requests.

The application allows users to perform basic operations such as creating, viewing, updating, and deleting records.

Technologies Used
React – Frontend UI development
Express.js – Backend server framework
MySQL 2 – Database management
Axios – HTTP client for API requests
CORS – Enables cross-origin communication
Nodemon – Auto-restart server during development

Installation:
🔹 Prerequisites
Node.js installed
MySQL installed
🎨 Frontend Setup
Create a React project:
npm create vite@latest frontend
Navigate to the folder:
cd frontend
Install dependencies:
npm install axios react-router-dom
Start the frontend:
npm run dev
🔧 Backend Setup
Create backend folder:
mkdir backend
cd backend
Initialize Node.js project:
npm init -y
Install dependencies:
npm install express mysql2 cors nodemon
Create server.js file and add:
import express from "express";
import cors from "cors";
import mysql from "mysql2";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
Update package.json:
"type": "module",
"scripts": {
  "start": "nodemon server.js"
}
Run backend:
npm start

Database Setup
Create database in MySQL:
CREATE DATABASE your_database;
Create table:
CREATE TABLE user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255)
);
Add database connection in server.js:
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "your_password",
  database: "your_database",
});

Sample API Endpoint
app.get("/", (req, res) => {
  const query = "SELECT * FROM user";
  connection.query(query, (err, result) => {
    if (err) return res.json({ message: err });
    return res.json(result);
  });
});

Features
Create new records
View all records
Update existing records
Delete records
REST API integration
Full-stack architecture

Conclusion

This project demonstrates how to build a full-stack CRUD application using React, Express.js, and MySQL. It provides a solid foundation for understanding frontend-backend integration, API development, and database operations.
