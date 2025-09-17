import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import FormError from '../Member/FormError';

function EditProduct(props) {
    const navigate = useNavigate()
    const [errors, setErrors] = useState({})
    const [getInput, setInput] = useState({})

    const [getCategory, setCategory] = useState([])
    const [getBrand, setBrand] = useState([])
    const [getFile, setFile] = useState([])

    let fileType = [
        'png', 'jpg', 'jpeg', 'PNG', 'JPG'
    ]

    const [getArray, setArray] = useState([])

    let auth

    let checkAuth = localStorage.getItem('auth')
    if (checkAuth) {
        auth = JSON.parse(checkAuth)
    }
    // console.log(auth);


    let userID = auth['id']

    let token = JSON.parse(localStorage.getItem('checkToken'))
    let productID
    let ckProduct = localStorage.getItem('idProductEdit')
    if (ckProduct) {
        productID = JSON.parse(ckProduct)
    }



    useEffect(() => {
        axios.get('https://localhost/laravel8/public/api/category-brand')
            .then(res => {
                setCategory(res.data['category'])
                setBrand(res.data['brand'])
            })
            .catch(error => console.log(error))



        axios.get(`https://localhost/laravel8/public/api/user/product/${productID}`, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        })
            .then((res) => {
                console.log(res.data.data)
                Object.keys(res.data.data).map((key, index) => {
                    setInput((state) => ({ ...state, [key]: res.data.data[key] }))
                })

            })
            .catch((error) => setErrors(error))

    }, [])

    // console.log(auth);
    const handleInput = e => {
        const nameInput = e.target.name
        const valueInput = e.target.value
        setInput((state) => ({ ...state, [nameInput]: valueInput }))
    }

    const handleFile = e => {
        if (e.target.files.length > 0) {
            const files = e.target.files
            setFile(files)
        }
    }

    function renderCategory() {
        return getCategory.map((value, key) => {
            // console.log(value.category);
            return (
                <option value={value.id} key={key}>{value.category}</option>
            );
        })

    }

    function renderBrand() {
        return getBrand.map((value, key) => {
            // console.log(value.brand);
            return (
                <option value={value.id} key={key}>{value.brand}</option>
            );
        })
    }

    function handleIfSale() {
        if (getInput.status == 0) {
            return (
                <>
                    <input type="text" name="sale" placeholder="0" value={getInput.sale} style={{ width: '100px', display: "inline-block" }} />
                    <label style={{ display: "inline-block" }}>%</label>

                </>
            );
        }
    }

    function pushArray(newValue) {
        if (getArray.includes(newValue)) {
            setArray(oldArr => oldArr.filter(item => item != newValue))
        }
        else {
            setArray((old) => [...old, newValue])
        }

    }


    function renderImgCheckbox(e) {
        let imgSrc
        if (getInput['image'] != null) {
            return getInput['image'].map((value, index) => {
                imgSrc = `http://localhost/laravel8/public/upload/product/${userID}/${value}`

                // console.log(imgSrc);
                return (
                    <label style={{ margin: '0 15px 0 0' }}>
                        <img src={imgSrc} style={{ width: '70px', height: '75px' }} />
                        <input type='checkbox'
                            name="check"
                            value={value}
                            onChange={() => pushArray(value)} />

                    </label>

                );
            })
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        let errorSubmit = {}
        let flag = true

        if (getInput.category == "") {
            errorSubmit.category = "Vui lòng chọn category"
            flag = false
        }

        if (getInput.brand == "") {
            errorSubmit.brand = "Vui lòng chọn brand"
            flag = false
        }

        if (getInput.name == "") {
            errorSubmit.name = "Vui lòng nhập tên"
            flag = false
        }

        console.log(getInput['image']);
        console.log(getArray);
        if (getFile != "") {


            if (getFile.length > 3) {
                errorSubmit.image = "Tối đa chọn được 3 ảnh"
                flag = false
            }
            else {
                // console.log(getFile)

                Object.keys(getFile).map((key, index) => {

                    let getSize = getFile[key]['size']
                    let getType = getFile[key]['type'].split("/")[1]

                    if (!fileType.includes(getType)) {
                        errorSubmit.ava = "Vui lòng chọn file có đuôi .png, .jpg, .jpeg, .PNG, hoặc .JPG"
                        flag = false
                    }
                    else {
                        if (getSize > 1024 * 1024) {
                            errorSubmit.ava = "Vui lòng chọn file có dung lượng  < 1mb"
                            flag = false
                        }
                    }
                })
            }

            if (getFile.length + (getInput['image'].length - getArray.length) > 3) {
                alert('Chỉ được chọn <= 3 file ảnh')
                flag = false
            }


        }
        else if (getArray.length == getInput['image'].length) {
            alert('Vui lòng thêm ít nhất 1 ảnh, nhiều nhất 3 ảnh')
            flag = false
        }

        if (getInput.price == "") {
            errorSubmit.image = "Vui lòng nhập price"
            flag = false
        }

        if (getInput.detail == "") {
            errorSubmit.detail = "Vui lòng nhập detail"
            flag = false
        }

        if (getInput.company_profile == "") {
            errorSubmit.company = "Vui lòng nhập company"
            flag = false
        }

        if (!flag) {
            setErrors(errorSubmit)
        }
        else {
            // let newImages = [...getInput['image'], ...getFile]
            // getInput['image'] = getFile

            let config = {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            }

            let formData = new FormData()
            formData.append('name', getInput.name)
            formData.append('price', getInput.price)
            formData.append('category', getInput.id_category)
            formData.append('brand', getInput.id_brand)
            formData.append('company', getInput.company_profile)
            formData.append('status', getInput.status)
            formData.append('sale', getInput.sale)
            formData.append('detail', getInput.detail)

            if (getFile != "") {
                Object.keys(getFile).map((item, i) => {
                    formData.append("file[]", getFile[item])
                })
            }


            getArray.map((item, i) => {
                formData.append("avatarCheckBox[]", getArray[item])
            })


            let url = 'https://localhost/laravel8/public/api/user/product/update/' + productID

            axios.post(url, formData, config)
                .then(res => {
                    console.log(res.data);
                    if (res.data.errors) {
                        setErrors(res.data.errors)
                    }
                    else {
                        alert("Cập nhật mặt hàng thành công")
                        navigate('/account/my-product')
                    }
                })
                .catch(error => console.log(error))
        }
    }




    return (
        <div className="col-sm-9">
            <div className="blog-post-area">
                <div className="signup-form">{/*sign up form*/}
                    <h2>Edit product!</h2>
                    <FormError errors={errors} />
                    <form action="#" encType="multipart/from-data" onSubmit={handleSubmit}>
                        <input type="text"
                            placeholder="Name"
                            name="name"
                            onChange={handleInput}
                            value={getInput.name}
                        />

                        <input type="text"
                            placeholder="Price"
                            name="price"
                            onChange={handleInput}
                            value={getInput.price}

                        />

                        <select name="category" onChange={handleInput} value={getInput.id_category}>
                            <option value="">Please choose category </option>
                            {renderCategory()}
                        </select>

                        <select name="brand" onChange={handleInput} value={getInput.id_brand}>
                            <option value="">Please choose  brand </option>
                            {renderBrand()}
                        </select>

                        <select name="status" value={getInput.status} onChange={handleInput}>

                            <option value="1">New</option>
                            <option value="0">Sale</option>

                        </select>
                        {handleIfSale()}


                        <input type="text"
                            placeholder="Company profile"
                            name="company_profile"
                            onChange={handleInput}
                            value={getInput.company_profile}
                        />

                        <input type="file"
                            name="image"
                            multiple
                            onChange={handleFile}
                        />

                        {/* <img src='' />
                        <img src='123.png' />
                        <img src='' />

                        <input type='checkbox'
                            style={{ display: 'inline-block', float: 'left', width: '60px' }}
                        />
                        <input type='checkbox'
                            style={{ display: 'inline-block', float: 'left', width: '60px' }}
                        />
                        <input type='checkbox'
                            style={{ display: 'inline-block', float: 'left', width: '60px' }}
                        /> */}
                        {renderImgCheckbox()}

                        <input type="text"
                            placeholder="Detail"
                            name="detail"
                            onChange={handleInput}
                            style={{ padding: '20px 20px 80px 20px' }}
                            value={getInput.detail}

                        />


                        <button type="submit" className="btn btn-default" style={{ float: 'right' }}>Edit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default EditProduct;