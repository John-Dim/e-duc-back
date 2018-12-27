import mongoose from 'mongoose';

const Schema = mongoose.Schema;

//Define schema
const userSchema = new Schema({
	email: { type: String, unique: true, lowercase: true, required: true },
	password: { type: String, required: true },
	name: { type: String, required: true} ,
	surname: { type: String, required: true },
	phone: String,
	quote: String,
	bio: String,
	speciality: String,
	scientificInstitution: String,
	school: String,
	jobTitle: String,
	skills: String
})

//Create the model class
const UserModel = mongoose.model('user', userSchema);

//Export the modal
export default UserModel;