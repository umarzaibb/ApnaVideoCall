import { Router } from "express";
import { Register, Login } from "../controllers/Authentication.js";
import { CreateMeeting } from "../controllers/Meeting.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import { JoinMeeting } from "../controllers/Meeting.js";

const router =Router();

router.route("/register").post(AsyncHandler(Register));
router.route("/login").post(AsyncHandler(Login));
router.route("/meeting").post(AsyncHandler(CreateMeeting));
router.route("/join-meeting").post(AsyncHandler(JoinMeeting));

export default router;