const User=require('../database/models/user');
const jwt=require('jsonwebtoken');

//user registration
exports.registerUser=async(req,res,next)=>{
    try{
        const newUser=new User({
            user_name:req.body.user_name,
            email:req.body.email,
            password:req.body.password
        })

        await newUser.save();
        res.send({
            status: true,
            code: 200,
            message: "Account Created Successfully"
        })
    }catch(e){
        next(e);
    }
}


//user login

exports.userLogin=async (req,res,next)=>{
    try{
        const user=await User.findOne({$or:[{user_name:req.body.identifier},{email:req.body.identifier}] });
        if(!user){
            throw new Error("User not found");
        }
        const validate = await user.isValidPassword(req.body.password);
        if (!validate) {
            throw new Error("Wrong Password");
        } 
        const body = { _id: user._id, user_name: user.user_name };
        const token = jwt.sign({ user: body }, process.env.JWT_SECRET, {
            expiresIn: "16d",
        });
        res.send({
            status: true,
            code: 200,
            message: "User login successfully",
            user:{
                user:user.user_name,
                email:user.email,
                token:token
            }
        })           
    }catch(e){
        next(e);
    }
}


///update profile
exports.updateProfile=async(req,res,next)=>{
    try{
        const user=await User.findOne({_id:req.user._id});

        const updates=Object.keys(req.body);
        const allowedUpdates=['user_name','email','password'];
        const isValid=updates.every((update)=>allowedUpdates.includes(update));
        if(!isValid){
            return res.send({
                status: false,
                code:400,
                error: "Invalid updates"
            })
        }
        
        updates.forEach((update)=>user[update]=req.body[update]);///updating

        
        await user.save();
        res.send({
            status: true,
            code: 200,
            message: "Profile updated successfully",
            user:{
                user:user.user_name,
                email:user.email
            }
        })
    }catch(e){
        next(e);
    }
}