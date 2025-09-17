import { useEffect, useState } from "react";
import StarRatings from 'react-star-ratings';
import FormError from "../Member/FormError";
import axios from "axios";

function Rate(props) {
    let paramsID
    const paramsCk = localStorage.getItem('paramsID')
    if (paramsCk) {
        paramsID = JSON.parse(paramsCk)
    }
    const [getRating, setRating] = useState(0)
    const [errors, setErrors] = useState({})
    let url = 'https://localhost/laravel8/public/api/blog/rate/' + paramsID

    useEffect(() => {
        axios.get(url)
            .then(res => {
                let length = 0;
                console.log(res.data.data);
                length = Object.keys(res.data.data).length;
                // tbc = 66
                // setRating(tbc)
                let tongRate = 0
                let avgRate
                if (length == 0) {
                    avgRate = 0
                }

                else {
                    Object.keys(res.data.data).map((key, index) => {

                        tongRate += parseFloat(res.data.data[key]['rate'])

                        // console.log(res.data.data[key]['rate']);

                    })
                    avgRate = parseFloat(tongRate / length);
                }

                setRating(avgRate)


            })
            .catch(error => console.log(error))
    }, [])

    function changeRating(newRating, name) {
        let ckLogin = localStorage.getItem('checkLogin')
        let ErrorSubmit = {}
        if (ckLogin) {

            setRating(newRating)
            const userData = JSON.parse(localStorage.getItem('auth'))
            const userToken = JSON.parse(localStorage.getItem('checkToken'))

            let config = {
                headers: {
                    'Authorization': 'Bearer ' + userToken,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            }



            const formData = new FormData()
            formData.append('user_id', userData.id)
            formData.append('blog_id', paramsID)
            formData.append('rate', newRating)

            axios.post(url, formData, config)
                .then(res => {
                    // console.log(res);
                    alert(res.data.message)
                })
                .catch(error => console.log(error))


        }
        else {
            ErrorSubmit.rate = "Vui lòng đăng nhập để đánh giá"
            setErrors(ErrorSubmit)
        }



    }

    return (
        <>
            <FormError errors={errors} />
            <StarRatings
                rating={getRating}
                starRatedColor="orange"
                changeRating={changeRating}
                numberOfStars={5}
                name="rating"
            />
        </>
    );
}
export default Rate;