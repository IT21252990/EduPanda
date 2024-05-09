const Enrollment = require('../models/enrollmentModel')
const mongoose = require('mongoose')

// get all enrollments
const getEnrollments = async (req, res) => {

    const enrollments = await Enrollment.find()

    res.status(200).json(enrollments)
}

// get all my enrollments
const getMyEnrollments = async (req, res) => {
  const {id} = req.params
  console.log('ididid',id)

  const enrollments = await Enrollment.find({ uid: id })
  console.log('enenenen',enrollments)

  res.status(200).json(enrollments)
}

const getEnrollment = async (req, res) => {
    const { uid, cid } = req.params;
    console.log(uid, cid);

    
    try {
        const enrollment = await Enrollment.findOne({ uid, cid });

        if (!enrollment) {
            return res.status(404).json({ error: 'Enrollment not found' });
        }

        res.status(200).json(enrollment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// create new enrollment
const createUserEnroll = async (req, res) => {
    const {uid, cid} = req.body
    console.log(uid, cid)

    // add doc to db
    try {
        const enroll = await Enrollment.create({uid, cid})
        res.status(200).json(enroll)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a enrollment
const deleteEnroll = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such enrollment'})
    }

    const enroll = await UserEnroll.findOneAndDelete({_id: id})

    if (!enroll) {
        return res.status(404).json({error: 'No such enrollment'})
    }

    res.status(200).json(enroll)
}


module.exports = {
    getEnrollments,
    getMyEnrollments,
    getEnrollment,
    createUserEnroll,
    deleteEnroll
}