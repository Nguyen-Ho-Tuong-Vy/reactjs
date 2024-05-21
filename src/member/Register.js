import { useState } from "react";
import Errors from "../errors/Errors";
import API from "axios"

function Register(props) {
    // console.log(props)

    const [getRigister, setRigister] = useState({
        name:"",
        email:"",
        phone:"",
        address:"",
        password:"",
        level: 0
    })

    const[errors, setErros] = useState({})
    const[avatar, setAvatar] = useState('')
    const[getFile, setFile] = useState('')

    const hanldeInput = (e)=> {
        const nameInput = e.target.name
        const valueInput = e.target.value
        setRigister(state => ({...state,[nameInput]:valueInput}))
    }

    function hanldeUserInputFile(e){
        const file = e.target.files

        
        // console.log(file)
        let reader = new FileReader()
        reader.onload = (e) => {
        setAvatar(e.target.result)
        setFile(file[0])
            
        }
        reader.readAsDataURL(file[0])
    }
    

    function hanldeSubmit(e){
        e.preventDefault()
        let errorsSubmit = {}
        let flag = true
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

       
        if(getRigister.name == ""){
            errorsSubmit.name = "vui lòng nhập name"
            flag = false
        }

        if(getRigister.email == ""){
            errorsSubmit.email = "vui lòng nhập email"
            flag = false
        }else{
            if(!regex.test(getRigister.email)){
                errorsSubmit.email = "vui lòng nhập đúng định dạng email"
                flag = false
            }
        }

        if(getRigister.phone == ""){
            errorsSubmit.phone = "vui lòng nhập phone"
            flag = false
        }

        if(getRigister.address == ""){
            errorsSubmit.address = "vui lòng nhập address"
            flag = false
        }


        if(getRigister.password == ""){
            errorsSubmit.password = "vui lòng nhập pass"
            flag = false
        }

        if(getFile == ""){
            errorsSubmit.avatar = "vui lòng chọn hình ảnh"
            flag = false
        }else{
            console.log(getFile)
            let getSize = getFile.size
            let getName= getFile.name
            console.log(getSize)

            if(getSize > 1024 * 1024){
                errorsSubmit.avatar = "file > 1mb"
            }else{
                let arrImg =["png", "jpg", "jpeg", "PNG", "JPG"]
                const myArray = getName.split(".")
                console.log(myArray[1])
                let checkImg = arrImg.includes(myArray[1])
                console.log(checkImg)
                if(checkImg == false){
                    errorsSubmit.avatar = "không phải là hình ảnh"
                }
            }
        }


        if(!flag){
            setErros(errorsSubmit)
        }else{
            setErros({})
            const data = {
                name: getRigister.name,
                email: getRigister.email,
                phone:getRigister.phone,
                address:getRigister.address,
                avatar:avatar,
                password:getRigister.password,
                level: getRigister.level
            }
        API.post("http://localhost/laravel8/public/api/register", data)
            .then((res)=>{
                console.log(res)
                if(res.data.errors){
                    setErros(res.data.errors)
                }else{
                    alert("thanh cong")
                }
            })
    
        }

    
       
    }
    return (
        <div className="signup-form">{/*sign up form*/}
        <h2>New User Signup!</h2>
        <form onSubmit={hanldeSubmit} encType="multipart/form-data" action="#">
          <input type="text" placeholder="Name" name="name" value={getRigister.name} onChange={hanldeInput} />
          <input type="email" placeholder="Email Address" name="email" value={getRigister.email} onChange={hanldeInput} />
          <input type="text" placeholder="Phone" name="phone" value={getRigister.phone} onChange={hanldeInput} />
          <input type="text" placeholder="Address" name="address" value={getRigister.address} onChange={hanldeInput} />
          <input type="password" placeholder="Password" name="password" value={getRigister.password} onChange={hanldeInput} />
          <input type="text" name="level" value={getRigister.level} onChange={hanldeInput} />
          <input type="file" placeholder="Avatar" onChange={hanldeUserInputFile} />
          <button type="submit" className="btn btn-default">Signup</button>
        </form>
        <Errors errors = {errors}/>
      </div>
        
    );
  }
  
  export default Register;
  

