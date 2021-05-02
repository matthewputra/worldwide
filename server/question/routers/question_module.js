const express=require('express');
const router=new express.Router();
const questionModuleCntrl=require('../controllers/question_module');
const {isAuth} =require('../auth/config');

router.post('/api/question_module',questionModuleCntrl.addQuestionModule);

router.patch('/api/question_module/:module_id',questionModuleCntrl.addNewQuestion);

router.get('/api/question_module/:module_id',questionModuleCntrl.getSingleQustionList);

router.get('/api/question_module/course/:course_id',questionModuleCntrl.getAllQuestionModuleForCourse);

router.get('/api/question_module',questionModuleCntrl.getAllQuestionModule);

router.delete('/api/question_module/:module_id',questionModuleCntrl.deleteQuestionModule);



module.exports=router;

