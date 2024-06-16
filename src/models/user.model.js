import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    passwordExpiry:{
        type: Date,
        required: true,
    },
},{timestamps: true});

userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}

export const User = mongoose.model('User', userSchema);