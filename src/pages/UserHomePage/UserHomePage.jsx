import "../UserHomePage/UserHomePage.scss";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UserHomePage() {
  const [lessons, setLessons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // fetch lesson plans when the component mounts
    const fetchLessons = async () => {
      try {
        const response = await axios.get("http://localhost:8080/getLessons");
        setLessons(response.data.lessons);
      } catch (error) {
        console.error("Error fetching lessons:", error);
      }
    };

    fetchLessons();
  }, []);

  const handleDeleteLesson = async (lessonId) => {
    try {
      await axios.delete(`http://localhost:8080/deleteLesson/${lessonId}`);
      setLessons(lessons.filter((lesson) => lesson.id !== lessonId));
    } catch (error) {
      console.error("Error deleting lesson:", error);
    }
  };

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
          {lessons.map((lesson, index) => (
            <div key={index} className="lesson-card">
              <p className="grade">Grade: {lesson.grade}</p>
              <p className="subject">Subject: {lesson.subject}</p>
              <p className="subtopic">Subtopic: {lesson.subtopic}</p>
              <p className="date_created">
                Date Created: {new Date(lesson.updated_at).toLocaleDateString()}
              </p>
              <button
                className="delete__button"
                onClick={() => handleDeleteLesson(lesson.id)}
              >
                Delete
              </button>
            </div>
          ))}
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
