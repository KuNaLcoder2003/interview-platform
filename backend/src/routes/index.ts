
import express from "express"
import userRouter from "./user.js";
import interViewRouter from "./interview.js";
const router = express.Router();

router.use('/user', userRouter)
router.use('/interview', interViewRouter)
export default router;
