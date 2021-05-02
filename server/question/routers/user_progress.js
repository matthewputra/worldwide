const express=require('express');
const router=express.Router();
const user_progressCntrl=require('../controllers/user_progress');
const {isAuth} =require('../auth/config');

router.post('/api/user_progress',isAuth,user_progressCntrl.addProgress);

router.get('/api/user_progress',isAuth,user_progressCntrl.getUserProgress); 

router.delete('/api/user_progress/:module_id',isAuth,user_progressCntrl.deleteProgress); 

module.exports=router;