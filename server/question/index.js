// const mongoose = require('mongoose')
// const express = require('express')
// const { questionSchema } = require('./schemas/question')
// const { getCourseBasedQuestionHandler, postCourseBasedQuestionHandler} = require('./handlers/specificCourseQuestionHandler')
// const mongoEndpoint = 'mongodb://mongoContainer:27017/questions?authSource=admin'
const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');

require('dotenv').config();
require('./database/config/connection');


const app=express();
const port=process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.send({
        msg:"hello"
    })
})

const userProfileRouter=require('./routers/user_profile');
const courseRouter=require('./routers/course');
const questionModuleRouter=require('./routers/question_module');
const userProgressRouter=require('./routers/user_progress');
const userSettingRouter=require('./routers/user_settings');

app.use(userProfileRouter);
app.use(courseRouter);
app.use(questionModuleRouter);
app.use(userProgressRouter);
app.use(userSettingRouter);

/////error handling route
app.use((error, req, res, next) => {
    res.send({
        status: false,
        code:400,
        error: error.message
    })
})


app.listen(port,()=>{
    console.log('server is running at port',port);
})