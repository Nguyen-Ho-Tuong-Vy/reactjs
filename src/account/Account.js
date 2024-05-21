import { useEffect, useState } from "react";
import API from "axios"
import Errors from "../errors/Errors";

function Account(props) {
    // console.log(props)
    const[getToken, setToken] = useState('')
    const[getId, setId] = useState('')
    console.log(getToken)
    const[errors, setErros] = useState({})
    const[avatar, setAvatar] = useState('')
    const[getFile, setFile] = useState('')
    const [account, setAccount] = useState({
        name:"",
        email:"",
        phone:"",
        address:"",
        password:"",
        level: 0
    })
    useEffect(() => {
        let infor = localStorage.getItem("checkLogin")
        if(infor){
            infor = JSON.parse(infor)
            infor = infor.data
            setToken(infor.token)
            setId(infor.Auth.id)
            setAccount({
                name: infor.Auth.name,
                email: infor.Auth.email,
                phone: infor.Auth.phone,
                address: infor.Auth.address,
                password: infor.Auth.password,
                level: infor.Auth.level
            })
        }
    },[])

    const hanldeInput = (e) => {
        const nameInput = e.target.name 
        const valueInput = e.target.value
        setAccount(state => ({...state,[nameInput]:valueInput}))
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

       
        if(account.name == ""){
            errorsSubmit.name = "vui lòng nhập name"
            flag = false
        }

        if(account.email == ""){
            errorsSubmit.email = "vui lòng nhập email"
            flag = false
        }else{
            if(!regex.test(account.email)){
                errorsSubmit.email = "vui lòng nhập đúng định dạng email"
                flag = false
            }
        }

        if(account.phone == ""){
            errorsSubmit.phone = "vui lòng nhập phone"
            flag = false
        }

        if(account.address == ""){
            errorsSubmit.address = "vui lòng nhập address"
            flag = false
        }


        if(account.password == ""){
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
            // console.log(getSize)

            if(getSize > 1024 * 1024){
                errorsSubmit.avatar = "file > 1mb"
            }else{
                let arrImg =["png", "jpg", "jpeg", "PNG", "JPG"]
                const myArray = getName.split(".")
                // console.log(myArray[1])
                let checkImg = arrImg.includes(myArray[1])
                // console.log(checkImg)
                if(checkImg == false){
                    errorsSubmit.avatar = "không phải là hình ảnh"
                }
            }
        }


        if(!flag){
            setErros(errorsSubmit)
        }else{
            setErros({})

            let config = { 
                headers: { 
                'Authorization': 'Bearer '+ getToken,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
                } 
            };

            const data = {
                name: account.name,
                email:account.email,
                phone:account.phone,
                address:account.address,
                avatar:avatar,
                password:account.password,
                level:account.level
            }
        API.post("http://localhost/laravel8/public/api/user/update/" + getId, data, config)
            .then((res)=>{
                console.log(res)
                if(res.data.errors){
                    setErros(res.data.errors)
                }else{
                    alert("update thanh cong")
                    const infor = JSON.stringify(res)
                    localStorage.setItem("checkLogin",infor)
                }
            })
    
        }
    }
    return (
        <section>
            <div className="container">
                <div className="row">
                    <div className="col-sm-9">
                        <div className="blog-post-area">
                            <h2 className="title text-center">Update user</h2>
                            <div className="signup-form">{/*sign up form*/}
                                <h2>New User Signup!</h2>
                                <form onSubmit={hanldeSubmit} encType="multipart/form-data" action="#">
                                    <input type="text" placeholder="Name" name="name"  value={account.name} onChange={hanldeInput} />
                                    <input type="email" placeholder="Email Address" name="email" readOnly value={account.email} onChange={hanldeInput} />
                                    <input type="text" placeholder="Phone" name="phone" value={account.phone} onChange={hanldeInput} />
                                    <input type="text" placeholder="Address" name="address" value={account.address} onChange={hanldeInput} />
                                    <input type="password" placeholder="Password" name="password" value="" onChange={hanldeInput} />
                                    <input type="text" name="level" value={account.level} onChange={hanldeInput} />
                                    <input type="file" placeholder="Avatar" onChange={hanldeUserInputFile} />
                                    <button type="submit" className="btn btn-default">Signup</button>
                                </form>
                                <Errors errors = {errors}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
    );
  }
  
  export default Account;
  

  

  