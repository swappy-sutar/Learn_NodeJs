import { createUser } from "../Controllers/User.Controller.js";
import express from "express"

const router = express.Router()

router.post("/create-user",createUser);


export default router;
