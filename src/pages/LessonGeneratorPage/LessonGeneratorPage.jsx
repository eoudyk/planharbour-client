import { useState } from "react";
import "../LessonGeneratorPage/LessonGenerator.scss";
import axios from "axios";
import { grades } from "./constants/grades";
import { subjects } from "./constants/subjects";

function LessonForm() {
  const [grade, setGrade] = useState(grades[0].value);
  const [subject, setSubject] = useState(subjects[0].value);
  const [teacherInvolvement, setTeacherInvolvement] = useState(50);
  const [subtopic, setSubtopic] = useState("");
  const [lessonLength, setLessonLength] = useState("");
  const [studentCount, setStudentCount] = useState("");
  const [techAvailable, setTechAvailable] = useState("");
  const [devicesCount, setDevicesCount] = useState("");
  const [soundAvailable, setSoundAvailable] = useState("");
  const [materialsAvailable, setMaterialsAvailable] = useState("");

  const [gptResponse, setGptResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formDataHelper = {
    grade,
    subject,
    subtopic,
    lessonLength,
    studentCount,
    techAvailable,
    devicesCount,
    soundAvailable,
    materialsAvailable,
    teacherInvolvement,
    gptResponse,
  };

  // save to DB:
  const handleSaveToDB = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/saveLessonToDB",
        formDataHelper
      );
      if (response.data.success) {
        alert("Lesson saved to your database successfully!");
      } else {
        alert("Error saving lesson: " + response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error saving lesson. Please try again.");
    }
  };

  //submit form:
  const handleSubmit = async (e) => {
    e.preventDefault();

    const prompt = `Create a lesson plan for ${formDataHelper.grade} on ${formDataHelper.subject}, specifically ${formDataHelper.subtopic}, lasting ${formDataHelper.lessonLength} minutes for ${formDataHelper.studentCount} students. Tech available: ${formDataHelper.techAvailable}, devices: ${formDataHelper.devicesCount}, can the devices play sound: ${formDataHelper.soundAvailable} please list any specific websites or make suggestions to specific sites they/the teacher should visit. Other materials: ${formDataHelper.materialsAvailable}. Teacher involvement on a scale from 1-100 wheras 1 is entirely student led and 100 is extremely guided by the teacher: ${formDataHelper.teacherInvolvement}. Include any mockup worksheets or handouts you may suggest in full. Include at least 1 open-ended extension activity`;

    try {
      setIsLoading(true); //start loading
      const response = await axios.post("http://localhost:8080/sendToGPT", {
        prompt,
      });

      setGptResponse(response.data.message);
      setIsLoading(false);
    } catch (error) {
      console.error("Error sending data to GPT-3:", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <h2 className="creator-form__title">Create your lesson plan below</h2>
      <form className="creator-form" onSubmit={handleSubmit}>
        {/* grade */}
        <div className="creator-form__grade">
          <Dropdown
            label="Grade:"
            items={grades}
            name="grades"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          />
        </div>
        {/* subject */}
        <div className="creator-form__subject">
          <Dropdown
            label="Subject:"
            items={subjects}
            name="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        {/* sub-subject */}
        <div className="creator-form__subtopic">
          <label htmlFor="subtopic">Sub-Topic if applicable: </label>
          <input
            type="text"
            value={subtopic}
            onChange={(e) => setSubtopic(e.target.value)}
            placeholder="ex: Electricity"
          />
        </div>
        {/* lesson length */}
        <div className="creator-form__lesson-length">
          <label htmlFor="lessonLength">
            Length of lesson and activity in minutes:
          </label>
          <input
            type="number"
            value={lessonLength}
            onChange={(e) => setLessonLength(e.target.value)}
            placeholder="ex: 45"
          />
        </div>

        <div className="creator-form__quantity-students">
          <label htmlFor="quantityofstudents">
            Anticipated number of students:
          </label>
          <input
            type="number"
            value={studentCount}
            onChange={(e) => setStudentCount(e.target.value)}
            placeholder="ex: 30"
          />
        </div>
        {/* change to checkbox? */}
        <div className="creator-form__tech-available">
          <div>Tech available? Select "No" if unsure: </div>
          <RadioInput
            id="techYes"
            name="tech__available"
            value="yes"
            stateSetter={setTechAvailable}
            label="Yes"
          />
          <RadioInput
            id="techNo"
            name="tech__available"
            value="no"
            stateSetter={setTechAvailable}
            label="No"
          />
        </div>

        {/* t/f boolean not string */}
        {techAvailable === "yes" && (
          <>
            <div className="creator-form__number-devices">
              <label htmlFor="devicesCount">How many devices available?</label>
              <input
                type="number"
                value={devicesCount}
                onChange={(e) => setDevicesCount(e.target.value)}
                placeholder="ex: 25"
              />
            </div>
            {/* change to checkbox */}
            <div className="creator-form__devices-sound">
              <div>
                Will they have access to headphones or devices that make sound?
                Select "No" if unsure:{" "}
              </div>
              <RadioInput
                id="soundYes"
                name="sound__available"
                value="yes"
                stateSetter={setSoundAvailable}
                label="Yes"
              />
              <RadioInput
                id="soundNo"
                name="sound__available"
                value="no"
                stateSetter={setSoundAvailable}
                label="No"
              />
            </div>
          </>
        )}
        {/* other materials available */}
        <div className="creator-form__other-materials">
          <label htmlFor="materialsAvailable">
            All other materials available:
          </label>
          <input
            type="text"
            value={materialsAvailable}
            onChange={(e) => setMaterialsAvailable(e.target.value)}
            placeholder="ex: 24 whiteboards and markers, colouring crayons"
          />
        </div>
        {/* teacher involvement */}
        <div className="slidecontainer">
          <label htmlFor="teacherInvolvement">Teacher involvement:</label>
          <div className="slider-labels">
            <span className="min-label">Student-led </span>
            <input
              type="range"
              min="1"
              max="100"
              className="slider"
              value={teacherInvolvement}
              onChange={(e) => setTeacherInvolvement(e.target.value)}
              list="steplist"
            />
            <datalist id="steplist">
              <option>1</option>
              <option>25</option>
              <option>50</option>
              <option>75</option>
              <option>100</option>
            </datalist>
            <span className="max-label"> Teacher-led</span>
          </div>
        </div>

        <button className="creator-form__button" type="submit">
          Create Lesson Now
        </button>
      </form>

      {isLoading && <div>Loading...</div>}

      {gptResponse && (
        <>
          <h2 className="gpt-response__title">Generated Lesson Plan:</h2>
          <pre className="gpt-response__content">{gptResponse}</pre>
          <form>
            <div className="gpt-response__update">
              <label htmlFor="update">Any changes?</label>
              <input type="text" placeholder="ex: No devices" />
              <button className="resubmit__button">Resubmit</button>
            </div>
          </form>
          <button className="save__lesson-button" onClick={handleSaveToDB}>
            Save Lesson
          </button>
          <button className="export__lesson-button">Export to pdf</button>
        </>
      )}
    </>
  );
}

const Dropdown = ({ label, items, name, value, onChange }) => (
  <>
    <label htmlFor={name}>{label}</label>
    <select id={name} name={name} value={value} onChange={onChange}>
      {items.map(({ display, value }) => (
        <option key={value} value={value}>
          {display}
        </option>
      ))}
    </select>
  </>
);

const RadioInput = ({ id, name, value, stateSetter, label }) => (
  <>
    <input
      type="radio"
      id={id}
      name={name}
      value={value}
      onChange={() => stateSetter(value)}
    />
    <label htmlFor={id}>{label}</label>
  </>
);

export default LessonForm;
