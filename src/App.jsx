import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import LoginPage from "./pages/LoginPage/LoginPage";
import LessonGeneratorPage from "./pages/LessonGeneratorPage/LessonGeneratorPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="app">
          <Routes>
            <Route path="/" element={<LessonGeneratorPage />} />
            {/* <Route path="/login" element={<LoginPage />} /> */}
            <Route path="/create" element={<LessonGeneratorPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
