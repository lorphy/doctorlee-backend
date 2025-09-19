import mongoose from 'mongoose';

const {Schema,model} = mongoose;
const cardSchema = new Schema({
	name:String,
	imgUrl:String
},{timestamps:true});
const Cards =  model('Cards',cardSchema);
export default Cards;