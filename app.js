const express = require('express');
const logger = require('./middleware/logger');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Built-in middleware to parse JSON request bodies
app.use(express.json());

// Custom Logger Middleware
app.use(logger);

// Welcome route
app.get('/', (req, res) => {
  res.status(200).json({
    message: "Welcome to Student Management REST API",
    endpoints: {
      "GET /students": "View all students",
      "GET /students/:id": "View student by ID",
      "POST /students": "Create a new student",
      "PUT /students/:id": "Update student by ID",
      "DELETE /students/:id": "Delete student by ID"
    }
  });
});

// Modular Routing for Students
app.use('/students', studentRoutes);

// 404 Handler for undefined routes
app.use((req, res, next) => {
  res.status(404).json({
    message: "Not Found",
    error: `Route ${req.originalUrl} not found on this server.`
  });
});

// Central Error Handling Middleware (500 Server Error)
app.use((err, req, res, next) => {
  console.error("Internal Server Error:", err.stack || err);
  res.status(500).json({
    message: "Server Error",
    error: err.message || "An unexpected error occurred."
  });
});

// Start the Express server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`===========================================`);
    console.log(` Student Management REST API Server Running`);
    console.log(` Port: http://localhost:${PORT}`);
    console.log(`===========================================`);
  });
}

module.exports = app;
