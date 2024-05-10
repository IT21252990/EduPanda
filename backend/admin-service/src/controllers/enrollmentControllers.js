const Enrollment = require('../models/enrollmentModel');

//@desc View all enrollments
//@route GET /api/enrollments
//@access public
getAllEnrollments = async (req, res) => {
    try {
      const enrollments = await Enrollment.find().populate('uid cid');
      res.json(enrollments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
}

//@desc View all enrollments for a specific learner
//@route GET /api/userEnrollments/:id
//@access public
const getAllLearnerEnrollments = async (req, res) => {
    const learnerId = req.params.id;

    try {
        // Find all enrollments for the specified learner ID
        const enrollments = await Enrollment.find({ uid: learnerId }).populate('uid', 'title'); // Populate 'cid' with 'title' from the Course model

        res.status(200).json(enrollments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllEnrollments,
    getAllLearnerEnrollments
};