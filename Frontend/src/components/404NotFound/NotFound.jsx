import styles from "./NotFound.module.css";
import smart from "../../assets/smartphone.png";

function NotFound(props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.img_container}>
        <img src={smart} alt="icon_smart" />
      </div>
      <div className={styles.text_container}>
        <h2>Oops! Page Not Found (404 Error)</h2>
        <p>
          We're sorry, but the page you're looking for doesn't seem to exist. If
          you typed the URL manually, please double-check the spelling. If you
          clicked on a link, it may be outdated or broken.
        </p>
      </div>
    </div>
  );
}

export default NotFound;
