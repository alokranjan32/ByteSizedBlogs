import React from 'react'
import { createBrowserRouter,BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './Features/LandingPage/pages/LandingPage'
import Layout from './Components/Layout/Layout.jsx'
import Home from './Features/Home/Pages/Home.jsx'
import Login from './Features/Auth/components/Login.jsx'
import Signup from  './Features/Auth/components/Signup.jsx'
import Contact from './Components/Contact/Contact.jsx'
import Tech from './Features/Tech/Pages/Tech.jsx'
import Ai from './Features/Ai/Pages/Ai.jsx'
import BlogForm from './Features/Post/Page/BlogForm.jsx'
import Dashboard from './Features/Dashboard/Page/Dashboard.jsx'
import Profile from './Features/Profile/Pages/Profile.jsx'

const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'
 
 const router=createBrowserRouter([
  {
    path:"",
    element:<Layout/>,
    children:[
      {
        path:"/",
        element:<LandingPage/>
      },
      {
        path:"/login",
        element:<Login/>
      },
      {
        path:'/home',
        element:<Home/>
      },
      {
        path:"/tech",
        element:<Tech/>
      },
      {
        path:'/ai',
        element:<Ai/>
      },{
        path:"/signup",
        element:<Signup/>
      },
      {
        path:"/contact",
        element:<Contact/>
      }
      ,{
        path:"/post",
        element:<BlogForm/>
      },{
        path:"/dashboard",
        element:<Dashboard/>
      },{
        path:"/me",
        element:<Profile/>
      }
       
    ]
  }

 ])
 export default router



 
