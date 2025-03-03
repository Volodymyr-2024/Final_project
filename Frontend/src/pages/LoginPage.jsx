import smart from "../../src/assets/smartphone.png";
import FormLogin from "../components/FormLogIn/FormLogin";

function Login(props) {
  return (
    <div style={{ display: "flex", paddingTop: 86, justifyContent: "center" }}>
      <div>
        <img
          src={smart}
          alt="Photo_smatphone"
          style={{
            width: 380,
            height: 581,
            border: "none",
            display: "block",
            marginRight: 32,
          }}
        />
      </div>
      <div>
        <FormLogin />
      </div>
    </div>
  );
}

export default Login;
