import BackMenu from "../components/BackMenu/BackMenu";
import EditProfile from "../components/EditProfile/EditProfile";
import Footer from "../components/Footer/Footer";

function EdirProfilePage(props) {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <BackMenu />
        <EditProfile />
      </div>
      <Footer />
    </div>
  );
}

export default EdirProfilePage;
