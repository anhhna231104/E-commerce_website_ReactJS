import { useEffect, useState } from "react";
import FormError from "../Member/FormError";
import axios from "axios";


function Comment(props) {
    let paramsID
    const paramsCk = localStorage.getItem('paramsID')
    if (paramsCk) {
        paramsID = JSON.parse(paramsCk)
    }

    const [comment, setComment] = useState("")

    const [errors, setErrors] = useState({})

    const handleInput = e => {
        const commentValue = e.target.value
        setComment(commentValue)
    }
    // console.log(props.getIDCmt);

    function handleSubmitCmt(e) {

        e.preventDefault()
        let ErrorSubmit = {}
        let flag = true

        const x = localStorage.getItem('checkLogin')
        if (x) {
            if (comment == "") {
                ErrorSubmit.comment = "Vui lòng nhập bình luận"
                flag = false
            }
            else {
                const userData = JSON.parse(localStorage.getItem('auth'))
                const userToken = JSON.parse(localStorage.getItem('checkToken'))

                console.log(userData);
                console.log(userToken);


                let config = {
                    headers: {
                        'Authorization': 'Bearer ' + userToken,
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json'
                    }
                };

               

                if (comment) {

                    let url = 'https://localhost/laravel8/public/api/blog/comment/' + paramsID
                    const formData = new FormData()
                    formData.append('id_blog', paramsID)
                    formData.append('id_user', userData.id)
                    formData.append('name_user', userData.name)
                    formData.append('id_comment', props.getIDCmt ? props.getIDCmt : 0)
                    formData.append('comment', comment)
                    formData.append('image_user', userData.avatar)

                    axios.post(url, formData, config)
                        .then(res => {
                            props.getCmt(res.data.data)
                            // console.log(res.data.data)

                        })
                        .catch(error => console.log(error))
                }
            }
        }

        else {
            alert("Vui lòng login để bình luận")
        }

        if (!flag) {
            setErrors(ErrorSubmit)
        }


    }





    return (



        <div className="replay-box">
            <div className="row">
                <div className="col-sm-12">
                    <h2>Leave a reply</h2>
                    <div className="text-area">
                        <div className="blank-arrow">
                            <label>Your Name</label>
                        </div>
                        <span>*</span>
                        <FormError errors={errors} />
                        <form onSubmit={handleSubmitCmt}>
                            <textarea name="message" rows={11} defaultValue={""} onChange={handleInput} />
                            <button type="submit" className="btn btn-primary" >post comment</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
}
export default Comment;


// - viet ham click vao rep thi lay id
// - truyen id cha nay detail
// - tu detail truyen sang cmt va set vao cho gui qua api