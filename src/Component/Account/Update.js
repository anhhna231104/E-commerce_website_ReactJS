import { useEffect, useState } from "react";
import axios from 'axios';
import FormError from "../Member/FormError";
import { useNavigate } from "react-router-dom";
function Update() {
    const [errors, setErrors] = useState({})
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        avatar: "",
        level: 0
    })
    let check
    const [auth, setAuth] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        check = localStorage.getItem("checkLogin")
        if (check) {

            let authData = JSON.parse(localStorage.getItem('auth'))
            setAuth(authData)
            setUser({
                name: authData['name'],
                email: authData['email'],
                password: authData['password'],
                phone: authData['phone'],
                address: authData['address'],
                avatar: authData['avatar'],
                level: authData['level']
            })
        }
        else {
            alert("Vui lòng đăng nhập")
            navigate("/member")
        }

    }, [])


    let fileType = [
        'png', 'jpg', 'jpeg', 'PNG', 'JPG'
    ]

    const [getFile, setFile] = useState("")
    const [getAvatar, setAvatar] = useState('')

    const handleInput = e => {
        const nameInput = e.target.name
        const value = e.target.value

        setUser(state => ({ ...state, [nameInput]: value }))
        setAuth(state =>({...state, [nameInput]: value}))
    }

    function handleFile(e) {
        if (e.target.files.length > 0) {
            const file = e.target.files

            let reader = new FileReader()
            reader.onload = (e) => {
                setAvatar(e.target.result)
                setFile(file)
            }
            reader.readAsDataURL(file[0])
        }
    }

    function handlesubmit(e) {
        e.preventDefault();
        let errorSubmit = {}
        let flag = true

        if (user.name == "") {
            errorSubmit.name = "Vui lòng nhập username"
            flag = false
        }

        if (user.email == "") {
            errorSubmit.email = "Vui lòng nhập email"
            flag = false
        }

        if (user.password == "") {
            errorSubmit.password = "Vui lòng nhập password"
            flag = false
        }

        if (user.phone == "") {
            errorSubmit.phone = "Vui lòng nhập số điện thoại"
            flag = false
        }

        if (user.address == "") {
            errorSubmit.address = "Vui lòng nhập địa chỉ của bạn"
            flag = false
        }

        if (getFile != "") {
            console.log(getFile)

            let getSize = getFile[0]['size']
            let getType = getFile[0]['type'].split("/")[1]

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
        }

        if (!flag) {
            setErrors(errorSubmit)
        }
        else {
            user['avatar'] = getAvatar;
            const userToken = JSON.parse(localStorage.getItem('checkToken'))

            console.log(userToken);
            console.log(auth);
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + userToken,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            };


            let userID = auth['id']

            console.log(userID);
            let url = 'http://localhost/laravel8/public/api/user/update/' + userID
            const formData = new FormData()
            formData.append('name', user.name)
            formData.append('email', user.email)
            formData.append('password', user.password)
            formData.append('phone', user.phone)
            formData.append('address', user.address)
            formData.append('avatar', user.avatar)
            formData.append('level', user.level)

            axios.post(url, formData, config)
                .then(res => {
                    if (res.data.errors) {
                        console.log(res)
                        setErrors(res.data.errors);
                    }
                    else {
                        console.log(auth);
                        const sendAuth = JSON.stringify(auth)
                        localStorage.setItem('auth', sendAuth)
                        console.log(sendAuth);

                        const sendToken = JSON.stringify(userToken)
                        localStorage.setItem('checkToken', sendToken)
                        console.log(sendToken);
                        alert("Cập nhật thông tin thành công")
                    }
                })
                .catch(error => {
                    console.log(error)
                    alert("Cập nhật thất bại")
                })


        }
    }

    return (

        <div className="col-sm-9">
            <div className="blog-post-area">
                <h2 className="title text-center">Update user</h2>
                <div className="signup-form">{/*sign up form*/}
                    <h2>New User Signup!</h2>
                    <FormError errors={errors} />
                    <form action="#" onSubmit={handlesubmit} encType="multipart/from-data">
                        <input type="text"
                            placeholder="Name"
                            name="name"
                            onChange={handleInput}
                            value={user.name} />

                        <input type="email"
                            placeholder="Email Address"
                            name="email"
                            readOnly
                            value={user.email} />

                        <input type="password"
                            placeholder="Password"
                            name="password"
                            onChange={handleInput}
                            value={user.password} />

                        <input type="tel"
                            placeholder="Phone"
                            name="phone"
                            onChange={handleInput}
                            value={user.phone} />

                        <input type="text"
                            placeholder="Address"
                            name="address"
                            onChange={handleInput}
                            value={user.address} />

                        <input type="file"
                            name="ava"
                            onChange={handleFile} />
                        <input type="text"
                            placeholder="Level"
                            name="level"
                            value={user.level} />

                        <button type="submit" className="btn btn-default">User update</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default Update;