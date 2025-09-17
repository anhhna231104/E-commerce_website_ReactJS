import { Link, useNavigate } from "react-router-dom";
import ProductCart from "../../Product/ProductCart";
import { UserContext } from "../../../UserContext";
import { useContext } from "react";
import { useSelector } from "react-redux";

function Header() {

    //để hiển thị qty trên cart thì gọi total ra như trong file Test.js bên my-app-ver2
    // cứ zị hoy =))))

    const user = useContext(UserContext)
    const navigate = useNavigate()
    const xx = localStorage.getItem('checkLogin')

    function renderIfLogin() {

        if (xx) {
            console.log(xx);
            return (<li><a onClick={logoutFnc}><i className="fa fa-lock" /> Logout</a></li>);
        }
        else {
            return (<li><Link to="/member"><i className="fa fa-lock" /> Login</Link></li>);
        }
    }

    function updateAccount() {
        const checkAuth = localStorage.getItem('auth')
        if (checkAuth) {
            let parseAuth = JSON.parse(checkAuth)
            let userID = parseAuth['id']
            console.log(checkAuth);
            let linkUpdate = `/account/update/${userID}`
            return (<li><Link to={linkUpdate}><i className="fa fa-user" /> Account</Link></li>);
        }
        else {
            return (<li><Link to={'/account/update'}><i className="fa fa-user" /> Account</Link></li>);
        }
    }



    function logoutFnc() {
        localStorage.removeItem('checkLogin')
        localStorage.removeItem('auth')
        navigate("/member")
    }

    // const totalQty = useSelector(state=>state.cart)
    // console.log(totalQty);
    const renderTotalQty = () => {
        // return Object.keys(totalQty).map((key, index)=>{
        //     return totalQty[key]
        // })

        
    }


    return (
        <>
            <header id="header">{/*header*/}
                <div className="header_top">{/*header_top*/}
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="contactinfo">
                                    <ul className="nav nav-pills">
                                        <li><a href><i className="fa fa-phone" /> +2 95 01 88 821</a></li>
                                        <li><a href><i className="fa fa-envelope" /> info@domain.com</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="social-icons pull-right">
                                    <ul className="nav navbar-nav">
                                        <li><a href><i className="fa fa-facebook" /></a></li>
                                        <li><a href><i className="fa fa-twitter" /></a></li>
                                        <li><a href><i className="fa fa-linkedin" /></a></li>
                                        <li><a href><i className="fa fa-dribbble" /></a></li>
                                        <li><a href><i className="fa fa-google-plus" /></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>{/*/header_top*/}
                <div className="header-middle">{/*header-middle*/}
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 clearfix">
                                <div className="logo pull-left">
                                    <Link to={'/'}><img src="images/home/logo.png" alt="" /></Link>
                                </div>
                                <div className="btn-group pull-right clearfix">
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
                                            USA
                                            <span className="caret" />
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><a href>Canada</a></li>
                                            <li><a href>UK</a></li>
                                        </ul>
                                    </div>
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
                                            DOLLAR
                                            <span className="caret" />
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><a href>Canadian Dollar</a></li>
                                            <li><a href>Pound</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8 clearfix">
                                <div className="shop-menu clearfix pull-right">
                                    <ul className="nav navbar-nav">
                                        {/* <li><Link to={linkUpdate}><i className="fa fa-user" /> Account</Link></li> */}
                                        {updateAccount()}
                                        <li><Link to={'/product/wishlist'}><i className="fa fa-star" /> Wishlist</Link></li>
                                        <li><a href="checkout.html"><i className="fa fa-crosshairs" /> Checkout</a></li>
                                        {/* <li><Link to={'/cart'}><i className="fa fa-shopping-cart" /> {renderTotalQty()}</Link></li> */}
                                        <li><Link to={'/cart'}><i className="fa fa-shopping-cart" /> {user.totalQty}</Link></li>
                                        {/* <li><a href="login.html"><i className="fa fa-lock" /> Login</a></li> */}
                                        {renderIfLogin()}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>{/*/header-middle*/}
                <div className="header-bottom">{/*header-bottom*/}
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-9">
                                <div className="navbar-header">
                                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                                        <span className="sr-only">Toggle navigation</span>
                                        <span className="icon-bar" />
                                        <span className="icon-bar" />
                                        <span className="icon-bar" />
                                    </button>
                                </div>
                                <div className="mainmenu pull-left">
                                    <ul className="nav navbar-nav collapse navbar-collapse">
                                        <li><Link to={'/'}>Home</Link></li>
                                        <li className="dropdown"><a href="#">Shop<i className="fa fa-angle-down" /></a>
                                            <ul role="menu" className="sub-menu">
                                                <li><Link to={'/product/list'}>Products</Link></li>
                                                <li><a href="product-details.html">Product Details</a></li>
                                                <li><a href="checkout.html">Checkout</a></li>
                                                <li><Link to={'/cart'}>Cart</Link></li>
                                                <li><a href="login.html">Login</a></li>
                                            </ul>
                                        </li>
                                        <li className="dropdown"><a href="#" className="active">Blog<i className="fa fa-angle-down" /></a>
                                            <ul role="menu" className="sub-menu">
                                                <li><Link to={'/blog/list'} className="active">Blog List</Link></li>
                                                <li><a href="blog-single.html">Blog Single</a></li>
                                            </ul>
                                        </li>
                                        <li><a href="404.html">404</a></li>
                                        <li><a href="contact-us.html">Contact</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="search_box pull-right">
                                    <input type="text" placeholder="Search" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>{/*/header-bottom*/}
            </header>{/*/header*/}
        </>
    );
}
export default Header;