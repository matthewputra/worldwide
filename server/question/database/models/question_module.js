const mongoose=require('mongoose');

const questionModuleSchema=new mongoose.Schema({
 
    course_id:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:'Course'
    },
    title:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    question_list:[
        {
            question:{
                type:String,
                required:true,
                trim:true
            },
            question_type:{
                type:Boolean,
                required:true
            },
            answer_list:[ String],
            correct_answer:{
                type:String,
                required:true
            }
        }
    ]
  
    
})


const Question_module=mongoose.model('Question_module',questionModuleSchema);

module.exports=Question_module;