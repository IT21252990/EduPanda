const express = require("express");
const {
    getAllEnrollments,
    getAllLearnerEnrollments
} = require("../controllers/enrollmentControllers");

const router = express.Router();

// GET all entrollments
router.get("/", getAllEnrollments);

// GET all enrollments for leaners
router.get("/userEnrollments/:id", getAllLearnerEnrollments);





module.exports = router;