import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "axios"
import Comments from "./Comments";
import ListCommnents from "./ListComments";

function Detail(props) {
    console.log(props)

    let params = useParams()
    console.log(params)
    const [data, setData] = useState([])
    const [cmt, setCmt] = useState([])
    const [replay, setReplay] = useState("")

    useEffect(()=>{
      API.get('http://localhost/laravel8/public/api/blog/detail/' + params.id)
      .then(response => {
        setData(response.data.data)
        setCmt(response.data.data.comment)
      })
      .catch(function(error){
        console.log(error)
      })
    },[])

    function fetchData(){
      if(Object.keys(data).length > 0){
        // return data.map((value, key) =>{
          return(
            <div className="single-blog-post">
                  <h3>{data.title}</h3>
                  <div className="post-meta">
                    <ul>
                      <li><i className="fa fa-user" /> {data.id_auth}</li>
                      <li><i className="fa fa-clock-o" /> {data.created_at}</li>
                      <li><i className="fa fa-calendar" /> {data.updated_at}</li>
                    </ul>
                  </div>
                  <a href>
                    <img src={"http://localhost/laravel8/public/upload/Blog/image/" + data.image}/>
                  </a>
                  {/* <p>{data.content}</p> */}
                  <div dangerouslySetInnerHTML={{__html:data.content}}/>
                  <div className="pager-area">
                    <ul className="pager pull-right">
                      <li><a href="#">Pre</a></li>
                      <li><a href="#">Next</a></li>
                    </ul>
                  </div>
                </div>
          )
        // })
      }
    }

    function getCmt(data){

      const a = cmt.concat(data)
      // console.log(data)
      setCmt(a)
    }
    function getReplay(rp){
      console.log(rp)
      setReplay(rp)
    }

    return (
        
      <div className="col-sm-9">
        <div className="blog-post-area">
          <h2 className="title text-center">Latest From our Blog</h2>
          {fetchData()}
          
        </div>{/*/blog-post-area*/}
        <div className="rating-area">
          <ul className="ratings">
            <li className="rate-this">Rate this item:</li>
            <li>
              <i className="fa fa-star color" />
              <i className="fa fa-star color" />
              <i className="fa fa-star color" />
              <i className="fa fa-star" />
              <i className="fa fa-star" />
            </li>
            <li className="color">(6 votes)</li>
          </ul>
          <ul className="tag">
            <li>TAG:</li>
            <li><a className="color" href>Pink <span>/</span></a></li>
            <li><a className="color" href>T-Shirt <span>/</span></a></li>
            <li><a className="color" href>Girls</a></li>
          </ul>
        </div>{/*/rating-area*/}
        <div className="socials-share">
          <a href><img src="images/blog/socials.png" alt="" /></a>
        </div>{/*/socials-share*/}
        
    {/* ----------------------------------------------- */}
        <ListCommnents data = {cmt} getReplay = {getReplay}/>
        <Comments getCmt = {getCmt} replay = {replay}/>
      </div>	
         
        
    );
  }
  
  export default Detail;
  