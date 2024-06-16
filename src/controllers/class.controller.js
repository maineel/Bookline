import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Class } from "../models/class.model.js";
import { Student } from "../models/student.model.js";

const registerClass = asyncHandler(async (req, res) => {
  const { className, year, classTeacher, subjects } = req.body;

  if (!className || !year || !classTeacher || !subjects) {
    throw new ApiError(400, "All fields are required");
  }

  const classExists = await Class.findOne({ className });

  if (classExists) {
    throw new ApiError(400, "Class already exists | Give unique class name");
  }

  const createdClass = await Class.create({
    className,
    year,
    classTeacher,
    subjects,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, createdClass, "Class registered successfully"));
});

const generateStudentRollNumber = async () => {
  const students = await Student.find();
  return students.length + 1;
};

const addStudentToClass = asyncHandler(async (req, res) => {
  const { classId, studentId } = req.body;

  if (!classId || !studentId) {
    throw new ApiError(400, "All fields are required");
  }

  const fetchedClass = await Class.findById(classId);
  if (!fetchedClass) {
    throw new ApiError(404, "Class not found");
  }

  const fetchedStudent = await Student.findById(studentId);
  if (!fetchedStudent) {
    throw new ApiError(404, "Student not found");
  }

  const rollNumber = await generateStudentRollNumber();
  fetchedClass.students.set(rollNumber, studentId);
  await fetchedClass.save();

  return res
    .status(201)
    .json(
      new ApiResponse(201, fetchedClass, "Student added to class successfully")
    );
});

const getStudentScore = async (studentId, subject) => {
  const fetchedStudent = await Student.findById(studentId);

  if (!fetchedStudent) {
    throw new ApiError(404, "Student not found");
  }

  const score = fetchedStudent.scores.get(subject);

  return score;
};

const getStudentScoresBySubject = asyncHandler(async (req, res) => {
  const { className, subject } = req.body;
  if (!className || !subject) {
    throw new ApiError(400, "All fields are required");
  }

  const fetchedClass = await Class.findOne({ className });
  if (!fetchedClass) {
    throw new ApiError(404, "Class not found");
  }

  const studentScores = [];

  fetchedClass.students.forEach(async (studentId, rollNumber) => {
    const score = await getStudentScore(studentId, subject);
    studentScores.push({ rollNumber, score });
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, studentScores, "Student scores fetched successfully")
    );
});

const getClassDetails = asyncHandler(async (req, res) => {
  const { className } = req.body;
  if (!className) {
    throw new ApiError(400, "All fields are required");
  }

  const fetchedClass = await Class.findOne({ className }).populate("students");

  if (!fetchedClass) {
    throw new ApiError(404, "Class not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, fetchedClass, "Class details fetched successfully")
    );
});

export {
  registerClass,
  addStudentToClass,
  getStudentScoresBySubject,
  getClassDetails,
};
