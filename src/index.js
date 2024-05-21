import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './home/Home';
import Index from './blog/Index';
import Detail from './blog/Detail';
import Indexlogin from './member/Indexlogin';
import Account from './account/Account';
import Add_product from './account/Add_product';
import My_product from './account/My_product';
import Edit_product from './account/Edit_product';
import Product_detail from './home/Product_detail';
import Cart from './home/Cart';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App>
        <Routes>
          <Route path='/' element={<Home/>}/>

          <Route path='/product/detail/:id' element={<Product_detail/>}/>
          <Route path='/product/cart' element={<Cart/>}/>

          <Route path='/account/update' element={<Account/>}/>
          <Route path='/account/add_product' element={<Add_product/>}/>
          <Route path='/account/my_product' element={<My_product/>}/>
          <Route path='/account/edit_product/:id' element={<Edit_product/>}/>

          <Route path='/blog/detail/:id' element={<Detail/>}/>
          <Route path='/blog/list' element={<Index/>}/>
          <Route path='/login' element={<Indexlogin/>}/>
        </Routes>
      </App>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
