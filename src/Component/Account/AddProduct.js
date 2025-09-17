import { useEffect, useState } from "react";
import FormError from "../Member/FormError";
import axios from "axios";

function AddProduct() {

    let token = JSON.parse(localStorage.getItem('checkToken'))

    const [errors, setErrors] = useState({})
    const [getInput, setInput] = useState({
        category: "",
        brand: "",
        name: "",
        image: "",
        price: "",
        status: 1,
        sale: 0,
        detail: "",
        company: ""
    })

    const [getCategory, setCategory] = useState([])
    const [getBrand, setBrand] = useState([])
    const [getFile, setFile] = useState([])

    let fileType = [
        'png', 'jpg', 'jpeg', 'PNG', 'JPG'
    ]

    // const [getImages, setImages] = useState("")


    useEffect(() => {
        axios.get('https://localhost/laravel8/public/api/category-brand')
            .then(res => {
                setCategory(res.data['category'])
                setBrand(res.data['brand'])
            })
            .catch(error => console.log(error))
    }, [])

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
                    <input type="text" name="sale" placeholder="0" style={{ width: '100px', display: "inline-block" }} />
                    <label style={{ display: "inline-block" }}>%</label>

                </>
            );
        }
    }

    console.log(getFile);



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

        if (getFile == "") {
            errorSubmit.image = "Vui lòng chọn ảnh đăng lên"
            flag = false
        }
        else {
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
        }

        if (getInput.price == "") {
            errorSubmit.image = "Vui lòng nhập price"
            flag = false
        }

        if (getInput.detail == "") {
            errorSubmit.detail = "Vui lòng nhập detail"
            flag = false
        }

        if (getInput.company == "") {
            errorSubmit.company = "Vui lòng nhập company"
            flag = false
        }



        if (!flag) {
            setErrors(errorSubmit)
        }
        else {
            alert("Chúc mừng bạn đã nhập hết thông tin")
            getInput['image'] = getFile

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
            formData.append('category', getInput.category)
            formData.append('brand', getInput.brand)
            formData.append('company', getInput.company)
            formData.append('status', getInput.status)
            formData.append('sale', getInput.sale)
            formData.append('detail', getInput.detail)

            Object.keys(getInput.image).map((item, i) => {
                formData.append("file[]", getInput.image[item])
            })

            console.log(getInput.image);

            let url = 'https://localhost/laravel8/public/api/user/product/add'

            axios.post(url, formData, config)
                .then(res => {
                    console.log(res.data);
                    if (res.data.errors) {
                        setErrors(res.data.errors)
                    }
                    else {
                        alert("Thêm mặt hàng thành công")
                    }
                })



        }
    }

    return (
        <div className="col-sm-9">
            <div className="blog-post-area">
                <div className="signup-form">{/*sign up form*/}
                    <h2>Create product!</h2>
                    <FormError errors={errors} />
                    <form action="#" encType="multipart/from-data" onSubmit={handleSubmit}>
                        <input type="text"
                            placeholder="Name"
                            name="name"
                            onChange={handleInput}
                        />

                        <input type="text"
                            placeholder="Price"
                            name="price"
                            onChange={handleInput}

                        />

                        <select name="category" onChange={handleInput}>
                            <option value="">Please choose category </option>
                            {renderCategory()}
                        </select>

                        <select name="brand" onChange={handleInput}>
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
                            name="company"
                            onChange={handleInput}
                        />

                        <input type="file"
                            name="image"
                            multiple
                            onChange={handleFile}
                        />

                        <input type="text"
                            placeholder="Detail"
                            name="detail"
                            onChange={handleInput}

                        />


                        <button type="submit" className="btn btn-default">Signup</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default AddProduct;