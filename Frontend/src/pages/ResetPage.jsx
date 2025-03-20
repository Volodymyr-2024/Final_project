import ResetPassword from "../components/ResetPassword/ResetPassword";
import logo from "../../src/assets/ICHGRA_min.svg";
import "../App.css";

function ResetPage(props) {
  return (
    <div className="reset_page_container">
      <div
        className="reset_page_img_container"
        style={{
          borderBottom: "1px solid #dbdbdb",
          paddingLeft: 44,
          marginBottom: 84,
        }}
      >
        <img src={logo} alt="" />
      </div>
      <ResetPassword />
    </div>
  );
}

export default ResetPage;
