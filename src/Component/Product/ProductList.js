import axios from "axios";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";

function ProductList(props) {
  const cart = useContext(UserContext)
  const [prod, setProd] = useState({})
  const [images, setImages] = useState({})
  useEffect(() => {
    axios.get('https://localhost/laravel8/public/api/product/list')
      .then((res) => {
        // console.log(res.data.data.data);
        res.data.data.data.map((value, index) => {
          setProd((state) => ({ ...state, [index]: value }))
          setImages((state) => ({ ...state, [index]: JSON.parse(value['image']) }))
        })
      })
      .catch(error => console.log(error))
  }, [])

  // console.log(prod);
  // console.log(images);

  function handleCart(getID, e) {
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
    cart.getQty(total)
    const x = JSON.stringify(total)
    localStorage.setItem('totalQty', x)
  }

  function renderProductList(e) {
    return Object.keys(prod).map((key, index) => {
      let imgSrc
      Object.keys(images).map((key1, index1) => {
        if (key == key1) {
          imgSrc = `http://localhost/laravel8/public/upload/product/${prod[key]['id_user']}/${images[key1][0]}`
          // console.log(imgSrc);
        }

      })

      let getID = prod[key]['id']
      let linkID = `/product/detail/${getID}`


      // console.log(prod[key]['price']);
      return (
        <div className="col-sm-4">
          <div className="product-image-wrapper">
            <div className="single-products">
              <div className="productinfo text-center">
                <img src={imgSrc} alt="" />
                <h2>${prod[key]['price']}</h2>
                <p>{prod[key]['name']}</p>
                <button href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                <br />
                <Link to={linkID} className="btn btn-default add-to-cart">Read more</Link>
              </div>
              <div className="product-overlay">
                <div className="overlay-content">
                  <h2>${prod[key]['price']}</h2>
                  <p>{prod[key]['name']}</p>
                  <button href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                  <br />
                  <Link to={linkID} className="btn btn-default add-to-cart">Read more</Link>
                </div>
              </div>
            </div>
            <div className="choose">
              <ul className="nav nav-pills nav-justified">
                <li><a href><i className="fa fa-plus-square" />Add to wishlist</a></li>
                <li><a href><i className="fa fa-plus-square" />Add to compare</a></li>
              </ul>
            </div>
          </div>
        </div>
      );
    })

  }


  return (
    <section>
      <div className="col-sm-9 padding-right">
        <div className="features_items">{/*features_items*/}
          <h2 className="title text-center">Features Items</h2>

          {renderProductList()}

          <ul className="pagination">
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
export default ProductList;