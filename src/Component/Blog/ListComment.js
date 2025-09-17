
import Detail from "./Detail";

function ListComment(props) {

    function handleReply(e) {
        let getIDCmt = e.target.id
        props.getIdRep(getIDCmt)
        // let seriIdCmt = JSON.parse(getIDCmt)
        // localStorage.setItem('idCmtCha', seriIdCmt)
       

    }


    function fetchData(e) {
        let comment = props.comment;
        console.log(comment);

        // let getAuth = JSON.parse(localStorage.getItem('auth'))
        // let userAva = getAuth.avatar
        // console.log(getAuth);
        // let ImgSrc = `http://localhost/laravel8/public/upload/user/avatar/${userAva}`
        // console.log(ImgSrc);

        // let getIdCmt = props.getIdCmt

       



        if (comment.length > 0) {
            return (comment.map((value, key) => {
                if (value.id_comment == 0) {
                   let ImgSrc = `http://localhost/laravel8/public/upload/user/avatar/${value.image_user}`
                //    console.log(ImgSrc);
                    return (
                        <div>
                            <li className="media">
                                <a className="pull-left" href="#">
                                    <img width="50px" className="media-object" src={ImgSrc}alt="" />
                                </a>
                                <div className="media-body">
                                    <ul className="sinlge-post-meta">
                                        <li><i className="fa fa-user" />{value.name_user}</li>
                                        <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                                        <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                                    </ul>
                                    <p>{value.comment}</p>
                                    <button id={value.id} className="btn btn-primary" type="submit" onClick={handleReply}><i className="fa fa-reply" />Reply</button>
                                    <br />
                                </div>
                            </li>
                            {
                                comment.map((value2, key2) => {
                                    let ImgSrc2 = `http://localhost/laravel8/public/upload/user/avatar/${value2.image_user}`
                                    if (value2.id_comment == value.id) {
                                        return (
                                            <li className="media second-media">
                                                <a className="pull-left" href="#">
                                                    <img width="50px" className="media-object" src={ImgSrc2} alt="" />
                                                </a>
                                                <div className="media-body">
                                                    <ul className="sinlge-post-meta">
                                                        <li><i className="fa fa-user" />{value2.name_user}</li>
                                                        <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                                                        <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                                                    </ul>
                                                    <p>{value2.comment}</p>
                                                
                                                </div>
                                            </li>
                                        )
                                    }
                                })
                            }
                        </div>
                    );
                }


                



               
            })
            )
        }

    }

    return (
        <div className="response-area">
            <h2>3 RESPONSES</h2>
            <ul className="media-list">
                {fetchData()}

            </ul>
        </div>

    );

}
export default ListComment;