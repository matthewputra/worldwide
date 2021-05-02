const Course=require('../database/models/course');
const Question_module=require('../database/models/question_module');

exports.addQuestionModule=async(req,res,next)=>{
    try{
        const course=await Course.findOne({_id:req.body.course_id});
        if(!course){
            throw new Error("Course not found");
        }
        
        const newModule=new Question_module({
            course_id:req.body.course_id,
            title:req.body.title,
            question_list:[]
        })
        await newModule.save();

        course.question_module.push(newModule._id);
        await course.save();

        res.send({
            status: true,
            code: 200,
            message: "Added new question module Successfully",
            module_id:newModule._id
        })
    }catch(e){
        next(e);
    }
}

exports.addNewQuestion=async(req,res,next)=>{
    try{
        const modules=await Question_module.findOne({_id:req.params.module_id});
        if(!modules){
            throw new Error("Question module not found");
        }
        modules.question_list.push(req.body);
        await modules.save();
        res.send({
            status: true,
            code: 200,
            message: "Added new question Successfully"
        })
    }catch(e){
        next(e);
    }
}

exports.getSingleQustionList=async(req,res,next)=>{
    try{
        const modules=await Question_module.findOne({_id:req.params.module_id});

        res.send({
            status: true,
            code: 200,
            data: modules
        })
    }catch(e){
        next(e);
    }
}

exports.getAllQuestionModuleForCourse=async(req,res,next)=>{
    try{
        const modules=await Question_module.find({course_id:req.params.course_id});

        res.send({
            status: true,
            code: 200,
            data: modules
        })
    }catch(e){
        next(e);
    }
}


exports.getAllQuestionModule=async(req,res,next)=>{
    try{
        const all_module=await Question_module.find({});
        res.send({
            status: true,
            code: 200,
            data: all_module
        })
    }catch(e){
        next(e);
    }
}



exports.deleteQuestionModule=async(req,res,next)=>{
    try{
        const modules=await Question_module.findOneAndDelete({_id:req.params.module_id});
        if(!modules){
            throw new Error("Question module not found")
        }
        res.send({
            status: true,
            code: 200,
            message: "Deleted  question module Successfully"
        })
    }catch(e){
        next(e);
    }
}