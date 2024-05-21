import { useEffect, useState } from "react";
import API from "axios"

function Cart(props) {
    // console.log(props)
    const[errors, setErros] = useState({})
    const[getCart_product, setCart_product] = useState([])
    const[getTotal, setTotal] = useState('')

    var infor = localStorage.getItem("checkLogin")
        if(infor){
            infor = JSON.parse(infor)
        }
        let idUser = infor.data.Auth.id
        // console.log(idUser)

    var cartPr = localStorage.getItem("cart")
    if(cartPr){
        cartPr = JSON.parse(cartPr)
        // console.log(cartPr)
    }

    useEffect(()=>{
        API.post("http://localhost/laravel8/public/api/product/cart", cartPr)
        .then(res => {
            // console.log(res.data.data)
            setCart_product(res.data.data)
            if(res.data.errors){
                setErros(res.data.errors)
            }else{
                // alert("thanh cong")
            }
        })
      },[])
    
    console.log(getCart_product)

    function renderCart(){
        if(Object.keys(getCart_product).length > 0){
            return Object.keys(getCart_product).map((key, index)=>{

                const img = JSON.parse(getCart_product[key]["image"])

                var price = getCart_product[key]["price"]
				var qty = getCart_product[key]["qty"]
				var total = parseFloat(price) * parseInt(qty)

                return(
                    <tr key={key}>
                        <td className="cart_product">
                            <a href><img width={"90px"} src={"http://localhost/laravel8/public/upload/product/" + idUser + "/" + img[0]} alt="" /></a>
                        </td>
                        <td className="cart_description">
                            <h4>{getCart_product[key]["name"]}</h4>
                            <p>ID: {getCart_product[key]["id"]}</p>
                        </td>
                        <td className="cart_price">
                            <p>${getCart_product[key]["price"]}</p>
                        </td>
                        <td className="cart_quantity">
                            <div className="cart_quantity_button">
                                <a id={getCart_product[key]["id"]} onClick={renderUp} className="cart_quantity_up" href> + </a>
                                <input className="cart_quantity_input" type="text" name="quantity" value={getCart_product[key]["qty"]} autoComplete="off" size={2} />
                                <a id={getCart_product[key]["id"]} onClick={renderDown} className="cart_quantity_down" href> - </a>
                            </div>
                        </td>
                        <td className="cart_total">
                            <p className="cart_total_price">${total}</p>
                        </td>
                        <td className="cart_delete">
                            <a id={getCart_product[key]["id"]} onClick={renderDel} className="cart_quantity_delete" href>Delete</a>
                        </td>
                    </tr>
                )
            })
        }
    }

    function renderUp(e){
        // console.log(e.target.id)

        // copy ra 1 data mới 
        let newData = [...getCart_product]

        Object.keys(newData).map((key, index) =>{
            // console.log(getCart_product[key]["id"])
            if(newData[key]["id"] == e.target.id){
                newData[key]["qty"] +=1
            }
        })
        // console.log(newData)
        setCart_product(newData)

        var cartPr = localStorage.getItem("cart")
            if(cartPr){
                cartPr = JSON.parse(cartPr)
                if(cartPr[e.target.id]){
                    // console.log(cart[getId])
                    cartPr[e.target.id] += 1;
                }
                console.log(cartPr)
            }
            var cartPr = JSON.stringify(cartPr)
            localStorage.setItem("cart", cartPr)

    }

    function renderDown(e){
        let newData = [...getCart_product]

        Object.keys(newData).map((key, index) =>{
            // console.log(getCart_product[key]["id"])
            if(newData[key]["id"] == e.target.id){
                newData[key]["qty"] -=1
                if(newData[key]["qty"] < 1){
                    delete newData[key]
                }
            }
        })
        // console.log(newData)
        setCart_product(newData)

        var cartPr = localStorage.getItem("cart")
            if(cartPr){
                cartPr = JSON.parse(cartPr)
                if(cartPr[e.target.id]){
                    // console.log(cart[getId])
                    cartPr[e.target.id] -= 1;
                    if(cartPr[e.target.id] <1){
                        delete cartPr[e.target.id]
                        
                    }
                }
                // console.log(cartPr[e.target.id])
            }
            var cartPr = JSON.stringify(cartPr)
            localStorage.setItem("cart", cartPr)
    }

    function renderDel(e){
        // alert(e.target.id)
        let newData = [...getCart_product]

        Object.keys(newData).map((key, index) =>{
            // console.log(getCart_product[key]["id"])
            if(newData[key]["id"] == e.target.id){
                delete newData[key]
            }
        })
        // console.log(newData)
        setCart_product(newData)

        var cartPr = localStorage.getItem("cart")
            if(cartPr){
                cartPr = JSON.parse(cartPr)
                if(cartPr[e.target.id]){
                    delete cartPr[e.target.id]
                }
                // console.log(cartPr[e.target.id])
            }
            var cartPr = JSON.stringify(cartPr)
            localStorage.setItem("cart", cartPr)
    }

    function renderTotal(){
        
        let newData = [...getCart_product]
        var sum = 0
        Object.keys(newData).map((key, index) =>{
            if(newData[key]){
                sum = sum + (newData[key]["price"] * newData[key]["qty"])
            }
            
        })
        return(
            <li>Total <span>${sum}</span></li>
        )
        // console.log(sum)
    }

    return (
        <div>
            <section id="cart_items">
                <div className="container">
                    <div className="breadcrumbs">
                    <ol className="breadcrumb">
                        <li><a href="#">Home</a></li>
                        <li className="active">Shopping Cart</li>
                    </ol>
                    </div>
                    <div className="table-responsive cart_info">
                    <table className="table table-condensed">
                        <thead>
                            <tr className="cart_menu">
                                <td className="image">Item</td>
                                <td className="description" />
                                <td className="price">Price</td>
                                <td className="quantity">Quantity</td>
                                <td className="total">Total</td>
                                <td />
                            </tr>
                        </thead>
                        <tbody>
                            {renderCart()}
                        </tbody>
                    </table>
                    </div>
                </div>
            </section> {/*/#cart_items*/}

            <section id="do_action">
                <div className="container">
                    <div className="heading">
                    <h3>What would you like to do next?</h3>
                    <p>Choose if you have a discount code or reward points you want to use or would like to estimate your delivery cost.</p>
                    </div>
                    <div className="row">
                    <div className="col-sm-6">
                        <div className="chose_area">
                        <ul className="user_option">
                            <li>
                            <input type="checkbox" />
                            <label>Use Coupon Code</label>
                            </li>
                            <li>
                            <input type="checkbox" />
                            <label>Use Gift Voucher</label>
                            </li>
                            <li>
                            <input type="checkbox" />
                            <label>Estimate Shipping &amp; Taxes</label>
                            </li>
                        </ul>
                        <ul className="user_info">
                            <li className="single_field">
                            <label>Country:</label>
                            <select>
                                <option>United States</option>
                                <option>Bangladesh</option>
                                <option>UK</option>
                                <option>India</option>
                                <option>Pakistan</option>
                                <option>Ucrane</option>
                                <option>Canada</option>
                                <option>Dubai</option>
                            </select>
                            </li>
                            <li className="single_field">
                            <label>Region / State:</label>
                            <select>
                                <option>Select</option>
                                <option>Dhaka</option>
                                <option>London</option>
                                <option>Dillih</option>
                                <option>Lahore</option>
                                <option>Alaska</option>
                                <option>Canada</option>
                                <option>Dubai</option>
                            </select>
                            </li>
                            <li className="single_field zip-field">
                            <label>Zip Code:</label>
                            <input type="text" />
                            </li>
                        </ul>
                        <a className="btn btn-default update" href>Get Quotes</a>
                        <a className="btn btn-default check_out" href>Continue</a>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="total_area">
                        <ul>
                            <li>Cart Sub Total <span>$59</span></li>
                            <li>Eco Tax <span>$2</span></li>
                            <li>Shipping Cost <span>Free</span></li>
                            {renderTotal()}
                        </ul>
                        <a className="btn btn-default update" href>Update</a>
                        <a className="btn btn-default check_out" href>Check Out</a>
                        </div>
                    </div>
                    </div>
                </div>
            </section>{/*/#do_action*/}
        </div>
        
    );
  }
  
  export default Cart;
  