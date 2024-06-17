import { Router } from "express";
import { registerStudent, updateStudentSubjects } from "../controllers/student.controller.js";

const studentRouter = Router();

studentRouter.route("/register").post(registerStudent);
studentRouter.route("/updateStudentSubjects").post(updateStudentSubjects);

export { studentRouter };