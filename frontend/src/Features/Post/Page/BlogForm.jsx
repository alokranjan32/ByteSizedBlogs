 import { useState,useEffect } from "react";
import API from "../../../Api/Axios.jsx";
import '../Styles/BlogForm.css'
 
function BlogForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImage] = useState("");
  const [message, setMessage] = useState("");
  const [tags,setTag]=useState("Tech");

 
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("Please login first.");
        return;
      }
 console.log("TOKEN:", token);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("tags", tags);
      formData.append("image", imageUrl);

      const res = await API.post(
        "/blogs",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,  
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage("Blog created successfully!");
      console.log("Blog response:", res.data);

      // clear inputs
      setTitle("");
      setContent("");
      setImage("");
      setTag("Tech");

    } catch (err) {
        console.log(err.response?.data);
      const serverMsg = err?.response?.data?.message || err?.message || "Failed to create blog.";
      setMessage(serverMsg);

      if (err?.response?.status === 401) {
        localStorage.removeItem("token");
      }
    }
  };

  return (
    <div  className="main-container">
      <h2 className="heading"> Post a Blog</h2>
      <form onSubmit={(e)=>handleSubmit(e)} className="form-container">
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="form-input"
        />

        <textarea
          placeholder="Blog Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="form-input"
        />

         
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="form-text"
        />
         <select name="tags" id=""
         value={tags}
         onChange={(e)=>setTag(e.target.value)}>
          <option value="Tech">Tech</option>
          <option value="Ai">Ai</option>
          <option value="Education">Education</option>
         </select>
        <button type="submit" className="btn">Post Blog</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default BlogForm;
