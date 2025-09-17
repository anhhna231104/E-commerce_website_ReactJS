import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { AddToCart } from "../Actions/cart";

function Index(props) {

    function handleCart(e, getID){
        let newItem = 12;

        const action = AddToCart(newItem)
        dispatch(action)


    }
   

    return (
        <button className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" onClick={(e)=>handleCart(getID)}/>Add to cart</button>

    );
}
export default Index;