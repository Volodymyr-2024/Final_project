import { Route, Routes } from "react-router-dom";
import "./App.css";

import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ResetPage from "./pages/ResetPage";
import MainPage from "./pages/MainPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/register" element={<SignupPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/reset" element={<ResetPage />}></Route>
        <Route path="/main" element={<MainPage />}></Route>
        <Route path="/profile" element={<ProfilePage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
