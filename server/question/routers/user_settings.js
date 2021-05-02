const express=require('express');
const router=express.Router();
const settingCntrl=require('../controllers/user_settings');

const {isAuth} =require('../auth/config');

router.post('/api/user/setting',isAuth,settingCntrl.addNewSettings);

router.get('/api/user/setting',isAuth,settingCntrl.getUserSettings);

module.exports=router;


