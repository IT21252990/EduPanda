const express = require("express");
const {
    getAllCourses
} = require("../controllers/courseControllers");

const router = express.Router();

// GET all Courses
router.get("/", getAllCourses);

module.exports = router;