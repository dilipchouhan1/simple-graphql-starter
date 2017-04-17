import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  fbAccessToken: String,
  facebook: {
    id: String,
    token: String,
    name: String
  }
});

export default mongoose.model('User', userSchema);
