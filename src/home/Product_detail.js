import { useEffect, useState } from "react"
import API from "axios"
import { useParams } from "react-router-dom";
function Product_detail(){

    let params = useParams()

    var infor = localStorage.getItem("checkLogin")
        if(infor){
            infor = JSON.parse(infor)
            // console.log(infor)
        }
    let getId = infor.data.Auth.id

    const[getProduct_detail, setProduct_detail ] = useState([])
    const[getPr_ImgBig, setPr_ImgBig ] = useState('')
    const[getPr_ImgSlide, setPr_ImgSlide ] = useState([])
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

    useEffect(()=>{
        API.get('http://localhost/laravel8/public/api/product/detail/' + params.id  )
        .then(response => {
          setProduct_detail(response.data.data)
          setPr_ImgBig(JSON.parse(response.data.data.image)[0])
          setPr_ImgSlide(JSON.parse(response.data.data.image))
        })
        .catch(function(error){
          console.log(error)
        })
    },[])
    // console.log(getPr_ImgBig)

    function renderPr_detail(){
        if(Object.keys(getProduct_detail).length > 0){
          return(
            <div className="product-details">{/*product-details*/}
              <div className="col-sm-5">
                <div className="view-product">
                  <img src={"http://localhost/laravel8/public/upload/product/" + getId + '/' + getPr_ImgBig} alt="" />
                  <a href="images/product-details/1.jpg" rel="prettyPhoto"><h3>ZOOM</h3></a>
                </div>
                <div id="similar-product" className="carousel slide" data-ride="carousel">
                  {/* Wrapper for slides */}
                  <div className="carousel-inner">
                    <div className="item active">
                      {getPr_ImgSlide.map((value, key)=>{
                        return(
                          <a  href><img onClick={toto} width="90px" src={"http://localhost/laravel8/public/upload/product/" + getId + '/' + value} alt="" /></a>
                        )
                      })}
                    </div>
                    {/* <div className="item">
                      <a href><img width="90px" src={"http://localhost/laravel8/public/upload/product/" + getId + '/' + getImg[0]} alt="" /></a>
                      <a href><img width="90px" src={"http://localhost/laravel8/public/upload/product/" + getId + '/' + getImg[1]} alt="" /></a>
                      <a href><img width="90px" src={"http://localhost/laravel8/public/upload/product/" + getId + '/' + getImg[2]} /></a>
                    </div>
                    <div className="item">
                      <a href><img width="90px" src={"http://localhost/laravel8/public/upload/product/" + getId + '/' + getImg[0]} alt="" /></a>
                      <a href><img width="90px" src={"http://localhost/laravel8/public/upload/product/" + getId + '/' + getImg[1]} alt="" /></a>
                      <a href><img width="90px" src={"http://localhost/laravel8/public/upload/product/" + getId + '/' + getImg[2]} /></a>
                    </div> */}
                  </div>
                  {/* Controls */}
                  <a className="left item-control" href="#similar-product" data-slide="prev">
                    <i className="fa fa-angle-left" />
                  </a>
                  <a className="right item-control" href="#similar-product" data-slide="next">
                    <i className="fa fa-angle-right" />
                  </a>
                </div>
              </div>
              <div className="col-sm-7">
                <div className="product-information">{/*/product-information*/}
                  <img src="images/product-details/new.jpg" className="newarrival" alt="" />
                  <h2>{getProduct_detail["name"]}</h2>
                  <p>ID: {getProduct_detail["id"]}</p>
                  <img src="images/product-details/rating.png" alt="" />
                  <span>
                    <span>${getProduct_detail["price"]}</span>
                    <label>Quantity:</label>
                    <input type="text" defaultValue={0} />
                    <button type="button" className="btn btn-fefault cart">
                      <i className="fa fa-shopping-cart" />
                      Add to cart
                    </button>
                  </span>
                  <p><b>Availability:</b> In Stock</p>
                  
                  {getStatus.map((value, key)=>{
                    if(value.id == getProduct_detail["status"]){
                      return(
                        <p><b>Condition:</b> {value.name}</p>
                      )
                    }
                  })}
                  
                  {getCategory.map((value, key)=>{
                    if(value.id == getProduct_detail["id_brand"]){
                      return(
                        <p><b>Brand:</b> {value.category}</p>
                      )
                    }
                  })}
                  <a href><img src="images/product-details/share.png" className="share img-responsive" alt="" /></a>
                </div>{/*/product-information*/}
              </div>
            </div>
          )
        }
    }
    function toto(e){
      const i = e.target.src.split("/")
      setPr_ImgBig(i[8])
      // console.log(i[8])
    }

    return (
        <section>
        <div className="container">
          <div className="row">
            <div className="col-sm-9 padding-right">
                {renderPr_detail()}
              
              <div className="category-tab shop-details-tab">{/*category-tab*/}
                <div className="col-sm-12">
                  <ul className="nav nav-tabs">
                    <li><a href="#details" data-toggle="tab">Details</a></li>
                    <li><a href="#companyprofile" data-toggle="tab">Company Profile</a></li>
                    <li><a href="#tag" data-toggle="tab">Tag</a></li>
                    <li className="active"><a href="#reviews" data-toggle="tab">Reviews (5)</a></li>
                  </ul>
                </div>
                <div className="tab-content">
                  <div className="tab-pane fade" id="details">
                    <div className="col-sm-3">
                      <div className="product-image-wrapper">
                        <div className="single-products">
                          <div className="productinfo text-center">
                            <img src="images/home/gallery1.jpg" alt="" />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="product-image-wrapper">
                        <div className="single-products">
                          <div className="productinfo text-center">
                            <img src="images/home/gallery2.jpg" alt="" />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="product-image-wrapper">
                        <div className="single-products">
                          <div className="productinfo text-center">
                            <img src="images/home/gallery3.jpg" alt="" />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="product-image-wrapper">
                        <div className="single-products">
                          <div className="productinfo text-center">
                            <img src="images/home/gallery4.jpg" alt="" />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="companyprofile">
                    <div className="col-sm-3">
                      <div className="product-image-wrapper">
                        <div className="single-products">
                          <div className="productinfo text-center">
                            <img src="images/home/gallery1.jpg" alt="" />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="product-image-wrapper">
                        <div className="single-products">
                          <div className="productinfo text-center">
                            <img src="images/home/gallery3.jpg" alt="" />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="product-image-wrapper">
                        <div className="single-products">
                          <div className="productinfo text-center">
                            <img src="images/home/gallery2.jpg" alt="" />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="product-image-wrapper">
                        <div className="single-products">
                          <div className="productinfo text-center">
                            <img src="images/home/gallery4.jpg" alt="" />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="tag">
                    <div className="col-sm-3">
                      <div className="product-image-wrapper">
                        <div className="single-products">
                          <div className="productinfo text-center">
                            <img src="images/home/gallery1.jpg" alt="" />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="product-image-wrapper">
                        <div className="single-products">
                          <div className="productinfo text-center">
                            <img src="images/home/gallery2.jpg" alt="" />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="product-image-wrapper">
                        <div className="single-products">
                          <div className="productinfo text-center">
                            <img src="images/home/gallery3.jpg" alt="" />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="product-image-wrapper">
                        <div className="single-products">
                          <div className="productinfo text-center">
                            <img src="images/home/gallery4.jpg" alt="" />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade active in" id="reviews">
                    <div className="col-sm-12">
                      <ul>
                        <li><a href><i className="fa fa-user" />EUGEN</a></li>
                        <li><a href><i className="fa fa-clock-o" />12:41 PM</a></li>
                        <li><a href><i className="fa fa-calendar-o" />31 DEC 2014</a></li>
                      </ul>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                      <p><b>Write Your Review</b></p>
                      <form action="#">
                        <span>
                          <input type="text" placeholder="Your Name" />
                          <input type="email" placeholder="Email Address" />
                        </span>
                        <textarea name defaultValue={""} />
                        <b>Rating: </b> <img src="images/product-details/rating.png" alt="" />
                        <button type="button" className="btn btn-default pull-right">
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>{/*/category-tab*/}
              <div className="recommended_items">{/*recommended_items*/}
                <h2 className="title text-center">recommended items</h2>
                <div id="recommended-item-carousel" className="carousel slide" data-ride="carousel">
                  <div className="carousel-inner">
                    <div className="item active">	
                      <div className="col-sm-4">
                        <div className="product-image-wrapper">
                          <div className="single-products">
                            <div className="productinfo text-center">
                              <img src="images/home/recommend1.jpg" alt="" />
                              <h2>$56</h2>
                              <p>Easy Polo Black Edition</p>
                              <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="product-image-wrapper">
                          <div className="single-products">
                            <div className="productinfo text-center">
                              <img src="images/home/recommend2.jpg" alt="" />
                              <h2>$56</h2>
                              <p>Easy Polo Black Edition</p>
                              <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="product-image-wrapper">
                          <div className="single-products">
                            <div className="productinfo text-center">
                              <img src="images/home/recommend3.jpg" alt="" />
                              <h2>$56</h2>
                              <p>Easy Polo Black Edition</p>
                              <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="item">	
                      <div className="col-sm-4">
                        <div className="product-image-wrapper">
                          <div className="single-products">
                            <div className="productinfo text-center">
                              <img src="images/home/recommend1.jpg" alt="" />
                              <h2>$56</h2>
                              <p>Easy Polo Black Edition</p>
                              <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="product-image-wrapper">
                          <div className="single-products">
                            <div className="productinfo text-center">
                              <img src="images/home/recommend2.jpg" alt="" />
                              <h2>$56</h2>
                              <p>Easy Polo Black Edition</p>
                              <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="product-image-wrapper">
                          <div className="single-products">
                            <div className="productinfo text-center">
                              <img src="images/home/recommend3.jpg" alt="" />
                              <h2>$56</h2>
                              <p>Easy Polo Black Edition</p>
                              <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <a className="left recommended-item-control" href="#recommended-item-carousel" data-slide="prev">
                    <i className="fa fa-angle-left" />
                  </a>
                  <a className="right recommended-item-control" href="#recommended-item-carousel" data-slide="next">
                    <i className="fa fa-angle-right" />
                  </a>			
                </div>
              </div>{/*/recommended_items*/}
            </div>
          </div>
        </div>
      </section>
        
    );
  }

  export default Product_detail;
  