import express from "express";
import { getLogin ,getRegister, logout_user, get_current_user} from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/login",getLogin)
router.post('/register',getRegister);
router.post("/logout", logout_user)
router.get("/me", verifyJWT,get_current_user)


export default router;