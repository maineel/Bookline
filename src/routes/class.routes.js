import { Router } from "express";
import {
  registerClass,
  addStudentToClass,
  getStudentScoresBySubject,
  getClassDetails,
} from "../controllers/class.controller.js";

const classRouter = Router();

classRouter.route("/register").post(registerClass);
classRouter.route("/addStudentToClass").post(addStudentToClass);
classRouter.route("/getStudentScoresBySubject").get(getStudentScoresBySubject);
classRouter.route("/getClassDetails").get(getClassDetails);

export { classRouter };