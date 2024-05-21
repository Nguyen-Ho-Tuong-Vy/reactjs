import { useEffect, useState } from "react"
import API from "axios"
import { Link, useNavigate } from "react-router-dom"
import Edit_product from "./Edit_product"
function My_product(props) {
    // console.log(props)
    const navigate = useNavigate()
    const [information, setInformation] = useState([])

    var infor = localStorage.getItem("checkLogin")
        if(infor){
            infor = JSON.parse(infor)
            // console.log(infor)
        }
        
        let accessToken = infor.data.token
        // console.log(accessToken)
        let idUser = infor.data.Auth.id
        // console.log(idUser)
        
    
    let config = { 
        headers: { 
        'Authorization': 'Bearer '+ accessToken,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
        } 
    };
    useEffect(()=>{
        API.get('http://localhost/laravel8/public/api/user/my-product', config )
        .then(response => {
          setInformation(response.data.data)
        })
        .catch(function(error){
          console.log(error)
        })
    },[])
    // console.log(information)

    function xx (e){
        // console.log(e.target.id)
        API.get('http://localhost/laravel8/public/api/user/product/delete/' + e.target.id, config)
        .then(response => {
        console.log(response)
        setInformation(response.data.data)
        })
    }
    
    // function renderUpdate(e){
    //     console.log(e.target.id)
    //     navigate('/account/edit_product')
    // }

    function renderInfomation(){
        if(Object.keys(information).length > 0){
            return Object.keys(information).map((key, index) =>{
                const img = JSON.parse(information[key]["image"])
                // console.log(img[0])
                return(
                    <tr key={key}>
                        <td className="cart_product">
                            <a href><img width={"90px"} src={"http://localhost/laravel8/public/upload/product/" + idUser + "/" + img[0]} alt="" /></a>
                        </td>
                        <td className="cart_description">
                            <h4>{information[key]["name"]}</h4>
                            <p>ID: {information[key]["id"]}</p>
                        </td>
                        <td className="cart_price">
                            <p>${information[key]["price"]}</p>
                        </td>
                            <td className="cart_quantity">
                        <div className="cart_quantity_button">
                            <a className="cart_quantity_up" href> + </a>
                            <input className="cart_quantity_input" type="text" name="quantity" defaultValue={1} autoComplete="off" size={2} />
                            <a className="cart_quantity_down" href> - </a>
                        </div>
                        </td>
                        <td className="cart_total">
                            <p className="cart_total_price" />
                        </td>
                        <td className="cart_delete">
                            <Link to={"/account/edit_product/" + information[key]["id"]}>update</Link>
                            <a id={information[key]["id"]} className="cart_quantity_delete" onClick={xx}>delete</a>
                        </td>
                    </tr>
                )
            })
        }
    }

    
    
    return (
        <div className="col-sm-9 ">
            <div className="table-responsive cart_info ">
                <table className="table table-condensed">
                    <thead>
                    <tr className="cart_menu">
                        <td className="image">Item</td>
                        <td className="description">Name</td>
                        <td className="price">Price</td>
                        <td className="quantity">Quantity</td>
                        <td className="total">Total</td>
                        <td></td>
                    </tr>
                    </thead>
                    <tbody>
                        {renderInfomation()}
                    </tbody>
                </table>
            </div>
            <button className="btn btn-default"><Link to={"/account/add_product"}>Add New</Link></button>
        </div>
        
    );
  }
  
  export default My_product;
  