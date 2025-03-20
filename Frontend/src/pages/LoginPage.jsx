import smart from "../../src/assets/smartphone.png";
import FormLogin from "../components/FormLogin/FormLogin";
import "../App.css";

function Login(props) {
  return (
    <div className="login_container">
      <div>
        <img
          src={smart}
          alt="Photo_smatphone"
          className="login_container_img"
        />
      </div>
      <div>
        <FormLogin />
      </div>
    </div>
  );
}

export default Login;
