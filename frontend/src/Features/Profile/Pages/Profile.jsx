 import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Profile.css";
import API from "../../../Api/Axios";

function Profile() {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get("/blogs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(res.data.data);
        setUser(res.data.data);
      } catch (error) {
        console.log("error occured getting profile", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="profile-container">
      <h1>Profile</h1>
    

       {user.map((item)=>(
        <div key={item._id}>
            <p>{item.author.name}</p>
            <p>{item.author.email}</p>
            </div>  

      ))} 
 
   
    </div>
  );
}

export default Profile;