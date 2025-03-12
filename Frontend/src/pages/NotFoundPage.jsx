import NotFound from "../components/404NotFound/NotFound";
import BackMenu from "../components/BackMenu/BackMenu";
import Footer from "../components/Footer/Footer";

function NotFoundPage(props) {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <BackMenu />
        <NotFound />
      </div>
      <Footer />
    </div>
  );
}

export default NotFoundPage;
