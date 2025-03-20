import { useState } from "react";
import ich_logo from "../../assets/ICHGRA_max.svg";
import styles from "./Form.module.css";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../constants/api";

function Form() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    fullname: "",
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await registerUser(formData);
      setMessage("Registration successfully!");
      setInterval(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      if (error.message === "User already exist") {
        setMessage("This username is already taken.");
      } else {
        setMessage(`Ошибка: ${error.message}`);
      }
    }
  };

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit}>
      <div className={styles.form_container}>
        <div className={styles.container_logo}>
          <img src={ich_logo} alt="logo_ichgram" />
        </div>
        <p>Sign up to see photos and videos from your friends.</p>
        <div className={styles.input_field}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            placeholder="Full name"
          />
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
          />
          {message && <p className={styles.error}>{message}</p>}
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />
        </div>
        <span>
          People who use our service may have uploaded your contact information
          to Instagram. <a href="https://www.instagram.com/">Learn More</a>
        </span>
        <span>
          By signing up, you agree to our <a href="">Terms</a>,{" "}
          <a href="">Privacy Policy</a>, and <a href="/">Cookies Policy</a>
        </span>
        <button type="submit">Sign up</button>
      </div>
      <div className={styles.account_container}>
        <p>
          Have an account?{" "}
          <Link to="/login" className={styles.link}>
            Log in
          </Link>
        </p>
      </div>
    </form>
  );
}

export default Form;
