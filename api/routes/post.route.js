import express from 'express';
import { create, getposts } from '../controllers/post.controllers.js';
import { verifyUser } from '../utils/verifyUser.js';

const router = express.Router();

router.post("/create", verifyUser, create);
router.get("/getposts", getposts);

export default router;