const mongoose = require('mongoose');

// Define a schema for the content within a course
const contentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, enum: ['Lecture', 'Video', 'Quiz'], required: true },
    lectureNotes: { type: String }, // Add field for lecture notes
    videoURL: { type: String }, // Add field for video URL
    quizQuestions: [{ type: String }] // Add field for quiz questions
});

// Define the Course schema
const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    level: { type: String, required: true },
    category: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    duration: { type: Number, required: true },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'Instructor', required: true },
    status: { type: String, enum: ['Pending', 'Published'], default: 'Pending' },
    enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
    contents: [contentSchema] // Embed the content schema within the course schema
});

module.exports = mongoose.model('Course', courseSchema);
