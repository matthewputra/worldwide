const Schema = require('mongoose').Schema

const questionSchema = new Schema({
    question: {type: String, required: true},
    courseName: {type: String, required: true},
    courseNumber: {type: Number, required: true},
    answers: {type: [String], required: true}, // must be length of 4,
    correctAnswer: {type: String, required: true} // A OR B OR C OR D
})

module.exports = { questionSchema }