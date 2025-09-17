import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import List from './Component/Blog/List';
import Detail from './Component/Blog/Detail';
import Home from './Component/Home';
import Update from './Component/Account/Update';
import MemberIndex from './Component/Member/MemberIndex';
import MyProduct from './Component/Account/MyProduct';
import AddProduct from './Component/Account/AddProduct';
import EditProduct from './Component/Account/EditProduct';
import ProductList from './Component/Product/ProductList';
import ProductDetail from './Component/Product/ProductDetail';
import ProductCart from './Component/Product/ProductCart';
import WishList from './Component/Product/WishList';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <Router>
      <App>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/blog/list' element={<List />} />
          <Route path='/blog/details/:id' element={<Detail />} />
          <Route path='/member' element={<MemberIndex />} />
          <Route path='/account/update/:id' element={<Update />} />
          {/* <Route path='/account/update/' element={<Update />} /> */}
          <Route path='/account/my-product' element={<MyProduct />} />
          <Route path='/account/add-product' element={<AddProduct />} />
          <Route path='/account/edit-product/:id' element={<EditProduct />} />
          <Route path='/product/list' element={<ProductList />} />
          <Route path='/product/detail/:id' element={<ProductDetail />} />
          <Route path='/cart' element={<ProductCart />} />
          <Route path='/product/wishlist' element={<WishList />} />
        </Routes>
      </App>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
