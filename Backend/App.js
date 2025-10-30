const express=require('express');
const app=express();

const mongoose=require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.DB_URI)
    .then(()=> console.log('Connected to MongoDB'))
    .catch((error)=>console.error('MongoDB connection error',error));

const cors = require('cors');
app.use(cors());
app.use(express.json()); 

const TaskRouter=require('./Routes/taskRoutes')
app.use('/api',TaskRouter);

TaskRouter.post('/task', (req, res) => {
    console.log("Request body:", req.body);
    res.status(200).json({ message: 'Task route working!' });
});


const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})