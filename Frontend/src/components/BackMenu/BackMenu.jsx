import styles from "./BackMenu.module.css";
import logo from "../../assets/ICHGRA_min.svg";
import { Link } from "react-router-dom";
import home from "../../assets/home.svg";
import search from "../../assets/search.svg";
import explore from "../../assets/explore.svg";
import messages from "../../assets/messages.svg";
import notifications from "../../assets/notifications.svg";
import create from "../../assets/create.svg";
import profile from "../../assets/profile.svg";

function BackMenu(props) {
  return (
    <div className={styles.wripper}>
      <div className={styles.logo_container}>
        <img src={logo} alt="logo_icon" />
      </div>
      <nav className={styles.nav}>
        <div className={styles.nav_icon_container}>
          <img src={home} alt="home_icon" />
          <Link to="/main">Home</Link>
        </div>
        <div className={styles.nav_icon_container}>
          <img src={search} alt="search_icon" />
          <Link>Search</Link>
        </div>
        <div className={styles.nav_icon_container}>
          <img src={explore} alt="explore_icon" />
          <Link>Explore</Link>
        </div>
        <div className={styles.nav_icon_container}>
          <img src={messages} alt="messages_icon" />
          <Link>Messages</Link>
        </div>
        <div className={styles.nav_icon_container}>
          <img src={notifications} alt="notifications_icon" />
          <Link>Notifications</Link>
        </div>
        <div className={styles.nav_icon_container}>
          <img src={create} alt="create_icon" />
          <Link>Create</Link>
        </div>
        <div className={styles.nav_icon_container}>
          <img src={profile} alt="profile_icon" className={styles.last_img} />
          <Link>Profile</Link>
        </div>
      </nav>
    </div>
  );
}

export default BackMenu;
