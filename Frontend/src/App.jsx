import { Route, Routes } from "react-router-dom";
import "./App.css";

import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Footer from "./components/Footer/Footer";
import ResetPage from "./pages/ResetPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/register" element={<SignupPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/main" element={<Footer />}></Route>
        <Route path="/reset" element={<ResetPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
