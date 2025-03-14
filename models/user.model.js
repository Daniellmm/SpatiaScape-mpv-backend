import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'User Name is Required'],
        trim: true,
        minLength: 2,
        maxLenght: 50
    },
    email: {
        type: String,
        required: [true, 'User Email. is Required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|edu|gov|mil|info|biz)$/, 'Please enter a valid email address'],
        // match: [/\S+@\S+\.\S+/, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        required: [true, 'User Password is Required'],
        minLength: 6,
    }
}, {timestamps: true});


const User =  mongoose.model('User', userSchema);

export default User;