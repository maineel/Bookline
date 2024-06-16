import mongoose, {Mongoose, Schema} from "mongoose";

const classSchema = new Schema({
    className:{
        type: String,
        required: true,
        unique: true,
    },
    year: {
        type: Number,
        required: true,
    },
    classTeacher:{
        type: String,
        required: true,
    },
    subjects: [
        {
            type: String,
            required: true,
        }
    ],
    students: {     // Map of students with key as roll number and value as student object
        type: Map,
        of: {
            type: Schema.Types.ObjectId,
            ref: "Student"
        }
    }
}, {timestamps: true});

export const Class = mongoose.model('Class', classSchema);
