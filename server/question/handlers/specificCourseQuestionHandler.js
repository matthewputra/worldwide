const getCourseBasedQuestionHandler = async (req, res, { Question }) => {
    let reqBody = req.body
    // Course name error handler
    try {
        if (!reqBody.hasOwnProperty('courseName')) {
            res.status(400).send('course name not provided')
        }
    } catch (e) {
        res.status(400).send('course name not provided')
    }
    // Course number error handler
    try {
        if (!reqBody.hasOwnProperty('courseNumber')) {
            res.status(400).send('course number not provided')
        }
    } catch (e) {
        res.status(400).send('course number not provided')
    }

    // Get questions
    try {
        let courseName = reqBody.courseName
        let courseNum = reqBody.courseNumber
        let queryFilter = {
            'courseName': courseName,
            'courseNumber': courseNum
        }
        await Question.find(queryFilter).exec((err, questions) => {
            if (err) {
                res.status(500).send('unable to get questions')
            }
            res.status(200).json(questions)
        })
    } catch (e) {
        res.status(500).send('unable to get questions')
    }
}

const postCourseBasedQuestionHandler = async (req, res, { Question }) => {
    // Get course name
    let courseName = ''
    try {
        courseName = req.body.courseName
        if (!courseName) {
            res.status(400).send('unable to get course name')
        }
    } catch (e) {
        res.status(400).send('unable to get course name')
    }

    // Get course number
    let courseNumber = ''
    try {
        courseNumber = req.body.courseNumber
        if (!courseNumber) {
            res.status(400).send('unable to get course number')
        }
    } catch (e) {
        res.status(400).send('unable to get course number')
    }

    // Get question
    let question = ''
    try {
        question = req.body.question
        if (!courseNumber) {
            res.status(400).send('unable to get question')
        }
    } catch (e) {
        res.status(400).send('unable to get question')
    }

    // Get answers
    // CHECK LENGTH
    let answers = ''
    try {
        answers = req.body.answers
        if (!courseNumber) {
            res.status(400).send('unable to get answers')
        }
    } catch (e) {
        res.status(400).send('unable to get answers')
    }

    // Get correct answer
    let correctAnswer = ''
    try {
        answers = req.body.correctAnswer
        if (!courseNumber) {
            res.status(400).send('unable to get correct answer')
        }
    } catch (e) {
        res.status(400).send('unable to get correct answer')
    }

    const newQuestion = {
        'question': question,
        'courseName': courseName,
        'courseNumber': courseNumber,
        'answers': answers,
        'correctAnswer': correctAnswer
    }
    const query = new Question(newQuestion)
    await query.save((err, question) => {
        if (err) {
            res.status(500).send('unable to create new question')
        }
        res.status(201).json(question)
    })
}

module.exports = { getCourseBasedQuestionHandler, postCourseBasedQuestionHandler}
