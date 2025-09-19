import mongoose from 'mongoose';

const {Schema,model} = mongoose;
const questionSchema = new Schema({
	clientname:String,
	sex:Boolean,
	age:{ type: Number, min: 0, max: 150 },
	updated: { type: Date, default: Date.now },
	main_target:String,
	desc:String,
	cause:String,
	cause_time:String,
	history:{
    	tumor: { type: String, trim: true },
    	other:{type:String,trim:true},
    	list:{high_blood_presure:{type:Boolean},
    		  heart_bridge:{type:Boolean},
    		  high_blood_lipids:{type:Boolean}
    		 }
  	},


});




const Question =  model('Question',questionSchema);
export default Question;