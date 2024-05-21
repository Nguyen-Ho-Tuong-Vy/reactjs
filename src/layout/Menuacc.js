import { Link } from "react-router-dom";

function Menuacc(props) {
    // console.log(props)
    return (
        <div>
            <div className="col-sm-3">
        <div className="left-sidebar">
          <h2>Account</h2>
          <div className="panel-group category-products" id="accordian">{/*category-productsr*/}
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4 className="panel-title"><Link to={"/account/update"}>account</Link></h4>
              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4 className="panel-title"><Link to={"/account/my_product"}>My product</Link></h4>
              </div>
            </div>
          </div>{/*/category-products*/}
        </div>
      </div>
        </div>
        
    );
  }
  
  export default Menuacc;
  