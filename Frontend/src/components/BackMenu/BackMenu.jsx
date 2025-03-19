import styles from "./BackMenu.module.css";
import logo from "../../assets/ICHGRA_min.svg";
import { NavLink } from "react-router-dom";
import home from "../../assets/home.svg";
import search from "../../assets/search.svg";
import explore from "../../assets/explore.svg";
import messages from "../../assets/messages.svg";
import notifications from "../../assets/notifications.svg";
import create from "../../assets/create.svg";
import profile from "../../assets/profile.svg";
import { useState } from "react";

function BackMenu() {
  const userId = localStorage.getItem("userId");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { to: "/main", icon: home, label: "Home" },
    { to: "/search", icon: search, label: "Search" },
    { to: "/explore", icon: explore, label: "Explore" },
    { to: "/messages", icon: messages, label: "Messages" },
    { to: "/notifications", icon: notifications, label: "Notifications" },
    { to: "/create", icon: create, label: "Create" },
    {
      to: userId ? `/profile/${userId}` : "/",
      icon: profile,
      label: "Profile",
      className: styles.last_img,
    },
  ];
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.logo_container}>
        <img src={logo} alt="logo_icon" />
      </div>

      <button className={styles.burger_menu} onClick={toggleMenu}>
        <div className={styles.burger_line}></div>
        <div className={styles.burger_line}></div>
        <div className={styles.burger_line}></div>
      </button>

      <nav className={`${styles.nav} ${isMenuOpen ? styles.nav_open : ""}`}>
        {navLinks.map(({ to, icon, label, className }) => (
          <div key={to} className={styles.nav_icon_container}>
            <img
              src={icon}
              alt={`${label.toLowerCase()}_icon`}
              className={className}
            />
            <NavLink
              to={to}
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ""}`
              }
            >
              {label}
            </NavLink>
          </div>
        ))}
      </nav>
    </div>
  );
}

export default BackMenu;
