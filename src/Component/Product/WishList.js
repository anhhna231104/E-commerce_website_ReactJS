import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";
import { useSelector, useDispatch } from "react-redux";
import { AddToCart } from "../../Actions/cart";

function WishList(props) {
    const dispatch = useDispatch();
    // const totalQty = useSelector(state => state.totalQty);

    const cart = useContext(UserContext)


    const wl = useSelector(state => state.id);

    const [product, setProduct] = useState({})
    const [wishlist, setWishlist] = useState([])
    const [images, setImages] = useState({})

    useEffect(() => {
        // if (localStorage.getItem('wishlist')) {
        //     setWishlist(JSON.parse(localStorage.getItem('wishlist')))
        // }

        if (wl) {
            setWishlist(wl)
        }

        axios.get('https://localhost/laravel8/public/api/product/wishlist')
            .then((res) => {
                console.log(res.data.data);
                res.data.data.map((value, index) => {
                    setProduct((state) => ({ ...state, [value['id']]: value }))
                    setImages((state) => ({ ...state, [value['id']]: JSON.parse(value['image']) }))
                })

            })
            .catch(error => {
                console.log(error);
            })
    }, [])


    function handleCart(getID) {
        console.log(getID);
        let qty = 1
        let addCart = {}
        let localCart = {}

        addCart = {
            [getID]: qty
        }

        if (localStorage.getItem('cartItem')) {
            localCart = JSON.parse(localStorage.getItem('cartItem'))
        }

        if (localCart[getID]) {
            localCart[getID] = JSON.stringify(parseInt(localCart[getID]) + parseInt(qty))
        }
        else {
            localCart = Object.assign({}, localCart, addCart)
        }

        let local = JSON.stringify(localCart)
        localStorage.setItem('cartItem', local)

        let total = 0
        Object.keys(localCart).map((key, index) => {
            total += parseInt(localCart[key])
        })
        //context
        cart.getQty(total)
        const x = JSON.stringify(total)
        localStorage.setItem('totalQty', x)

        //redux
        // dispatch(AddToCart(total));

    }

    function handleRmvWL(getID) {
        let newWishlist = wishlist.filter(item => item != getID)
        setWishlist(newWishlist)
        localStorage.setItem('wishlist', JSON.stringify(newWishlist))
        renderWishlist()
    }

    function renderWishlist(e) {

        if (Object.keys(product).length > 0) {
            return wishlist.map((value, index) => {
                let imgSrc
                Object.keys(images).map((key, index1) => {
                    if (key == value) {
                        imgSrc = `http://localhost/laravel8/public/upload/product/${product[key]['id_user']}/${images[key][0]}`
                        // console.log(imgSrc);
                    }

                })
                let getID = product[value]['id']
                let linkID = `/product/detail/${getID}`

                return (
                    <div className="col-sm-4">
                        <div className="product-image-wrapper">
                            <div className="single-products">
                                <div className="productinfo text-center">
                                    <img src={imgSrc} alt="" />
                                    <h2>${product[value]['price']}</h2>
                                    <p>{product[value]['name']}</p>
                                    <button className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                                    <br />
                                    <Link to={linkID} className="btn btn-default add-to-cart">Read more</Link>
                                </div>
                                <div className="product-overlay">
                                    <div className="overlay-content">
                                        <h2>${product[value]['price']}</h2>
                                        <p>{product[value]['name']}</p>
                                        <button className="btn btn-default add-to-cart" onClick={() => handleCart(getID)}><i className="fa fa-shopping-cart" />Add to cart</button>
                                        <br />
                                        <Link to={linkID} className="btn btn-default add-to-cart">Read more</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="choose">
                                <ul className="nav nav-pills nav-justified">
                                    <li><a onClick={() => handleRmvWL(getID)}><i className="fa fa-plus-square" />Remove from wishlist</a></li>
                                    <li><a href><i className="fa fa-plus-square" />Add to compare</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                );


            })
        }


    }


    return (
        <section>
            <div className="col-sm-9 padding-right">
                <div className="features_items">{/*features_items*/}
                    <h2 className="title text-center">Features Items</h2>
                    {renderWishlist()}
                    <ul className="pagination" style={{ width: '100%' }}>
                        <li className="active"><a href>1</a></li>
                        <li><a href>2</a></li>
                        <li><a href>3</a></li>
                        <li><a href>»</a></li>
                    </ul>
                </div>{/*features_items*/}
            </div>
        </section>
    );
}
export default WishList;
