import { useState } from "react"
import Errors from "../errors/Errors"
import { useNavigate } from "react-router-dom";
import API from "axios"

function Login(props) {
    console.log(props)

    const navigate = useNavigate()

    const [getItemlogin, setItemlogin] = useState({
        email:"",
        password:"",
        level: 0
    })

    const [errors, setErros] = useState({})

    const hanldeInput = (e) => {
        const nameInput = e.target.name
        const valueInput = e .target.value
        setItemlogin(state => ({...state,[nameInput]:valueInput}))
    }
     
    function hanldeSubmit(e){
        e.preventDefault()
        let errorsSubmit = {}
        let flag = true
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        
        if(getItemlogin.email == ""){
            errorsSubmit.email = "vui lòng nhập email"
            flag = false
        }else{
            if(!regex.test(getItemlogin.email)){
                errorsSubmit.email = "vui lòng nhập đúng định dạng email"
                flag = false
            }
        }

        if(getItemlogin.password == ""){
            errorsSubmit.password = "vui lòng nhập pass"
            flag = false
        }

        if(!flag){
            setErros(errorsSubmit)
        }else{
            setErros({})

            if(flag){
                const data = {
                    email: getItemlogin.email,
                    password: getItemlogin.password,
                    level: 0
                }

                API.post("http://localhost/laravel8/public/api/login",data)
                .then(response => {
                    if(response.data.errors){
                        setErros(response.data.errors)
                    }else{
                        console.log(response)
                        navigate('/')

                    const infor = JSON.stringify(response)
                    localStorage.setItem("checkLogin",infor)
                    
                    }
                })
                .catch(function(error){
                    console.log(error)
                })
            }
        }
    }

    return (
    <div className="login-form">{/*login form*/}
        <h2>Login to your account</h2>
        <form onSubmit={hanldeSubmit} action="#">
          <input type="email" placeholder="Email Address" name="email" onChange={hanldeInput} />
          <input type="password" placeholder="Password" name="password" onChange={hanldeInput} />
          <input type="text"  name="level" value={getItemlogin.level} onChange={hanldeInput} />
          <span>
            <input type="checkbox" className="checkbox" /> 
            Keep me signed in
          </span>
          <button type="submit" className="btn btn-default">Login</button>
        </form>

        <Errors errors ={errors}/>
      </div>
        
    );
  }
  
  export default Login;
  