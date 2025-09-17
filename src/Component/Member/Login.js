import { useState } from 'react';
import { json, useNavigate } from 'react-router-dom'
import FormError from './FormError';
import axios from 'axios';

function Login(props) {
    const navigate = useNavigate()
    const [getItems, setItems] = useState({
        email: "",
        password: "",
        level: 0
    })
    const [errors, setErrors] = useState({})

    const handleInput = e => {
        const nameInput = e.target.name
        const valueInput = e.target.value
        setItems((state) => ({ ...state, [nameInput]: valueInput }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        let errorSubmit = {}
        let flag = true

        if (getItems.password == "") {
            errorSubmit.password = "Vui lòng nhập password"
            flag = false
        }

        if (getItems.email == "") {
            errorSubmit.email = "Vui lòng nhập email"
            flag = false
        }

        if (!flag) {
            setErrors(errorSubmit)
        }
        else {
            axios.post("http://localhost/laravel8/public/api/login", getItems)
                .then((res) => {
                    if (res.data.errors) {
                        console.log(res);
                        setErrors(res.data.errors)
                    }
                    else {
                        let check = 'true'
                        const token = res.data.token
                        console.log(token);
                        const auth = res.data.Auth
                        console.log(auth);

                        if (check) {
                            alert("Đăng nhập thành công")
                            // console.log(res);
                            // console.log(check);
                            const x = JSON.stringify(check)
                            localStorage.setItem('checkLogin', x)
                            
                            const xx = JSON.stringify(token)
                            localStorage.setItem('checkToken', xx)

                            const xxx= JSON.stringify(auth)
                            localStorage.setItem('auth', xxx)
                            navigate("/")

                        }
                        else {
                            alert("Đăng nhập thất bại")
                        }


                    }
                })
                .catch(function (errors) {
                    console.log(errors);
                })
        }
    }





    return (
        <>

            <div className="col-sm-4 col-sm-offset-1">
                <FormError errors={errors} />
                <div className="login-form">{/*login form*/}
                    <h2>Login to your account</h2>
                    <form action="#" onSubmit={handleSubmit}>
                        <input type="email"
                            placeholder="Email Address"
                            name='email'
                            onChange={handleInput} />

                        <input type="password"
                            placeholder="Password"
                            name='password'
                            onChange={handleInput} />

                        <input type="text"
                            placeholder="Level"
                            name="level" />

                        <span>
                            <input type="checkbox" className="checkbox" />
                            Keep me signed in
                        </span>
                        <button type="submit" className="btn btn-default">Login</button>
                    </form>
                </div>{/*/login form*/}
            </div>

            <div className="col-sm-1">
                <h2 className="or">OR</h2>
            </div>
        </>
    );
}
export default Login;