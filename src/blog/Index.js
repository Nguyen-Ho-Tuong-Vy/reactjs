import { useEffect, useState } from "react";
import axios from "axios"
import { Link } from "react-router-dom";

function Index(props) {
  const [getItem, setItem] = useState([])
  console.log(props)
  useEffect(() =>{
    axios.get("http://localhost/laravel8/public/api/blog")
    .then(res=> {
      setItem(res.data.blog.data)
    })
    .catch(function(error){
      console.log(error)
    })
  },[])

  function fetchData (){
    if(Object.keys(getItem).length > 0){
      return getItem.map((value, key) =>{
        return(
          <div key={key} className="single-blog-post">
            <h3>{value.title}</h3>
            <div className="post-meta">
              <ul>
                <li><i className="fa fa-user" /> {value.id_auth}</li>
                <li><i className="fa fa-clock-o" /> {value.created_at}</li>
                <li><i className="fa fa-calendar" /> {value.updated_at}</li>
              </ul>
              <span>
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star-half-o" />
              </span>
            </div>
            <a href>
              <img src={"http://localhost/laravel8/public/upload/Blog/image/" + value.image} alt="" />
            </a>
            <p>{value.description}</p>
            <Link to ={"/blog/detail/" + value.id} className="btn btn-primary" >Read More</Link>
        </div>
        )
      })
    }
  }
  return (
        
    <div className="col-sm-9">
      <div className="blog-post-area">
        <h2 className="title text-center">Latest From our Blog</h2>
        {fetchData()}
      </div>
    </div>
             
      
  );
  }
  
  export default Index;
  