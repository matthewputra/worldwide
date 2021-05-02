const Setting=require('../database/models/user_setting');

exports.addNewSettings=async(req,res,next)=>{
    try{
        let setting=await Setting.findOne({user_id:req.user._id});
        if(setting){
            if(req.body.course_id){
                setting.course.push({course_id:req.body.course_id});
                delete req.body.course_id;
            }
            

            const updates=Object.keys(req.body);
            const allowedUpdates=['is_enable','reminder_time','frequeny'];
            const isValid=updates.every((update)=>allowedUpdates.includes(update));
            if(!isValid){
                return res.send({
                    status: false,
                    code:400,
                    error: "Invalid updates"
                })
            }
            
            updates.forEach((update)=>setting[update]=req.body[update]);///updating

            
            await setting.save();

        }else{
            const newSetting=new Setting({
                user_id:req.user._id,
                is_enable:req.body.is_enable,
                reminder_time:req.body.time,
                frequeny:req.body.frequeny,
                course:[
                    {
                        course_id:req.body.course_id
                    }
                ]
            })
            await newSetting.save();
            setting=newSetting
        }   
        res.send({
            status: true,
            code: 200,
            data: setting
        })
    }catch(e){
        next(e);
    }
}




exports.getUserSettings=async(req,res,next)=>{
    try{
        const setting=await Setting.findOne({user_id:req.user._id});
        res.send({
            status: true,
            code: 200,
            data: setting
        })
    }catch(e){
        next(e);
    }
}

