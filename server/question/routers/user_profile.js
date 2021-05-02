const express=require('express');
const router=new express.Router();
const userProfileCntrl=require('../controllers/user_profile');
const {isAuth} =require('../auth/config');

router.post('/api/user/register',userProfileCntrl.registerUser);

router.post('/api/user/login',userProfileCntrl.userLogin);

router.patch('/api/user/update_profile',isAuth,userProfileCntrl.updateProfile);

module.exports=router;