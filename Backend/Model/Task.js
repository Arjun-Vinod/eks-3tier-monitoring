const mongoose=require('mongoose');
const TaskSchema=new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    isCompleted:{type:Boolean,default:false},
    dueDate:{type:Date,default:null}
});
module.exports=mongoose.model('Task',TaskSchema);