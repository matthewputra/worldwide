const mongoose=require('mongoose');

const courseSchema=new mongoose.Schema({
 
    course_name:{
        type:String,
        trim:true,
        required:true
    },
    course_number:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },

    question_module:[
        {
            type:mongoose.Schema.ObjectId,
            ref:'Question_module'
        }
    ]
    
})


const Course=mongoose.model('Course',courseSchema);

module.exports=Course;