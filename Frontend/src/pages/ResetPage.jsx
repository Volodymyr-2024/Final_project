import ResetPassword from "../components/ResetPassword/ResetPassword";
import logo from "../../src/assets/ICHGRA_min.svg";

function ResetPage(props) {
  return (
    <div style={{ width: 1440, margin: "0 auto" }}>
      <div
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
