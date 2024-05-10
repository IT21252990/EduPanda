const mongoose = require('mongoose')


const Schema = mongoose.Schema

const EnrollmentSchema = new Schema({
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    cid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    payment:{
        type: String,
        required: true
    },
    paymentType:{
        type: String,
        required: true
    }
},{timestamps: true})

module.exports = mongoose.model('Enrollment', EnrollmentSchema)

