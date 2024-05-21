import { useEffect, useState } from "react"
import Errors from "../errors/Errors"
import axios from "axios"
import { useParams } from "react-router-dom";
import ListCommnents from "./ListComments";


function Comments(props) {
    // console.log(props)
    let params = useParams()
    // console.log(params.id)
    // let {replay} = props
    const [post, setPost] = useState({
      message:""
    })

    const [errors, setErros] = useState({})

    const hanldeInput = (e) => {
        const nameInput = e.target.name
        const valueInput = e .target.value
        setPost(state => ({...state,[nameInput]:valueInput}))
    }

    function hanldeSubmit(e){
      e.preventDefault()
      let errorsSubmit = {}
      let flag = true
      var infor = localStorage.getItem("checkLogin")
      
      if(infor){
        
        if(post.message == ""){
          errorsSubmit.message = "vui lòng nhập comments"
          flag = false
        }
  
        if(!flag){
          setErros(errorsSubmit)
        }else{
          setErros({})
     
          infor = JSON.parse(infor)
          // console.log(infor)
          let accessToken = infor.data.token
          console.log(accessToken)

          let config = { 
            headers: { 
            'Authorization': 'Bearer '+ accessToken,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
            } 
          };

          if(post.message){
            const formData = new FormData()
            formData.append('id_blog', params.id)
            formData.append('id_user', infor.data.Auth.id)
            formData.append('id_comment',props.replay ? props.replay : 0 )
            formData.append('comment', post.message)
            formData.append('image_user',infor.data.Auth.avatar)
            formData.append('name_user', infor.data.Auth.name)

            axios.post('http://localhost/laravel8/public/api/blog/comment/' + params.id, formData, config)
            .then(response =>{
              console.log(response.data)
            props.getCmt(response.data.data)
            
            })
          }
        }
      }else{
        alert("vui lòng login để được comments")
      }

      
    }
    return ( 
      
        <div className="replay-box">
            <div className="row">
                <div className="col-sm-12">
                    <h2>Leave a replay</h2>
                    <div className="text-area">
                      <div className="blank-arrow">
                        <label>Your Name</label>
                      </div>
                      <span>*</span>
                      <form onSubmit={hanldeSubmit}>
                        <textarea name="message" rows={11} defaultValue={""} onChange={hanldeInput} />
                        <button  type="submit"  className="btn btn-primary">post comment</button>
                      </form>
                    </div>
                    <Errors errors ={errors}/>
                </div>
            </div>
        </div>
    );
  }
  
  export default Comments;
  