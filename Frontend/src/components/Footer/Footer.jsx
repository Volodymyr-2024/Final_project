import styles from "./Footer.module.css";

function Footer(props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.nav}>
        <p>Home</p>
        <p>Search</p>
        <p>Explore</p>
        <p>Messages</p>
        <p>Notifications</p>
        <p>Create</p>
      </div>
      <div className={styles.gram}>
        <p>© 2024 ICHgram</p>
      </div>
    </div>
  );
}

export default Footer;
