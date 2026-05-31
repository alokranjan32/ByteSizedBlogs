import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../../../Api/Axios.jsx'
import '../Styles/BlogDetails.css'

function BlogDetails() {
  const { slug } = useParams();
  const [blog,setBlog]=useState(null);
  const [loading,setLoading]=useState(true);
  const [message,setMessage]=useState("");

  useEffect(()=>{
    const fetchBlog=async()=>{
      try {
        const res=await API.get(`/blogs/${slug}`);
        setBlog(res.data.blog);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setMessage(error.response?.data?.message || "Blog not found");
        setLoading(false);
      }
    }
    fetchBlog();
  },[slug])

  if(loading){
    return <img src="https://i.gifer.com/4V0b.gif" className="loader" />
  }

  if(message){
    return <h2 className="blog-message">{message}</h2>
  }

  return (
    <div className="blog-details-container">
      <div className="blog-details-card">
        <img src={blog.imageUrl} alt={blog.title} className="blog-details-img" />
        <div className="blog-details-content">
          <h1>{blog.title}</h1>
          <p className="blog-details-author">post by - {blog.author?.name}</p>
          <p className="blog-details-desc">{blog.content}</p>
        </div>
      </div>
    </div>
  )
}

export default BlogDetails
