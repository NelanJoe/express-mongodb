const express = require("express");
const router = express.Router();

const StudentController = require("../controllers/StudentsController");
const LecturerController = require("../controllers/LecturerController");
const { validateStudent } = require("../middlewares/StudentMiddleware");
const { validateLecturer } = require("../middlewares/LecturerMiddleware");

/**
 * Student Routes
 * */
router.get("/students", StudentController.index);
router.get("/students/:id", StudentController.show);
router.post("/students", validateStudent, StudentController.store);
router.put("/students/:id", validateStudent, StudentController.update);
router.delete("/students/:id", StudentController.destroy);

/**
 * Lecturer Routes
 * */
router.get("/lecturers", LecturerController.index);
router.get("/lecturers/:id", LecturerController.show);
router.post("/lecturers", validateLecturer, LecturerController.store);
router.put("/lecturers/:id", validateLecturer, LecturerController.update);
router.delete("/lecturers/:id", LecturerController.update);

module.exports = router;
