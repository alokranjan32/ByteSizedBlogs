import React from 'react'
import {useState,useEffect} from 'react'
import './Contact.css'
function Contact() {


  const [name,setName]=useState();
  const [email,setEmail]=useState();
  const [issue,setIssue]=useState();
  const [message,setMessage]=useState();

  useState(()=>{
    const sendReponse=async()=>{
      try {
        const res= await axios.post(`${Api}/api/user/contact`,{
          email:email,
          fullname:name,
          isseue:issue
          
        },
        {
          headers:{
            'Content-Type':'application/json'
          }

        }
      )
      setMessage("Application submitted");
        
      } catch (error) {
        console.log(error);
        
      }
    }
     
  })
  return (
    <div className="main-container">
      <h1 className="heading">Contact Us</h1>
     <div className="contact-container">
      <input type="text"
      placeholder="Email"
      onChange={setEmail}
       className="form-input"
      
       />
       <input type="text" 
       placeholder="name"
       className="form-input"
        onChange={setName}
       
       />
       <textarea name="text-area" id=""
       placeholder="Enter issuse"
       className="form-input"
        onChange={setIssue}
       >

       </textarea>
       <button className="btn">Submit</button>

     </div>
     {message &&<p>{message}</p>}
    </div>
  )
}

export default Contact
