import express from 'express';
import {mongoose} from 'mongoose';
import Answer from './Answer.js';
import Cors from 'cors';

const app= express();
app.use(express.json());
app.use(Cors());

const port = process.env.PORT||8001;

const uri = "mongodb+srv://lina:duuTmfCCz6DvF5pB@cluster0.tyj7k9i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";



app.get("/",(req,res)=>res.status(200).send("Hello theweb"));

async function getOneByName(name){
	try{
		await mongoose.connect(uri);
		let data = await Answer.findOne({"personalInfo.name":name});
		return data;
	}catch(error){
		res.status(500).send(error);
	}
}


app.post('/answer',async (req,res)=>{
	const question=req.body;
	console.log(question);

	try{
		await mongoose.connect(uri);
		const data = await Answer.create(question);
		console.log('created');
		res.status(201).send(data);

	}catch(error){
		if(error){
			console.log(error);
			res.status(500).send(error);
		}else{
			res.status(500).send('something went wrong!');
		}
	}
		
});

app.post('/update_answer',async (req,res)=>{
	const question=req.body;
	console.log(question.personalInfo.name);

	try{
		await mongoose.connect(uri);

		let data = await Answer.replaceOne(
			{"personalInfo.name":question.personalInfo.name},question);
		console.log('updated');
		data = await getOneByName(question.personalInfo.name)
		console.log(data);
		res.status(201).send(question);

	}catch(error){
		if(error){
			console.log(error);
			res.status(500).send(error);
		}else{
			res.status(500).send('something went wrong!');
		}
	}
		
});

app.get('/patients',async (req,res)=>{
	try{
		await mongoose.connect(uri);
		
		const patients = await Answer.find().sort({updated:-1});

		res.status(200).json(patients);
	}catch(error){
		console.log(error);
		res.status(500).send(error);
	}
});


app.listen(port,()=>console.log(`Listening on localhost:${port}`));