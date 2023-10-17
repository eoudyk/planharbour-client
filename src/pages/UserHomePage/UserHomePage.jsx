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
          <div className="lesson-card">
            <p className="grade">Grade: 6</p>
            <p className="subject">Subject: Math</p>
            <p className="subtopic">Subtopic: Algebra</p>
            <p className="date_created">Date Created: October 17, 2023</p>
          </div>
          <div className="lesson-card">
            <p className="grade">Grade: 6</p>
            <p className="subject">Subject: Math</p>
            <p className="subtopic">Subtopic: Data Management</p>
            <p className="date_created">Date Created: October 18, 2023</p>
          </div>
        </div>
        <form onSubmit={handleCreateLesson}>
          <button className="user-home__create-button">
            Create a new lesson
          </button>
        </form>
      </div>
    </>
  );
}

export default UserHomePage;
