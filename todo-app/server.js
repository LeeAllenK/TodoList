import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
const PORT = 3000;
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(`${process.env.MONGODB_URI}`)

const todoSchema = new mongoose.Schema({
	text: String, 
	completed: Boolean
})
const Todo = mongoose.model('Todo', todoSchema);

app.get('/todos', async(req, res) => {
	try{
		const todos = await Todo.find();
		res.status(200).json(todos)
	}catch(err){
		res.status(500).res.json({message: err.message});
	}
})

app.post('/todos', async(req,res)=>{
		const todo = new Todo({
			text: req.body.text,
			completed: req.body.completed	
		})	
	try{
		const newTodo = await todo.save();
		res.status(201).json(newTodo)
		
	}catch(err){
		res.status(500).res.json({message: err.message});
	}
})

app.delete('/todos/:id', async(req, res) => {
	try{
		const todo = await findByIdAndDelete(req.params.id)
		if(!todo) { return res.status(404).json({ message: 'Todo not found' }); }
		res.json('Todo Deleted')
	}catch(err){
		console.error('Error',err)
		res.status(500).json({message: err.message});
	}
})
app.listen(PORT, () => {
	console.log(`Port ${PORT} is now running!!`)
})