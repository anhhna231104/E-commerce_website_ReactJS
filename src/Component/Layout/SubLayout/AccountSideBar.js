import { Link } from "react-router-dom";

function AccountSideBar() {

  function handleAccountID(e) {
    let auth = JSON.parse(localStorage.getItem('auth'))
    let userID = auth['id']
    console.log(userID);
    return (
      <Link to={'/account/update/' + userID}>account</Link>
    );
  }

  return (

    <div className="col-sm-3">
      <div className="left-sidebar">
        <h2>Account</h2>
        <div className="panel-group category-products" id="accordian">{/*category-productsr*/}
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">{handleAccountID()}</h4>
            </div>
          </div>
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title"><Link to={'/account/my-product'}>My product</Link></h4>
            </div>
          </div>
        </div>{/*/category-products*/}
      </div>
    </div>
  );
}
export default AccountSideBar;