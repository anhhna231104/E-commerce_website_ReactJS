import { useState } from "react";
import FormError from "./FormError";
import axios from 'axios';

function Register(props) {
    const [errors, setErrors] = useState({})
    const [getInput, setInput] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        level: 0,
        avatar: ""

    })

    let fileType = [
        'png', 'jpg', 'jpeg', 'PNG', 'JPG'
    ]

    const [getFile, setFile] = useState("")
    const [getAvatar, setAvatar] = useState('')

    const handleInput = e => {
        const nameInput = e.target.name
        const value = e.target.value
        setInput(state => ({ ...state, [nameInput]: value }))
    }

    const handleFile = e => {
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

    function handleSubmitRegister(e) {
        e.preventDefault()
        let errorSubmit = {}
        let flag = true

        if (getInput.name == "") {
            errorSubmit.name = "Vui lòng nhập username"
            flag = false
        }

        if (getInput.email == "") {
            errorSubmit.email = "Vui lòng nhập email"
            flag = false
        }

        if (getInput.password == "") {
            errorSubmit.password = "Vui lòng nhập password"
            flag = false
        }

        if (getInput.phone == "") {
            errorSubmit.phone = "Vui lòng nhập số điện thoại"
            flag = false
        }

        if (getInput.address == "") {
            errorSubmit.address = "Vui lòng nhập địa chỉ của bạn"
            flag = false
        }

        if (getFile == "") {

            errorSubmit.ava = "Vui lòng chọn ảnh đại diện"
            flag = false
        }
        else {
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
            alert("Chúc mừng bạn đã nhập hết thông tin")
            getInput['avatar'] = getAvatar;



            axios.post("http://localhost/laravel8/public/api/register", getInput)
                .then((res) => {

                    if (res.data.errors) {
                        setErrors(res.data.errors)
                    } else {
                        alert("Đăng ký thành công")
                        console.log(res);
                    }
                })
        }


    }






    return (
        <>
            <FormError errors={errors} />
            <div className="col-sm-4">
                <div className="signup-form">{/*sign up form*/}
                    <h2>New User Signup!</h2>
                    <form action="#" onSubmit={handleSubmitRegister} encType="multipart/from-data">
                        <input type="text"
                            placeholder="Name"
                            name="name"
                            onChange={handleInput} />

                        <input type="email"
                            placeholder="Email Address"
                            name="email"
                            onChange={handleInput} />

                        <input type="password"
                            placeholder="Password"
                            name="password"
                            onChange={handleInput} />

                        <input type="tel"
                            placeholder="Phone"
                            name="phone"
                            onChange={handleInput} />

                        <input type="text"
                            placeholder="Address"
                            name="address"
                            onChange={handleInput} />

                        <input type="file"
                            name="ava"
                            onChange={handleFile} />
                        <input type="text"
                            placeholder="Level"
                            name="level" />
                        <button type="submit" className="btn btn-default">Signup</button>
                    </form>
                </div>{/*/sign up form*/}
            </div>
        </>
    );
}

export default Register;