import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import commenRoutes from './routes/comment.routes.js'
const app = express();

 

 app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use("/uploads", express.static("public/temp"));

// All routes under /api/user
app.use("/api/user", userRoute);
app.use("/api/user", blogRoutes);
app.use("/api/user",commenRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

export { app };
