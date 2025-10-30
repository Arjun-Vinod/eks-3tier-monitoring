const express=require('express');
const router=express.Router();
const TaskSchema=require('../Model/Task');
const bodyParser=require('body-parser');
const Task = require('../Model/Task');
// router.use(bodyParser.urlencoded({
//     extended:true
// }));
router.use(bodyParser.json());

router.post('/task',async(req,res)=>{
    const Task=new TaskSchema({
        title:req.body.title,
        description:req.body.description,
        isCompleted:req.body.isCompleted,
        dueDate:req.body.dueDate
    });
    try {
        const newTask=await Task.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
});

router.get('/task',async(req,res)=>{
    try {
        const Tasks=await Task.find();
        res.json(Tasks);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});

router.get('/task/:id',async(req,res)=>{
    try {
        const Tasks=await Task.findById(req.params.id);
        res.json(Tasks);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});

router.put('/task/:id',async(req,res)=>{
    try {
        const UpdatedTask=await Task.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.status(200).json(UpdatedTask);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
});

router.delete('/task/:id',async(req,res)=>{
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({message:'Task deleted'});
    } catch (error) {
        res.status(404).json({message:error.message});
    }
})
module.exports=router;