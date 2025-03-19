import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

function Footer(props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.nav}>
        <p>
          <Link to="/main">Home</Link>
        </p>
        <p>
          <Link to="/search">Search</Link>
        </p>
        <p>
          <Link to="/explore">Explore</Link>
        </p>
        <p>
          <Link to="/messages">Messages</Link>
        </p>
        <p>
          <Link to="/notifications">Notifications</Link>
        </p>
        <p>
          <Link to="/create">Create</Link>
        </p>
      </div>
      <div className={styles.gram}>
        <p>© 2024 ICHgram</p>
      </div>
    </div>
  );
}

export default Footer;
