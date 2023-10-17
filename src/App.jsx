import "./App.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import LoginPage from "./pages/LoginPage/LoginPage";
import LessonGeneratorPage from "./pages/LessonGeneratorPage/LessonGeneratorPage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LoginPage from "./pages/LoginPage/LoginPage";
import UserHomePage from "./pages/UserHomePage/UserHomePage";

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <div className="app">
          <Routes>
            <Route path="/" element={<LessonGeneratorPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/user-home" element={<UserHomePage />} />
            <Route path="/create" element={<LessonGeneratorPage />} />
          </Routes>
        </div>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
