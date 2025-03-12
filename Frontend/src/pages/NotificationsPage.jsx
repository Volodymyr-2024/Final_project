import BackMenu from "../components/BackMenu/BackMenu";
import Footer from "../components/Footer/Footer";
import FourPost from "../components/FourPost/FourPost";
import Notifications from "../components/Notifications/Notifications";

function NotificationsPage(props) {
  return (
    <div>
      <div style={{ display: "flex", position: "relative" }}>
        <BackMenu />
        <Notifications />
        <div style={{ position: "relative", width: "100%" }}>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.65)",
              zIndex: 1,
            }}
          />
          <FourPost />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default NotificationsPage;
