import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema(
  {
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
    subjects: [
      {
        name: {
          type: String,
          required: true,
        },
        mark: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

export const Student = mongoose.model("Student", studentSchema);
