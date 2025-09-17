import Login from "./Login";
import Register from "./Register";

function MemberIndex(props) {
    return (
        <section id="form" >{/*form*/}
            <div className="container">
                <div className="row">
                    <Login/>
                    <Register/>
                </div>
            </div>
        </section>
    );
}
export default MemberIndex;