import mongoose, {Mongoose, Schema} from "mongoose";

const classSchema = new Schema({
    className:{
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    classTeacher:{
        type: Mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    subjects: [
        {
            type: String,
            required: true,
        }
    ],
    students: {
        type: Map,
        of: {
            type: Mongoose.Schema.Types.ObjectId,
            ref: "Student"
        }
    }
}, {timestamps: true});

export const Class = mongoose.model('Class', classSchema);
