import logo from './logo.svg';
import './App.css';

import { Provider } from 'react-redux';
// import store from './Store';
import storeWL from './StoreWl';


import Header from './Component/Layout/MainLayout/Header';
import Footer from './Component/Layout/MainLayout/Footer';
import MenuLeft from './Component/Layout/MainLayout/MenuLeft';
import { useLocation } from 'react-router-dom';
import Slider from './Component/Layout/MainLayout/Slider';
import AccountSideBar from './Component/Layout/SubLayout/AccountSideBar';
import { UserContext } from './UserContext';
import { useState, useEffect } from "react";



function App(props) {
  const location = useLocation()
  const isSliderVisible = location.pathname === "/"
  const isVisibleMenuLeft = isSliderVisible || location.pathname.includes("blog") || location.pathname.includes("product/")
  const isAccountSideBarVisible = location.pathname.includes("account")

  useEffect(() => {
    if (localStorage.getItem('totalQty')) {
      setTotalQty(JSON.parse(localStorage.getItem('totalQty')))
    }
  }, [])

  const [totalQty, setTotalQty] = useState(0)
  function getQty(data) {
    console.log(data);
    setTotalQty(data)

  }

  console.log(totalQty);

  return (
    <Provider store={storeWL}>
      <UserContext.Provider value={{
      totalQty: totalQty,
        getQty: getQty
      }}>

      <Header className="App-header" />
      {isSliderVisible && <Slider />}
      <section className="container">
        <div className="row">
          {isVisibleMenuLeft && <MenuLeft />}
          {isAccountSideBarVisible && <AccountSideBar />}
          {props.children}
        </div>
      </section>
      <Footer />

      </UserContext.Provider>
    </Provider>
  );
}


export default App;
