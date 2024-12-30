import express from "express";
import { getUserById, getUser, createUser, updateUser, deleteUser } from "../Controller/user.controller.js";

const router = express.Router();

router.get("/get-user",getUser);
router.get("/get-user/:id", getUserById);
router.post("/create-user",createUser);
router.put("/update-user/:id",updateUser)
router.delete("/delete-user/:id",deleteUser)


export default router;