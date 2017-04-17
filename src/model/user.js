import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
 name: {
   type: String,
   required: true,
 },
 email: {
   type: String,
   required: true,
   unique: true,
 },
 fbAccessToken: String,
});

export default mongoose.model('User', userSchema);
