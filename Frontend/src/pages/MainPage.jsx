import BackMenu from "../components/BackMenu/BackMenu";
import Footer from "../components/Footer/Footer";
import FourPost from "../components/FourPost/FourPost";

function MainPage(props) {
  return (
    <div>
      <div style={{display: "flex"}}>
      <BackMenu />
      <FourPost />
      </div>
      <Footer />
    </div>
  );
}

export default MainPage;
