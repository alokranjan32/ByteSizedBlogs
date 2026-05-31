import React from 'react'
import axios from 'axios'
import Api from '../../../Api/Axios.jsx'
import {useState,useEffect} from  'react'
import '../Styles/Tech.css'


const API_URL=import.meta.env.VITE_API_URL;

function Tech() {

  const [state,setState]=useState([]);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
      const fectchBlogs=async()=>{ 
      try {
        const res=await axios.get(`${API_URL}/api/user/blogs/ `);
        const resData=res.data.data;
        const techData=resData.filter(p=>p.tags.includes("Tech"));
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
    <div> 
       {state.map((item)=>(
          <div key={item._id}>
            <h3 className="h3">{item.title}</h3>
            <p>{item.para}</p>
           
            </div>

       ))}
      
    </div>
  )
}

export default Tech
