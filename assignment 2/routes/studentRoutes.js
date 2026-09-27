const express = require('express');
const router = express.Router();
const students = require('../data/students');

/**
 * @route   GET /students
 * @desc    View all students
 * @access  Public
 * @status  200 OK - Success
 */
router.get('/', (req, res) => {
  res.status(200).json(students);
});

/**
 * @route   GET /students/:id
 * @desc    View student by ID
 * @access  Public
 * @status  200 OK - Success | 400 Bad Request - Invalid Input | 404 Not Found - Student Not Found
 */
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({
      message: "Invalid Input",
      error: "Student ID must be a valid number."
    });
  }

  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({
      message: "Student Not Found"
    });
  }

  res.status(200).json(student);
});

/**
 * @route   POST /students
 * @desc    Create a new student
 * @access  Public
 * @status  201 Created - New Student Created | 400 Bad Request - Invalid Input
 */
router.post('/', (req, res) => {
  const { name, course } = req.body;

  // Validate input
  if (!name || !course || typeof name !== 'string' || typeof course !== 'string' || !name.trim() || !course.trim()) {
    return res.status(400).json({
      message: "Invalid Input",
      error: "Both 'name' and 'course' are required fields."
    });
  }

  // Generate new unique ID (auto-increment)
  const newId = students.length > 0 ? Math.max(...students.map((s) => s.id)) + 1 : 1;

  const newStudent = {
    id: newId,
    name: name.trim(),
    course: course.trim()
  };

  students.push(newStudent);

  res.status(201).json({
    message: "New Student Created",
    student: newStudent
  });
});

/**
 * @route   PUT /students/:id
 * @desc    Update an existing student
 * @access  Public
 * @status  200 OK - Success | 400 Bad Request - Invalid Input | 404 Not Found - Student Not Found
 */
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({
      message: "Invalid Input",
      error: "Student ID must be a valid number."
    });
  }

  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({
      message: "Student Not Found"
    });
  }

  const { name, course } = req.body;

  if (name === undefined && course === undefined) {
    return res.status(400).json({
      message: "Invalid Input",
      error: "At least one field ('name' or 'course') is required to update."
    });
  }

  if (name !== undefined) {
    if (typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({
        message: "Invalid Input",
        error: "'name' must be a non-empty string."
      });
    }
    student.name = name.trim();
  }

  if (course !== undefined) {
    if (typeof course !== 'string' || !course.trim()) {
      return res.status(400).json({
        message: "Invalid Input",
        error: "'course' must be a non-empty string."
      });
    }
    student.course = course.trim();
  }

  res.status(200).json({
    message: "Success",
    student: student
  });
});

/**
 * @route   DELETE /students/:id
 * @desc    Delete student by ID
 * @access  Public
 * @status  200 OK - Success | 400 Bad Request - Invalid Input | 404 Not Found - Student Not Found
 */
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({
      message: "Invalid Input",
      error: "Student ID must be a valid number."
    });
  }

  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Student Not Found"
    });
  }

  const deletedStudent = students.splice(index, 1)[0];

  res.status(200).json({
    message: "Success",
    student: deletedStudent
  });
});

module.exports = router;
