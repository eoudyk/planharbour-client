import "../UserHomePage/UserHomePage.scss";
import { useNavigate } from "react-router-dom";

function UserHomePage() {
  const navigate = useNavigate();
  const handleCreateLesson = async (e) => {
    e.preventDefault();
    navigate("/create");
  };
  return (
    <>
      <div className="user-home">
        <div className="user-home__greeting">Welcome Emily!</div>
        <div className="user-home__lessons">
          <h4 className="user-home__lesson-previous">
            Previously created lessons:
          </h4>
        </div>
        <button className="user-home__create-button">
          Create a new lesson
        </button>
      </div>
    </>
  );
}

export default UserHomePage;
