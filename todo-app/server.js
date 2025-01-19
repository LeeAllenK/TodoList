import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
const PORT = 3000;
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(`${process.env.MONGODB_URI}`);
const todoSchema = new mongoose.Schema({
	text: { type: String, required: true },
	completed: { type: Boolean, default: false },
	email: { type: String, required: true },
});
const Todo = mongoose.model('Todo', todoSchema);

app.get('/todos', async(req, res) => {
	try{
		const todos = await Todo.find();
		res.json(todos)
	}catch(err){
		res.status(500).json({message: err.message});
	}
});
app.post('/todos', async (req, res) => {
	try {
		const newTodo = new Todo(req.body);
		const savedTodo = await newTodo.save();
		res.status(201).json(savedTodo);
	} catch(err) {
		console.error(err);
		res.status(500).json({ message: err.message });
	}
});
app.put('/todos/:id', async (req, res) => {
	try{
		const {text, completed} = req.body;
		const todo = await Todo.findByIdAndUpdate(req.params.id);
		todo.text = text;
		todo.completed = completed;	
		const updateTodo = await todo.save();
		res.json(updateTodo);
	}catch(err){
		console.error(err);
		res.status(500).json({message:'Error updating',err});
	}
});
app.delete('/todos/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const todo = await Todo.findByIdAndDelete(id);
		if(!todo) return res.status(404).json({ message: 'Todo not found' });
		res.json({ message: 'Todo deleted successfully', todo });
	} catch(err) {
		console.error(err);
		res.status(500).json({ message: err.message });
	}
});
app.listen(PORT, () => {
	console.log(`Port ${PORT} is now running!!`);
});