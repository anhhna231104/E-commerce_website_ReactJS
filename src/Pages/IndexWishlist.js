import React from "react";

import { useSelector, useDispatch } from "react-redux";

function IndexWishlist(props) {

    function handleWishlist(e, getID) {
        let newItem = getID
        const action = AddToWishlist(newItem)
        dispatch(action)
    }


    return (
        <li><a onClick={(e) => handleWishlist(e,getID)}><i className="fa fa-plus-square" />Add to wishlist</a></li>

    );
}
export default IndexWishlist;