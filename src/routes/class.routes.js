import { Router } from "express";
import {
  registerClass,
  addStudentToClass,
  getStudentScoresBySubject,
  getClassDetails,
} from "../controllers/class.controller.js";

const classRouter = Router();

classRouter.route("/register").post(registerClass);
classRouter.route("/addStudent").post(addStudentToClass);
classRouter.route("/getStudentScores").post(getStudentScoresBySubject);
classRouter.route("/getClassDetails").get(getClassDetails);

export { classRouter };