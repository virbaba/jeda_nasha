import express from "express";
import { updateUser, deleteUser, getUsers, getUser, signout } from "../controllers/user.controller.js";
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.put('/update/:userId', verifyToken, updateUser);
router.delete('/delete/:userId', verifyToken, deleteUser);
router.get('/getusers', verifyToken, getUsers);
router.get('/:userId', getUser);
router.post("/signout", signout);

export default router;