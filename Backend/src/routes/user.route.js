import express from "express"
import { getAllUserUrls } from "../controllers/user.controller.js"
import {verifyJWT }from "../middlewares/auth.middleware.js"

const router = express.Router()

router.post("/urls",verifyJWT, getAllUserUrls)

export default router