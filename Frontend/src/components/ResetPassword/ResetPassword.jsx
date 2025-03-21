import styles from "./ResetPassword.module.css";
import logo from "../../assets/trouble_logging.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { resetPassword } from "../../constants/api";

function ResetPassword(props) {
  const [loginInput, setLoginInput] = useState("");
  const [message, setMessage] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleChange = (event) => {
    setLoginInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isEmail = loginInput.includes("@");
    const loginData = isEmail
      ? { email: loginInput }
      : { username: loginInput };
    try {
      const response = await resetPassword(loginData);
      if (response.newPassword) {
        setNewPassword(response.newPassword);
        setMessage(`Your new password: ${response.newPassword}`);
      } else {
        setMessage("Password reset request sent!");
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  const handleCopyPassword = () => {
    if (newPassword) {
      navigator.clipboard
        .writeText(newPassword)
        .then(() => {
          alert("Password copied to clipboard!");
        })
        .catch((error) => {
          console.error("Failed to copy password:", error.message);
          alert("Failed to copy password");
        });
    }
  };

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit}>
      <div className={styles.up_container}>
        <div className={styles.logo_container}>
          <img src={logo} alt="logo_image" />
        </div>
        <h3>Trouble logging in?</h3>
        <p>
          Enter your email, phone, or username and we'll send you a link to get
          back into your account.
        </p>
        <input
          type="text"
          name="username"
          placeholder="Email or Username"
          onChange={handleChange}
        />
        {message && <p id={styles.error}>{message}</p>}
        <button type="submit" className={styles.submitButton}>
          Reset your password
        </button>

        {newPassword && (
          <button
            type="button"
            onClick={handleCopyPassword}
            className={styles.copyButton}
          >
            Copy Password
          </button>
        )}

        <div className={styles.or}>
          <span className={styles.lineLeft}></span>
          <p>OR</p>
          <span className={styles.lineRigth}></span>
        </div>
        <h5>
          <Link to="/register">Create new account</Link>
        </h5>
      </div>
      <div className={styles.bottom_container}>
        <h5>
          <Link to="/login" className={styles.link}>
            Back to login
          </Link>
        </h5>
      </div>
    </form>
  );
}

export default ResetPassword;
