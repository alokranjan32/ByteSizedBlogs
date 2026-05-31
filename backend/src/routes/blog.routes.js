 import { Router } from "express";
import { verifyAccessToken } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
  createBlog,
  getAllBlog,
  getblogbySlug,
  updateBlog,
  deleteBlog,
  countTotalBlog
} from "../controller/blog.controller.js";

const router = Router();

router.post("/blogs",  verifyAccessToken, upload.single("image"), createBlog);      // create blog
router.get("/blogs",   getAllBlog);       // get all blogs
router.get("/blogs/:slug",   getblogbySlug); // get blog by slug
router.put("/blogs/:id", verifyAccessToken, updateBlog);   // update blog
router.delete("/blogs/:id", verifyAccessToken, deleteBlog); // delete blog
router.get("/blogs",countTotalBlog);//count blogs


export default router;
