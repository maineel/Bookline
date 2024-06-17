import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Student } from "../models/student.model.js";
import { Class } from "../models/class.model.js";

const registerStudent = asyncHandler(async (req, res) => {
  const { studentId, name, dateOfBirth } = req.body;

  if (!studentId || !name || !dateOfBirth) {
    throw new ApiError(400, "All fields are required");
  }

  const studentExists = await Student.findOne({ studentId });
  if (studentExists) {
    throw new ApiError(400, "Student already exists | Give unique student ID");
  }

  const createdStudent = await Student.create({
    studentId,
    name,
    dateOfBirth,
  });

  return res
    .status(201)
    .json(
      new ApiResponse(201, createdStudent, "Student registered successfully")
    );
});

const updateStudentSubjects = asyncHandler(async (req, res) => {
  const { studentId, subjects, className } = req.body;

  if (!studentId || !subjects || !className) {
    throw new ApiError(400, "All fields are required");
  }

  const fetchedClass = await Class.findOne({ className });
  if (!fetchedClass) {
    throw new ApiError(404, "Class not found");
  }

  const fetchedStudent = await Student.findOne({ studentId });
  if (!fetchedStudent) {
    throw new ApiError(404, "Student not found");
  }
  for (const subject in subjects) {
    if (!fetchedClass.subjects.includes(subject)) {
      throw new ApiError(400, "Subject not found in class");
    }
    if (fetchedStudent.subjects.length < 6 && subjects[subject].score <= 100 && subjects[subject].score >= 0) {
      fetchedStudent.subjects.push({
        name: subject,
        mark: subjects[subject].score,
      });
    }
    else{
      throw new ApiError(400, "Student can have only 6 subjects and marks between 0 and 100");
    }
  }

  await fetchedStudent.save();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        fetchedStudent,
        "Student subjects updated successfully"
      )
    );
});

export { registerStudent, updateStudentSubjects };
