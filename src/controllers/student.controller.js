import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Student } from "../models/student.model.js";

const registerStudent = asyncHandler(async (req, res) => {
  const { studentId, name, dateOfBirth, subjects } = req.body;

  if (!studentId || !name || !dateOfBirth || !subjects) {
    throw new ApiError(400, "All fields are required");
  }

  const studentExists = await Student.findOne({ studentId });
  if (studentExists) {
    throw new ApiError(400, "Student already exists | Give unique student ID");
  }

  if (subjects.length < 1 || subjects.length > 6) {
    throw new ApiError(400, "Student can select between 1 and 6 subjects");
  }

  const createdStudent = await Student.create({
    studentId,
    name,
    dateOfBirth,
    subjects,
  });

  return res
    .status(201)
    .json(
      new ApiResponse(201, createdStudent, "Student registered successfully")
    );
});

export { registerStudent };
