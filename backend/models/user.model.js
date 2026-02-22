import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        unique:true,
    },
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:false,
    },
    course:{
        type:String,
        required:true,
    }, 
    branch:{
        type:String,
        required:true,
    }
});

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next;
    this.password = await bcrypt.hash(this.password, 10);
    next;
});

userSchema.methods.comparePassword = function(candidate){
    return bcrypt.compare(candidate, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
