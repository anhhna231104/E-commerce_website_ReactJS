import axios from "axios";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { UserContext } from "../../UserContext";

function ProductCart(props) {
    const [product, setProduct] = useState([])
    const user = useContext(UserContext)


    useEffect(() => {
        if (localStorage.getItem('cartItem')) {

            let xx = JSON.parse(localStorage.getItem('cartItem'));

            axios.post('https://localhost/laravel8/public/api/product/cart', xx)
                .then(res => {
                    console.log(res.data.data);
                    setProduct(res.data.data)
                })
                .catch(error => console.log(error))
        }


    }, [])


    const handleUp = (value, e) => {
        let idProd = value['id'];

        let newProduct = [...product]
        newProduct.map((item, key) => {
            if (item['id'] === idProd) {
                newProduct[key]['qty'] = parseInt(newProduct[key]['qty']) + 1;
            }

        });
        setProduct(newProduct);

        if (localStorage.getItem('cartItem')) {

            let xx = JSON.parse(localStorage.getItem('cartItem'));
            Object.keys(xx).map((key, index) => {
                if (key == idProd) {
                    xx[key] = parseInt(xx[key]) + 1
                }
            })

            let x = JSON.stringify(xx)
            localStorage.setItem('cartItem', x)

        }
        if (localStorage.getItem('totalQty')) {
            localStorage.setItem('totalQty', JSON.parse(localStorage.getItem('totalQty')) + 1)
            user.getQty(JSON.parse(localStorage.getItem('totalQty')))
        }


    }

    const handleDown = (value, e) => {
        let idProd = value['id'];
        let newQty
        let newProduct = [...product]
        newProduct.map((item, key) => {
            if (item['id'] == idProd) {
                newProduct[key]['qty'] = parseInt(newProduct[key]['qty']) - 1;
                newQty = newProduct[key]['qty']
            }

        });

        if (newQty > 0) {
            setProduct(newProduct);

            if (localStorage.getItem('cartItem')) {

                let xx = JSON.parse(localStorage.getItem('cartItem'));
                Object.keys(xx).map((key, index) => {
                    if (key == idProd) {
                        xx[key] = parseInt(xx[key]) - 1
                    }
                })

                let x = JSON.stringify(xx)
                localStorage.setItem('cartItem', x)
            }
            if (localStorage.getItem('totalQty')) {
                localStorage.setItem('totalQty', JSON.parse(localStorage.getItem('totalQty')) - 1)
                user.getQty(JSON.parse(localStorage.getItem('totalQty')))
            }
        }
        else {
            handleRmv(value, e)
        }

    }

    const handleRmv = (value, e) => {
        let idProd = value['id']
        let updatedProduct = product.filter(item => item['id'] != idProd)
        setProduct(updatedProduct)

        if (localStorage.getItem('cartItem')) {
            let xx = JSON.parse(localStorage.getItem('cartItem'));
            Object.keys(xx).map((key, index) => {
                if (key == idProd) {
                    delete xx[idProd]
                }
            })

            console.log(xx);
            let x = JSON.stringify(xx)
            localStorage.setItem('cartItem', x)
        }
        if (localStorage.getItem('totalQty')) {
            localStorage.setItem('totalQty', 0)
            user.getQty(JSON.parse(localStorage.getItem('totalQty')))
        }



    }


    function renderCart(e) {
        if (product.length > 0) {
            return product.map((value, index) => {
                // let idProd = value['id']
                let imgName = JSON.parse(value['image'])[0]
                let imgSrc = `http://localhost/laravel8/public/upload/product/${JSON.parse(value['id_user'])}/${imgName}`
                return (
                    <tr key={index}>
                        <td className="cart_product">
                            <a href><img src={imgSrc} alt="" style={{ width: '75px', height: '85px' }} /></a>
                        </td>
                        <td className="cart_description">
                            <h4><a href>{value['name']}</a></h4>
                            <p>Web ID: 1089772</p>
                        </td>
                        <td className="cart_price">
                            <p>${value['price']}</p>
                        </td>
                        <td className="cart_quantity">
                            <div className="cart_quantity_button">
                                <a className="cart_quantity_up" onClick={(e) => handleUp(value, e)}> + </a>
                                <input className="cart_quantity_input" type="text" name="quantity" value={value['qty']} autoComplete="off" size={2} />
                                <a className="cart_quantity_down" onClick={(e) => handleDown(value, e)}> - </a>
                            </div>
                        </td>
                        <td className="cart_total">
                            <p className="cart_total_price">${parseInt(value['qty']) * parseInt(value['price'])}</p>
                        </td>
                        <td className="cart_delete">
                            <a className="cart_quantity_delete" onClick={(e) => { handleRmv(value, e) }}><i className="fa fa-times" /></a>
                        </td>
                    </tr>
                );
            })

        }

    }

    function renderCartTotal(e) {
        let total = 0
        product.map((value, index) => {
            total += parseInt(value['price']) * parseInt(value['qty'])
        })

        return (
            <ul>
                <li>Cart Sub Total <span>${total}</span></li>
                <li>Eco Tax <span>$2</span></li>
                <li>Shipping Cost <span>Free</span></li>
                <li>Total <span>${total + 2}</span></li>
            </ul>
        );
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
                                {renderCartTotal()}
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
export default ProductCart;