import mongoose, {Schema} from "mongoose";

const studentSchema = new Schema({
    studentId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    subjects:{
        type: Map,
        of: Number
    }
}, {timestamps: true});

export const Student = mongoose.model('Student', studentSchema);