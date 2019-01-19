import mongoose from 'mongoose';

const Schema = mongoose.Schema;

//Define schema
const postSchema = new Schema({
  body: { type: String, required: true },
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, required: true, default: Date.now }
})

//Create the model class
const PostModel = mongoose.model('Post', postSchema);

//Export the modal
export default PostModel;