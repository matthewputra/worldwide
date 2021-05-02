const express=require('express');
const router=new express.Router();
const courseCntrl=require('../controllers/course');
const {isAuth} =require('../auth/config');

router.post('/api/course',courseCntrl.addNewCourse);

router.get('/api/course',courseCntrl.getAllCourse);

router.get('/api/course/:course_id',courseCntrl.getSingleCourse);

router.patch('/api/course/:course_id',courseCntrl.updateCourse);

router.delete('/api/course/:course_id',courseCntrl.deleteCourse);



module.exports=router;

