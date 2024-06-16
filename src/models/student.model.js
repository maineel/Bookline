import mongoose, {Schema} from "mongoose";

const studentSchema = new Schema({
    studentId: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    subjects:{      // Map of subjects with key as subject and marks as value
        type: Map,
        of: Number
    }
}, {timestamps: true});

export const Student = mongoose.model('Student', studentSchema);