import { Router } from "express";
import {
  submitApplication,
  submitDetails,
} from "../controllers/applicationController";

const applicationRouter = Router();

applicationRouter.route("/details").post(submitDetails);

applicationRouter.route("/submit").post(submitApplication);

export default applicationRouter;
