import { Router } from "express";
import { registerStudent } from "../controllers/student.controller.js";

const studentRouter = Router();

studentRouter.route("/register").post(registerStudent);

export { studentRouter };