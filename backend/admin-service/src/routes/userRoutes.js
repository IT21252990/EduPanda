const express = require("express");
const {
    getAllUsers,
    getAllInstructors,
    getAllLearners
} = require("../controllers/userControllers");

const router = express.Router();

// GET all learners
router.get("/", getAllUsers); 
// GET all instructors
router.get("/instructors", getAllInstructors);
// GET all learners
router.get("/learners", getAllLearners); 


module.exports = router;