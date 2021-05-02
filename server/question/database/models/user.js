const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const userSchema=new mongoose.Schema({
 
    user_name:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },

    password:{
        type:String
    },
  
    
})

userSchema.methods.toJSON = function(){
    const user=this
    const userObject= user.toObject()
    delete userObject.password
    return userObject
}

userSchema.pre('save',async function(next){
    const user=this
    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,8)
    }
    next()
})

userSchema.methods.isValidPassword = async function (password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
};

const User=mongoose.model('User',userSchema);

module.exports=User;