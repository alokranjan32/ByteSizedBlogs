import React from 'react'
import '../Styles/cards.css'
import {useNavigate} from 'react-router-dom'
import API from '../../../Api/Axios.jsx'

 
function Card({src,title,content,id,slug,author,authorId}) {
  const navigate=useNavigate();
  const user=JSON.parse(localStorage.getItem("user"));
  const isAuthor=user?._id===authorId;

  const handleClick=()=>{
    navigate(`/blog/${slug || id}`)
  }

  const handleDelete=async(e)=>{
    e.stopPropagation();
    try {
      const token=localStorage.getItem("token");
      await API.delete(`/blogs/${id}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  const limitWords = (text, limit = 20) =>
  text?.split(" ").slice(0, limit).join(" ") + "...";
  const limitDescription=(text,limit=35)=>
    text?.split(" ").slice(0,limit).join(" ")+ "...";
  return (
    <>

    <div className="card" onClick={handleClick}> 
      <img src={src}  className="img"/>
      <div className="card-content">
        <h3  className="card-heading">{limitWords(title)}</h3>
        <p className="card-desc">{limitDescription(content)}</p>
        <div className="author-row">
          <p className="author"> post by - {author}</p>
          {isAuthor && <button className="delete-btn" onClick={handleDelete}>Delete</button>}
        </div>
      </div>
    </div>
   </>
  )
}

export default Card
