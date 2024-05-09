const express = require('express')
const { 
    getEnrollments,
    getMyEnrollments,
    getEnrollment,
    createUserEnroll,
    deleteEnroll
    
 } = require('../controllers/enrollmentController')

const router = express.Router()

// POST a new enrollment
router.post('/', createUserEnroll)

// GET a single enrollment
router.get('/:uid/:cid', getEnrollment)

// GET all enrollments
router.get('/', getEnrollments)

// GET all my enrollments
router.get('/:id', getMyEnrollments)

// DELETE a enrollment
router.delete('/:id', deleteEnroll)

// // UPDATE a enrollment
// router.put('/:id', updateEnroll)



module.exports = router