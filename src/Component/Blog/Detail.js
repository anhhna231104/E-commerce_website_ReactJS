import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Comment from './Comment'
import ListComment from "./ListComment";
import Rate from "./Rate";

function Detail(props) {
    let params = useParams()
    const [getItem, setItem] = useState('')
    const [comment, setComment] = useState([])
    const [getIDReply, setIDReply] = useState('')

    function getCmt(data) {
        const newCmt = comment.concat(data);
        setComment(newCmt);
        // console.log(comment);
    }

    function getIdRep(idRep) {

        // console.log(idRep);
        setIDReply(idRep)

    }
    // console.log(props.getIDCmt);

    // let getIDCmt = props.getIDCmt 

    useEffect(() => {
        axios.get("https://localhost/laravel8/public/api/blog/detail/" + params.id)
            .then(res => {
                setItem(res.data.data)
                setComment(res.data.data.comment)
                // console.log(res.data.data.comment);

            })
            .catch(err => console.log(err))
    }, [])

    function renderData() {
        if (Object.keys(getItem).length > 0) {
            let imgName = getItem['image']
            let imgSrc = `http://localhost/laravel8/public/upload/Blog/image/${imgName}`
            let paramsID = JSON.stringify(params.id)
            localStorage.setItem('paramsID', paramsID)

            return (
                <div className="single-blog-post">
                    <h3>Girls Pink T Shirt arrived in store</h3>
                    <div className="post-meta">
                        <ul>
                            <li><i className="fa fa-user" /> Mac Doe</li>
                            <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                            <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                        </ul>
                        {/* <span>
                                      <i class="fa fa-star"></i>
                                      <i class="fa fa-star"></i>
                                      <i class="fa fa-star"></i>
                                      <i class="fa fa-star"></i>
                                      <i class="fa fa-star-half-o"></i>
                                  </span> */}
                    </div>
                    <a href>
                        <img src={imgSrc} alt="" />
                    </a>
                    {getItem['content']}
                    <div className="pager-area">
                        <ul className="pager pull-right">
                            <li><a href="#">Pre</a></li>
                            <li><a href="#">Next</a></li>
                        </ul>
                    </div>
                </div>

            );

        }

    }


    return (

        <div className="col-sm-9">
            <div className="blog-post-area">
                <h2 className="title text-center">Latest From our Blog</h2>
                {renderData()}
            </div>
            <Rate/>
            <ListComment comment={comment} getIdRep={getIdRep} />
            <Comment getCmt={getCmt} getIDCmt={getIDReply} />
        </div>
    );
}
export default Detail;