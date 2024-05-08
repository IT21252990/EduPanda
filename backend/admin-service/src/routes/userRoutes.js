const express = require("express");
const {
    getAllInstructors,
    getAllLearners
} = require("../controllers/userControllers");

const router = express.Router();

// GET all instructors
router.get("/instructors", getAllInstructors);
// GET new learners
router.get("/learners", getAllLearners); 


module.exports = router;