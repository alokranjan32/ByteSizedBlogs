import React from 'react'
import {useEffect,useState,useReducer} from 'react'
import {useNavigate} from 'react-router-dom'
import API from '../../../Api/Axios'
function Dashboard() {

   const naviagte=useNavigate();
  const [state,setState]=useState([]);
   const [message,setMessage]=useState("loading");
  useEffect(()=>{
  const fetchDashboard=async()=>{
    try {
      const res=await API.get("/blogs")
      const resData=res.data.data;
      setState(resData);
      setMessage("Dashboard prepared")
      
  } catch (error) {
      
    }
    }
})
const handlePost=()=>{
   naviagte("/post");

   
}
  return (
    <div className="dashboard-container">
    <p>{state[0]?.author?.name}</p>
    <button >Add Post </button>   
    </div>
  )
}

export default Dashboard
 