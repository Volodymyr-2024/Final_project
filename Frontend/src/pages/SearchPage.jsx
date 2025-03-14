import FourPost from "../components/FourPost/FourPost";
import Search from "../components/Search/Search";

function SearchPage(props) {
  return (
    <div style={{ position: "relative" }}>
      <Search />
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
  );
}

export default SearchPage;
