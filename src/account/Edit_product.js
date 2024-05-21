import { useEffect, useState } from "react";
import API from "axios"
import Errors from "../errors/Errors";
import { useParams } from "react-router-dom";

function Edit_product(props) {

    let params = useParams()
    // console.log(params.id)

    const [getEdit_product, setEdit_product] = useState({
        name:"",
        price:"",
        category:"",
        brand:"",
        status:1,
        company:"",
        detail:"",
        sale:0
    })

    const[errors, setErros] = useState({})

    const[getFile, setFile] = useState([])
    const[getImg, setImg] = useState([])
    const[getArray, setArray] = useState([])

    const[getCategory, setCategory] = useState([])
    const[getBrand, setBrand] = useState([])

    const getStatus = [
        {
            "id": 1,
            "name": "New",
        },
        {
            "id": 0,
            "name": "Sale",
        }
    ]

    var infor = localStorage.getItem("checkLogin")
        if(infor){
            infor = JSON.parse(infor)
            // console.log(infor)
        }
        
        let accessToken = infor.data.token
        // console.log(accessToken)
        let getId = infor.data.Auth.id
    let config = { 
        headers: { 
        'Authorization': 'Bearer '+ accessToken,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
        } 
    };

    useEffect(() => {
        API.get('http://localhost/laravel8/public/api/user/product/' + params.id, config )
        .then(response => {
            // console.log(response.data.data.image)
        setImg(response.data.data.image)
        setEdit_product({
            name: response.data.data.name,
            price: response.data.data.price,
            category: response.data.data.id_category,
            brand: response.data.data.id_brand,
            status: response.data.data.status,
            company: response.data.data.company_profile,
            detail: response.data.data.detail,
            sale: response.data.data.sale
          })
        })
    },[])

    useEffect(()=>{
        API.get('http://localhost/laravel8/public/api/category-brand' )
        .then(response => {
          setCategory(response.data.category)
          setBrand(response.data.brand)
        })
        .catch(function(error){
          console.log(error)
        })
    },[])
    

    const hanldeInput = (e)=> {
        const nameInput = e.target.name
        const valueInput = e.target.value
        setEdit_product(state => ({...state,[nameInput]:valueInput}))
    }

    function checkbox(){
        if(getImg.length > 0){
            return getImg.map((value, key) =>{
                return(
                    <>
                        <img width="50px" src={"http://localhost/laravel8/public/upload/product/" + getId + '/' + value} />
                        <input name="image" type="checkbox" value={value} onClick={hinhxoa}></input>
                    </>
                    
                )
            })
        }
    }

    function hinhxoa(e){
        if(e.target.checked){
            setArray(oldArray => [...oldArray,e.target.value])
        }
        else{
            let b = getArray.filter((getArray) => getArray != e.target.value )
            // console.log(b)
            setArray(b)
        }
        
        
    }

    function rendercategory(){
        if(getCategory.length > 0){
            return getCategory.map((value, key) =>{
                return(
                    <option value={value.id}>{value.category}</option>
                )
            })
        }
    }

    function renderbrand(){
        if(getCategory.length > 0){
            return getBrand.map((value, key) =>{
                return(
                    <option value={value.id}>{value.brand}</option>
                )
            })
        }
    }

    function renderstatus(){
        if(getStatus.length > 0){
            return getStatus.map((value, key) =>{
                return(
                    <option value={value.id}>{value.name}</option>
                )
                
            })
        }
    }


    function hanldeImageInputFile(e){
        const file = e.target.files
        // console.log(file)
        setFile(file)
    }

    function renderSale(){
        if(getEdit_product.status == 0){
            return (
                <input type="text" placeholder="Vui lòng nhập giá sale" name="sale" value={getEdit_product.sale} onChange={hanldeInput} />
            )
        }else{
            getEdit_product.sale = 0
        }
    }
    

    function hanldeSubmit(e){
        // console.log(getArray)


        e.preventDefault()
        let errorsSubmit = {}
        let flag = true

        if(getEdit_product.name == ""){
            errorsSubmit.name = "vui lòng nhập name"
            flag = false
        }

        if(getEdit_product.price == ""){
            errorsSubmit.price = "vui lòng nhập giá tiền"
            flag = false
        }

        if(getEdit_product.category == ""){
            errorsSubmit.category = "vui lòng chọn sản phẩm"
            flag = false
        }

        if(getEdit_product.brand == ""){
            errorsSubmit.brand = "vui lòng chọn thương hiệu"
            flag = false
        }
        
        if(getEdit_product.status == 0){
            if(getEdit_product.sale == ""){
                errorsSubmit.sale = "vui lòng nhập giá sale"
                flag = false
            }
        }

        if(getEdit_product.company == ""){
            errorsSubmit.company = "vui lòng nhập tên công ty"
            flag = false
        }

        if(getFile == ""){
            errorsSubmit.Image = "vui lòng chọn hình ảnh"
            flag = false
        }else{
            // console.log(getFile)
            Object.keys(getFile).map((key, index) =>{
                let getSize = getFile[key]["size"]
                let getName= getFile[key]["name"]
                // console.log(getSize)

                if(getSize > 1024 * 1024){
                    errorsSubmit.Image = "file > 1mb"
                }else{
                    let arrImg =["png", "jpg", "jpeg", "PNG", "JPG"]
                    const myArray = getName.split(".")
                    // console.log(myArray[1])
                    let checkImg = arrImg.includes(myArray[1])
                    // console.log(checkImg)
                    if(checkImg == false){
                        errorsSubmit.Image = "không phải là hình ảnh"
                    }
                }
            })
        }

        if(getEdit_product.detail == ""){
            errorsSubmit.detail = "vui lòng nhập thông tin"
            flag = false
        }


        if(!flag){
            setErros(errorsSubmit)
        }else{
            setErros({})
            // alert("ok")
            
            
            const formData = new FormData();
            formData.append('name', getEdit_product.name);
            formData.append('price', getEdit_product.price);
            formData.append('category', getEdit_product.category);
            formData.append('brand', getEdit_product.brand);
            formData.append('company', getEdit_product.company);
            formData.append('detail', getEdit_product.detail);
            formData.append('status', getEdit_product.status);
            formData.append('sale', getEdit_product.sale);

            getArray.map((value, key) =>{
                formData.append("avatarCheckBox[]",value)
            })

            Object.keys(getFile).map((key, index) => {
                formData.append("file[]",getFile[key])
            })

            API.post("http://localhost/laravel8/public/api/user/product/update/" + params.id, formData, config)
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
        <section>
            <div className="container">
                <div className="row">
                    <div className="col-sm-9">
                        <div className="blog-post-area">
                            <h2 className="title text-center">Create product</h2>
                            <div className="signup-form">{/*sign up form*/}
                                <h2>New Product!</h2>
                                <form onSubmit={hanldeSubmit} encType="multipart/form-data" action="#">
                                    <input type="text" placeholder="Name" name="name" value={getEdit_product.name} onChange={hanldeInput}/>
                                    <input type="text" placeholder="Price" name="price" value={getEdit_product.price} onChange={hanldeInput}/>
                                    <select name="category" value={getEdit_product.category} onChange={hanldeInput}>
                                        <option value="">Vui lòng chọn sản phẩm</option>
                                        {renderbrand()}
                                    </select>
                                    <select name="brand" value={getEdit_product.brand} onChange={hanldeInput}> 
                                        <option value="">Vui lòng chọn thương hiệu</option>
                                        {rendercategory()} 
                                    </select>
                                    <select name="status" value={getEdit_product.status} onChange={hanldeInput}> {renderstatus()} </select>
                                    {renderSale()}
                                    <input type="text" placeholder="Company profile" name="company" value={getEdit_product.company} onChange={hanldeInput}/>
                                    <input type="file" placeholder="Image" multiple onChange={hanldeImageInputFile}/>
                                    {checkbox()}
                                    <textarea placeholder="Detail" name="detail" value={getEdit_product.detail} onChange={hanldeInput}/>
                                    <button type="submit" className="btn btn-default">Add</button>
                                    
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
  
  export default Edit_product;
  