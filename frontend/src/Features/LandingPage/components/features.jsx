import React from 'react'
import '../styles/features.css'
import {useEffect,useState} from 'react'
import API from '../../../Api/Axios.jsx'

function features() {

  const [state,setState]=useState([]);

  const  limitwords=(text,limit=20)=>
    text.split(" ").slice(0,limit).join(" ");  
 useEffect(()=>{
  const fetchFeatures=async()=>{
    try{
      const res = await API.get('/blogs');
      setState(res.data?.data?.slice(0, 3) ?? []);

    }catch(error){
        console.error("Error occurs while fetching features:", error);
    }
  }
  fetchFeatures();

 },[])

  return (
    <div className="features-container">
        <h1 className="features-heading">Featured  Articles</h1>
         <div className="card-container"> 
            {state.length>0?state.map((item)=>(
              <div key={item} className=" features-card">
               <h3>   { limitwords(item.title)}</h3>
               <img src={item.imageUrl} alt="" 
               className="feature-img"/>
               </div> 
            )):(<h1>No featured articles available</h1>)}

           

      </div>
      
    </div>
  )
}

export default features
