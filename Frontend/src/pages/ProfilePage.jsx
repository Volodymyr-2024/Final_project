import BackMenu from "../components/BackMenu/BackMenu";
import Footer from "../components/Footer/Footer";
import Profile from "../components/Profile/Profile";

function ProfilePage(props) {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <BackMenu />
        <Profile />
      </div>
      <Footer />
    </div>
  );
}

export default ProfilePage;
