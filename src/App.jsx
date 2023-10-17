import "./App.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import LoginPage from "./pages/LoginPage/LoginPage";
import LessonGeneratorPage from "./pages/LessonGeneratorPage/LessonGeneratorPage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <div className="app">
          <Routes>
            <Route path="/" element={<LessonGeneratorPage />} />
            {/* <Route path="/login" element={<LoginPage />} /> */}
            <Route path="/create" element={<LessonGeneratorPage />} />
          </Routes>
        </div>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
