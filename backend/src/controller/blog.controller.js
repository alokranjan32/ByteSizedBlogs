import { Blog } from "../models/blog.models.js";
import AsyncHandler from "../utils/Asynchandler.js";
import { ApiError } from "../utils/Apierror.js";
import slugify from "slugify";

 
const createBlog = AsyncHandler(async (req, res) => {
  const { title, content, tag, imageUrl } = req.body;

  if (!title || !content) {
    throw new ApiError(403, "Missing title or content");
  }

  const slug = slugify(title, { lower: true });

  const blog = await Blog.create({
    title,
    content,
    tag,
    slug,
    imageUrl,
    author: req.user._id, 
  });

  res.status(201).json({ success: true, blog });
});

 
const getAllBlog = AsyncHandler(async (req, res) => {
  const blogs = await Blog.find()
    .populate("author", "name email")
    .sort({ createdAt: -1 });

  if (!blogs || blogs.length === 0) {
    throw new ApiError(404, "No blogs found");
  }
  res.status(200).json({ success: true, data: blogs });
});

 
const getblogbySlug = AsyncHandler(async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug });
  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  res.status(200).json({ success: true, blog });
});

 
const updateBlog = AsyncHandler(async (req, res) => {
  const { title, content, tags, imageUrl } = req.body;

  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }
 
  if (blog.author.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Unauthorized: Not the author");
  }

  const updatedData = { title, content, tags, imageUrl };
  if (title) updatedData.slug = slugify(title, { lower: true });

  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    updatedData,
    { new: true, runValidators: true }
  );

  res.status(200).json({ success: true, blog: updatedBlog });
});

 
const deleteBlog = AsyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  if (blog.author.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Unauthorized: Not the author");
  }

  await blog.deleteOne();

  res.status(200).json({
    success: true,
    message: "Blog deleted successfully",
  });
});
const countTotalBlog=AsyncHandler(async(req,res)=>{
   const total=await Blog.countDocuments();
  return res
  .status(200)
  .json(new ApiResponse (200,"total blogs",total))
})

export {
  createBlog,
  getAllBlog,
  getblogbySlug,
  updateBlog,
  deleteBlog,
  countTotalBlog
};
