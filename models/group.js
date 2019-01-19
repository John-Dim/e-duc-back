import mongoose from 'mongoose';

const Schema = mongoose.Schema;

//Define schema
const groupSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, required: true, default: Date.now }
})

//Create the model class
const GroupModel = mongoose.model('Group', groupSchema);

//Export the model
export default GroupModel;