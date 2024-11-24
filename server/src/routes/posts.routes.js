import express from "express";
import { getPosts } from "../controllers/posts.controller.js";

const router = express.Router();

router.get("/posts", getPosts);

export default router;
