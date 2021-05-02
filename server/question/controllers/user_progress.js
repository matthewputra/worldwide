const User_progress=require('../database/models/user_progress');

exports.addProgress=async(req,res,next)=>{
    try{
        const userProgress=await User_progress.findOne({user_id:req.user._id});
        if(userProgress){
            userProgress.module_list.push({
                module_id:req.body.module_id,
                completed_count:req.body.count
            })

            await userProgress.save();
        }else{
            const progress=new User_progress({
                user_id:req.user._id,
                module_list:[
                    {
                        module_id:req.body.module_id,
                        completed_count:req.body.count
                    }
                ]
            })

            await progress.save();
        }
        
        res.send({
            status: true,
            code: 200,
            message: "User progess added Successfully"
        })
    }catch(e){
        next(e);
    }
}

exports.getUserProgress=async(req,res,next)=>{
    try{
        const allprogress=await User_progress.findOne({user_id:req.user._id}).populate("module_list.module_id",{'title':1})
        res.send({
            status: true,
            code: 200,
            data: allprogress
        })
    }catch(e){
        next(e);
    }
}

exports.deleteProgress=async(req,res,next)=>{
    try{
        const allprogress=await User_progress.findOneAndUpdate({user_id:req.user._id},{
            $pull:{
                module_list:{module_id:req.params.module_id}
            }
        })
        res.send({
            status: true,
            code: 200,
            message: "User progess removed Successfully"
        })
    }catch(e){
        next(e);
    }
}