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

const generateStudentRollNumber = async (studentId, students) => {
  for (let i = 0; i < students.length; i++) {
    if (students[i].student.toString() === studentId.toString()) {
      return null;
    }
  }
  return students.length + 1;
};

const addStudentToClass = asyncHandler(async (req, res) => {
  const { className, studentId } = req.body;

  if (!className || !studentId) {
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

  const rollNumber = await generateStudentRollNumber(
    fetchedStudent._id,
    fetchedClass.students
  );

  if (!rollNumber) {
    throw new ApiError(400, "Student already exists");
  }

  fetchedClass.students.push({ rollNumber, student: fetchedStudent._id });

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

  if (!fetchedStudent.subjects.some((sub) => sub.name === subject)) {
    return null;
  }

  for (const subjectInStudent of fetchedStudent.subjects) {
    console.log(subjectInStudent);
    if (subjectInStudent.name === subject) {
      return subjectInStudent.mark;
    }
  }
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

  if(!fetchedClass.subjects.includes(subject)) {
    throw new ApiError(404, "Subject not found in class");
  }
  
  const studentScores = [];

  for (const student of fetchedClass.students) {
    const rollNumber = student.rollNumber;
    const studentId = student.student; // assuming the student id is stored in _id field
    const score = await getStudentScore(studentId, subject);

    if (score) {
      studentScores.push({ rollNumber, score });
    }
  }

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

  const fetchedClass = await Class.findOne({ className }).populate({
    path: "students.student",
    populate: { path: "subjects" }, 
    select: "-_id -__v -createdAt -updatedAt"
  }).select("-_id -__v -createdAt -updatedAt");

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
