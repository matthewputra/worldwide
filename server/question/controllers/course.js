const Course=require('../database/models/course');

///add new course
exports.addNewCourse=async(req,res,next)=>{
    try{
        const newCourse=new Course({
            course_name:req.body.course_name,
            course_number:req.body.course_number,
            question_module:[]
        })
        await newCourse.save();
        res.send({
            status: true,
            code: 200,
            message: "Account new course Successfully",
            course_id:newCourse._id
        })
    }catch(e){
        next(e)
    }
}

//get all course
exports.getAllCourse=async(req,res,next)=>{
    try{
        const allcourse=await Course.find({});
        res.send({
            status: true,
            code: 200,
            data:allcourse
        })
    }catch(e){
        next(e)
    }
}

///get single course 
exports.getSingleCourse=async(req,res,next)=>{
    try{
        const course=await Course.findOne({_id:req.params.course_id});
        res.send({
            status: true,
            code: 200,
            data:course
        })
    }catch(e){
        next(e)
    }
}


exports.updateCourse=async(req,res,next)=>{
    try{
        const course=await Course.findOne({_id:req.params.course_id});
        if(!course){
            throw new Error("Course not found");
        }

        const updates=Object.keys(req.body);
        const allowedUpdates=['course_name','course_number'];
        const isValid=updates.every((update)=>allowedUpdates.includes(update));
        if(!isValid){
            return res.send({
                status: false,
                code:400,
                error: "Invalid updates"
            })
        }
        
        updates.forEach((update)=>course[update]=req.body[update]);///updating

        
        await course.save();
        res.send({
            status: true,
            code: 200,
            message: "Course updated Successfully",
            data:course
        })
    }catch(e){
        next(e)
    }
}

exports.deleteCourse=async(req,res,next)=>{
    try{
        const course=await Course.findOneAndDelete({_id:req.params.course_id});
        if(!course){
            throw new Error("Course not found");
        }
        res.send({
            status: true,
            code: 200,
            message: "Course deleted Successfully",

        })
    }catch(e){
        next(e)
    }
}

