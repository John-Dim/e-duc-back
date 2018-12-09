import mongoose from 'mongoose';

const Schema = mongoose.Schema;

//Define schema
const userSchema = new Schema({
	email: { type: String, unique: true, lowercase: true},
	password: String
})

//Create the model class
const UserModel = mongoose.model('user', userSchema);

//Export the modal
export default UserModel;