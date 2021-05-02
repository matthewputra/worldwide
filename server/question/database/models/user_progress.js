const mongoose=require('mongoose');

const userprogressSchema=new mongoose.Schema({
 
    user_id:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:'User'
    },
    module_list:[
        {
            module_id:{
                type:mongoose.Schema.ObjectId,
                required:true,
                ref:'Question_module'
            },
            completed_count:{
                type:Number,
                required:true
            }
        }

    ]
    
})


const User_progress=mongoose.model('User_progress',userprogressSchema);

module.exports=User_progress;