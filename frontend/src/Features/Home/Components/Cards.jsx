import React from 'react'
import '../Styles/cards.css'
import {useNavigate} from 'react-router-dom'

 
function Card({src,title,content,id,author}) {
  const navigate=useNavigate();
  const handleClick=()=>{
    navigate(`/blog/${id}`)
  }

  const limitWords = (text, limit = 20) =>
  text.split(" ").slice(0, limit).join(" ") + "...";
  const limitDescription=(text,limit=35)=>
    text.split(" ").slice(0,limit).join(" ")+ "...";
  return (
    <>

    <div class="container">
  <div class="card"> 
   <h3  className="card-heading">{limitWords(title)}</h3>
   <img src={src}  className="img"/>
   <p className="card-desc">{limitDescription(content)}</p>
   <p className="author"> post by - {author}</p>
  </div>
   
</div>
  <div className="cards-container"> 
    <div className="cards">
  
   </div>
   </div> 
   </>
  )
}

export default Card
