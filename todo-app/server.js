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
app.listen(PORT, () => {
	console.log(`Port ${PORT} is running!!`)
})