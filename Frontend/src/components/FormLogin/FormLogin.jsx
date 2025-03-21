import ich_logo from "../../assets/ICHGRA_max.svg";
import { Link } from "react-router-dom";
import styles from "./FormLogin.module.css";
import { useState } from "react";
import { loginUser } from "../../constants/api";
import { useNavigate } from "react-router-dom";

function FormLogin(props) {
  const [loginInput, setLoginInput] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (event) => {
    setLoginInput(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isEmail = loginInput.includes("@");
    const loginData = isEmail
      ? { email: loginInput, password }
      : { username: loginInput, password };
    try {
      const response = await loginUser(loginData);

      localStorage.setItem("token", response.token);
      localStorage.setItem("userId", response.userId);

      setMessage("Login successfully!");
      setTimeout(() => {
        navigate("/main");
      }, 1000);
    } catch (error) {
      setMessage(
        error.response?.data?.message || error.message || "Login failed"
      );
    }
  };
  return (
    <form className={styles.wrapper} onSubmit={handleSubmit}>
      <div className={styles.form_container}>
        <div className={styles.container_logo}>
          <img src={ich_logo} alt="logo_ichgram" />
        </div>
        <div className={styles.input_field}>
          <input
            type="text"
            name="username"
            value={loginInput}
            placeholder="Username, or email"
            onChange={handleChange}
          />
          {message && <p className={styles.error}>{message}</p>}
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <button>Sign up</button>
        <div className={styles.or}>
          <span className={styles.lineLeft}></span>
          <p>OR</p>
          <span className={styles.lineRigth}></span>
        </div>
        <Link to="/reset" className={styles.forgot}>
          <p>Forgot password?</p>
        </Link>
      </div>
      <div className={styles.account_container}>
        <p>
          Don't have an account?{" "}
          <Link to="/register" className={styles.link}>
            Sign up
          </Link>
        </p>
      </div>
    </form>
  );
}

export default FormLogin;
