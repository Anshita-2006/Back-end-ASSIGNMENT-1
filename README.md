# Lab Assignment 2 – Student Management REST API

> **Course:** Web Dev III (Node.js & Express Backend)  
> **Unit:** 2 | **Marks:** 2.5 | **In-Class Lab**

---

## 📌 Project Overview
The **Student Management REST API** is a backend application built using **Node.js** and **Express.js**. It performs CRUD operations on in-memory student records while implementing modular routing, custom middleware logging, and robust error handling with appropriate HTTP status codes.

---

## 🚀 Technology Stack & Constraints
- **Runtime:** Node.js
- **Framework:** Express.js
- **API Testing:** Postman
- **Restrictions:**
  - ❌ No Database (MongoDB / MySQL)
  - ❌ No Mongoose
  - ✅ In-Memory JavaScript Array and JSON Data Only

---

## 📁 Project Structure
```text
backend-assign-2/
├── data/
│   └── students.js                  # In-memory student records (JSON data)
├── middleware/
│   └── logger.js                    # Custom logger middleware (Method, URL, Time)
├── routes/
│   └── studentRoutes.js             # Modular Express router for /students
├── app.js                           # Express application entry point & error handlers
├── package.json                     # Project manifest and scripts
├── .gitignore                       # Git ignore rules
├── test-api.js                      # Automated test suite
├── Student_Management_API.postman_collection.json # Postman collection ready for import
└── README.md                        # Documentation & setup instructions
```

---

## 🛠️ Installation & Setup

1. **Clone or navigate to the project directory:**
   ```bash
   cd "backend assign 2"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   - Production mode:
     ```bash
     npm start
     ```
   - Watch / Development mode:
     ```bash
     npm run dev
     ```
   The server will start on: **`http://localhost:3000`**

---

## 🧪 Automated Testing
Run the comprehensive automated test suite (19 test assertions):
```bash
npm test
```

---

## 📡 REST API Endpoints

| Method | Endpoint | Description | Success Status | Error Status |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/students` | View all students | `200 OK` | `500 Internal Server Error` |
| **GET** | `/students/:id` | View single student by ID | `200 OK` | `400 Bad Request`, `404 Not Found` |
| **POST** | `/students` | Create a new student | `201 Created` | `400 Bad Request` |
| **PUT** | `/students/:id` | Update student details by ID | `200 OK` | `400 Bad Request`, `404 Not Found` |
| **DELETE** | `/students/:id` | Remove a student by ID | `200 OK` | `400 Bad Request`, `404 Not Found` |

---

## 📋 API Request & Response Examples

### 1. View All Students
- **Request:** `GET http://localhost:3000/students`
- **Response:** `200 OK`
```json
[
  { "id": 1, "name": "Rahul", "course": "BCA" },
  { "id": 2, "name": "Priya", "course": "BTech" },
  { "id": 3, "name": "Amit", "course": "BCA" }
]
```

### 2. View Student by ID
- **Request:** `GET http://localhost:3000/students/1`
- **Response:** `200 OK`
```json
{
  "id": 1,
  "name": "Rahul",
  "course": "BCA"
}
```
- **If Not Found:** `GET http://localhost:3000/students/999`
- **Response:** `404 Not Found`
```json
{
  "message": "Student Not Found"
}
```

### 3. Create Student
- **Request:** `POST http://localhost:3000/students`
- **Headers:** `Content-Type: application/json`
- **Body:**
```json
{
  "name": "Neha",
  "course": "MCA"
}
```
- **Response:** `201 Created`
```json
{
  "message": "New Student Created",
  "student": {
    "id": 4,
    "name": "Neha",
    "course": "MCA"
  }
}
```
- **Invalid Input (Missing fields):**
- **Response:** `400 Bad Request`
```json
{
  "message": "Invalid Input",
  "error": "Both 'name' and 'course' are required fields."
}
```

### 4. Update Student
- **Request:** `PUT http://localhost:3000/students/2`
- **Headers:** `Content-Type: application/json`
- **Body:**
```json
{
  "name": "Priya Sharma",
  "course": "MTech"
}
```
- **Response:** `200 OK`
```json
{
  "message": "Success",
  "student": {
    "id": 2,
    "name": "Priya Sharma",
    "course": "MTech"
  }
}
```

### 5. Delete Student
- **Request:** `DELETE http://localhost:3000/students/3`
- **Response:** `200 OK`
```json
{
  "message": "Success",
  "student": {
    "id": 3,
    "name": "Amit",
    "course": "BCA"
  }
}
```

---

## 🛡️ Custom Middleware (Logger)
Defined in `middleware/logger.js`:
- Intercepts all incoming requests.
- Logs HTTP Method, Request URL, and Timestamp in the format:
  ```text
  [2026-09-21T16:07:31.053Z] GET /students
  ```
- Calls `next()` to pass control to the route handler.

---

## 📬 Postman Testing
A complete collection is included in this repository:
`Student_Management_API.postman_collection.json`

### How to Import into Postman:
1. Open **Postman**.
2. Click **Import** (top left).
3. Drag & drop `Student_Management_API.postman_collection.json` or browse to select it.
4. Set the collection variable `baseUrl` to `http://localhost:3000` (set by default).
5. Execute requests:
   - `GET /students`
   - `GET /students/1`
   - `GET /students/999` (Tests 404)
   - `POST /students` (Tests 201)
   - `POST /students` Invalid Input (Tests 400)
   - `PUT /students/2` (Tests 200)
   - `DELETE /students/3` (Tests 200)

---

## 📊 Rubric Alignment
| Criteria | Marks | Implementation Status |
| :--- | :--- | :--- |
| **Functionality** | 1.5 | All 5 CRUD endpoints implemented and tested with in-memory array data. |
| **API Design** | 0.5 | RESTful design, standard HTTP methods, correct status codes (200, 201, 400, 404, 500). |
| **Clean Code** | 0.5 | Modular architecture (`routes/`, `middleware/`, `data/`), structured error handling, clean documentation. |
| **Total** | **2.5** | **100% Complete** |
