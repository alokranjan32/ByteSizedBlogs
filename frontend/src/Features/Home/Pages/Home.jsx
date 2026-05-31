 
import { useEffect, useState } from "react";
import axios from "axios";  
import '../Styles/Home.css'
import Card from  '../Components/Cards.jsx'
import {useNavigate} from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL;
export default function Home() {

  const navigate=useNavigate();
  const [blogs, setBlogs] = useState([]);  
  const [loading,setLoading]=useState(true);


  const handleAdd=()=>{
    navigate("/post");
  }

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/user/blogs/`);
        setBlogs(res.data.data); 
        setLoading(false);
      } catch (error) {
        console.log("Error occurred while fetching blogs:", error);

         setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if(loading ){
    return  <img src="https://i.gifer.com/4V0b.gif" className="loader" />
  }

  return (
    <>
    <div className="container">
      
      
      <div className="cards-container">
        {blogs.map((item) => (
          <Card
            key={item._id}  
            id={item._id}
            title={item.title}
            src={item.imageUrl}
            content={item.content}
            author=  {item.author.name}
            className="cards"
          />
        ))}
      </div>
     
    </div>
    <button className="btn-add" onClick={handleAdd}>➕ </button>
    </>
  


  );
  
}
