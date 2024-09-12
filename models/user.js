import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2, 
      },
      email: {
        type: String,
        required: true,
        unique: true, 
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'is invalid'],
      },
      phone: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^\+?[1-9]\d{1,14}$/, 'is invalid'], 
      },
      address:{
        type:String
      }
});

const User = mongoose.model('User', userSchema);

 export default User;
