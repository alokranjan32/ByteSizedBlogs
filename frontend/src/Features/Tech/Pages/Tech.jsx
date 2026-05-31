import React from 'react'
import Api from '../../../Api/Axios.jsx'
import {useState,useEffect} from  'react'
import '../Styles/Tech.css'
import Card from '../../Home/Components/Cards.jsx'


function Tech() {

  const [state,setState]=useState([]);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
      const fectchBlogs=async()=>{ 
      try {
        const res=await Api.get("/blogs");
        const resData=res.data.data;
        const techData=resData.filter(p=>{
          const blogTags=Array.isArray(p.tags)?p.tags:[p.tags];
          return blogTags.some(tag=>tag?.trim().toLowerCase()==="tech");
        });
        setState(techData);
        setLoading(false);
      } catch (error) {
        console.log(error); 
        setLoading(false);
      }
    } 
   fectchBlogs();
  },[])
  if(loading){
    return  <img src="https://i.gifer.com/4V0b.gif" className="loader" />
  }
  
  return (
    <div className="container"> 
      <div className="cards-container">
       {state.map((item)=>(
          <Card
            key={item._id}
            id={item._id}
            slug={item.slug}
            title={item.title}
            src={item.imageUrl}
            content={item.content}
            author={item.author?.name}
            authorId={item.author?._id}
          />

       ))}
      </div>
      
    </div>
  )
}

export default Tech
