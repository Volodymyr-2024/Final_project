import BackMenu from "../components/BackMenu/BackMenu";
import Footer from "../components/Footer/Footer";
import FourPost from "../components/FourPost/FourPost";
import Search from "../components/Search/Search";

function SearchPage(props) {
  return (
    <div>
      <div style={{ display: "flex", position: "relative" }}>
        <BackMenu />
        <Search />
        <div style={{ backgroundColor: "#000000", opacity: "65%" }}>
          <FourPost />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SearchPage;
