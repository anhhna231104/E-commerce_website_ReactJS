import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import EditProduct from "./EditProduct";

function MyProduct() {

    const token = JSON.parse(localStorage.getItem('checkToken'))
    const auth = JSON.parse(localStorage.getItem('auth'))

    const [getItem, setItem] = useState({})
    const [getImages, setImages] = useState({})

    const navigate = useNavigate()
    useEffect(() => {
        axios.get('https://localhost/laravel8/public/api/user/my-product', {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        })
            .then(res => {
                console.log(res.data);
                Object.keys(res.data.data).map((key, index) => {
                    setItem((state) => ({ ...state, [key]: res.data.data[key] }))
                    setImages((state) => ({ ...state, [key]: JSON.parse(res.data.data[key]['image']) }))
                })
            })
            .catch(error => console.log(error))
    }, [])

    function naviToAddProd() {
        navigate('/account/add-product/')
    }

    function editProd(e) {
        let prID
        prID = e.target.closest("tr").querySelector(".id").textContent

        const prodID = JSON.stringify(prID)
        localStorage.setItem('idProductEdit', prodID)

        // console.log(prodID);
        navigate("/account/edit-product/"+ prID)
    }

    const rmvProduct = e => {
        let prID
        prID = e.target.closest("tr").querySelector(".id").textContent
        console.log(prID);

        axios.get(`https://localhost/laravel8/public/api/user/product/delete/${prID}`, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        })
            .then((res) => {
                setItem(res.data.data)
            })
            .catch((error) => console.log(error))

    }

    console.log(getItem);

    function addItemToTable() {
        // console.log(getItem);
        console.log(getImages);


        return Object.keys(getItem).map((key, index) => {
            let ImgSrc = `http://localhost/laravel8/public/upload/product/${auth['id']}/`
            Object.keys(getImages).map((keyImg, indexImg) => {
                if (key == keyImg) {
                    ImgSrc += getImages[keyImg][0]
                }
            })




            return (
                <tr key={key}>
                    <td className="id" style={{ color: "#5396CF" }}>{getItem[key]['id']}</td>
                    <td className="name" style={{ color: "#5396CF" }}>{getItem[key]['name']}</td>
                    <td className="image"><img src={ImgSrc} style={{ width: "75px" }} /></td>
                    <td className="price">{getItem[key]['price']}đ</td>
                    <td className="action" style={{ color: "#5396CF" }}><i class='fa fa-edit' style={{ margin: "0 20px 0 0" }} onClick={editProd}></i> <i class="fa fa-times" onClick={rmvProduct}></i></td>
                </tr>
            );

        })




    }


    return (

        <section>
            <div className="container">
                <div className="row">
                    <div className="col-sm-9">
                        <div className="table-responsive cart_info">
                            <table className="table table-condensed" style={{ border: "1px solid #BFBFBF" }}>
                                <thead style={{ background: "#FE980F", color: "#fff" }}>
                                    <tr className="cart_menu">
                                        <td className="image">Id</td>
                                        <td className="name">Name</td>
                                        <td className="image">Image</td>
                                        <td className="price">Price</td>
                                        <td className="action">Action</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {addItemToTable()}
                                </tbody>
                            </table>
                            <button className="btn btn-default" onClick={naviToAddProd} style={{ background: "#FE980F", color: "#fff", float: "right", margin: "0 0 20px 0" }}>Add new</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );

}
export default MyProduct;