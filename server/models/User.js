import mongoose from 'mongoose';
const Schema = mongoose.Schema;
mongoose.promise = global.promise

// 다른 모델의 스키마 가져오는방법 ! 아래와 같습니다
import Plan from './plan.js'
import Note from './Note.js'

const PlanSchema = mongoose.model('Plan').schema;
const NoteSchema = mongoose.model("Note").schema;
const UserSchema = new Schema({

	username: { 
		type: String, 
		required: true 
	},	
  
	local : {
		username: String,
		token: String,
	    name: String,
	    email: String,
	    picture: String
	},

	facebook : {
	    id: String,
	    token: String,
	    name: String,
	    email: String,
	    picture: String
 	},

 	plans : [{ type: Schema.Types.ObjectId, ref: 'Plan'}],

 	mynote : [{ type: Schema.Types.ObjectId, ref: 'Note' }]

 		 
});


 
export default mongoose.model('User', UserSchema)
