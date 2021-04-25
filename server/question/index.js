const mongoose = require('mongoose')
const express = require('express')
const { questionSchema } = require('./schemas/question')
const { getCourseBasedQuestionHandler, postCourseBasedQuestionHandler} = require('./handlers/specificCourseQuestionHandler')
const mongoEndpoint = 'mongodb://matthewputra:11032001@mongo:27017/capstone'

const app = express()
app.use(express.json())

// Models for MongoDB
const Question = mongoose.model("Question", questionSchema)

// Start mongoDB connection
const connect = () => {
    mongoose.connect(mongoEndpoint)
}

// Data passer function for handlers
const RequestWrapper = (handler, DataPasser) => {
    return (req, res) => {
        handler(req, res, DataPasser)
    }
}

// Start routing handlers here
app.route('/question')
    .get(RequestWrapper(getCourseBasedQuestionHandler, { Question }))
    .post(RequestWrapper(postCourseBasedQuestionHandler, { Question }))

connect()
mongoose.connection.on('error', console.error)
    .on('disconnected', connect)
    .once('open', main)

async function main() {
    const addr = process.env.MESSAGESADDR || "questionContainer:5200"
    const [host, port] = addr.split(":")

    app.listen(Number(port), host, () => {
        console.log(`server listening at port ${port}`)
    })
}