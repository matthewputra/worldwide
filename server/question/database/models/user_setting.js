const mongoose=require('mongoose');

const SettingSchema=new mongoose.Schema({
 
    user_id:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:'User'
    },
    is_enable:{
        type:Boolean,
        required:true
    },
    reminder_time:{
        type:String
    },
    frequeny:{
        type:String,
        required:true
    },
    course:[
        {
            course_id:{
                type:mongoose.Schema.ObjectId,
                required:true,
                ref:'Course'
            }
        }
    ]
    
})


const Setting=mongoose.model('Setting',SettingSchema);

module.exports=Setting;