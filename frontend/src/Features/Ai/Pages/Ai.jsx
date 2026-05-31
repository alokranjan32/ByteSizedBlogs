import React from 'react'
import axios from 'axios'
import {useState,useEffect} from 'react'
import '../Styles/Ai.css'

const API_URL = import.meta.env.VITE_API_URL;
function Ai() {

  const [state,setState]=useState([]);
  const [loading,setLoading]=useState(true);
  useEffect(()=>{

    const fetchBlogs=async()=>{
      try {
        const res=await axios.get(`{API_URL}/api/user/blogs/`);
        const resData=res.data.data;
        const aiData=resData.filter(p=>p.tags.includes("Ai"));
        setState(aiData);
        setLoading(false);
        
      } catch (error) {
        console.log(error);
        setLoading(true);
        
      }

    }
 fetchBlogs();
  },[])
  if(loading){
    return  <img src="https://i.gifer.com/4V0b.gif" className="loader" />
  } 
  return (
    <div>
     {state.map((item)=>(
      <div key={item._id}>
        {item.title}
      </div>

     ))}
      
    </div>
  )
}

export default Ai
