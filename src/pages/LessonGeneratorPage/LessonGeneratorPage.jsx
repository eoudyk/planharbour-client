import { useState } from "react";
import "../LessonGeneratorPage/LessonGenerator.scss";
import axios from "axios";

const grades = [
  { display: "1", value: "Grade 1" },
  { display: "1/2", value: "Grade 1/2 split" },
  { display: "2", value: "Grade 2" },
  { display: "2/3", value: "Grade 2/3 split" },
  { display: "3", value: "Grade 3" },
  { display: "3/4", value: "Grade 3/4 split" },
  { display: "4", value: "Grade 4" },
  { display: "4/5", value: "Grade 4/5 split" },
  { display: "5", value: "Grade 5" },
  { display: "5/6", value: "Grade 5/6 split" },
  { display: "6", value: "Grade 6" },
  { display: "6/7", value: "Grade 6/7 split" },
  { display: "7", value: "Grade 7" },
  { display: "7/8", value: "Grade 7/8 split" },
  { display: "8", value: "Grade 8" },
];
const subjects = [
  { display: "Math", value: "Math" },
  { display: "Science", value: "Science" },
  { display: "English Language Arts", value: "English Language Arts" },
  { display: "Social Studies", value: "Social Studies" },
  { display: "History", value: "History" },
  { display: "Geography", value: "Geography" },
  { display: "Visual Arts", value: "Visual Arts" },
  { display: "Drama", value: "Drama" },
  { display: "Music", value: "Music" },
  { display: "Core French", value: "Core French" },
];
function LessonForm() {
  const [subtopic, setSubtopic] = useState("");
  const [lessonLength, setLessonLength] = useState("");
  const [studentCount, setStudentCount] = useState("");
  const [techAvailable, setTechAvailable] = useState("");
  const [devicesCount, setDevicesCount] = useState("");
  const [soundAvailable, setSoundAvailable] = useState("");
  const [materialsAvailable, setMaterialsAvailable] = useState("");

  const [gptResponse, setGptResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      grade: document.getElementById("grades").value,
      subject: document.getElementById("subject").value,
      subtopic,
      lessonLength,
      studentCount,
      techAvailable,
      devicesCount,
      soundAvailable,
      materialsAvailable,
      teacherInvolvement: document.getElementById("teacherInvolvement").value,
    };

    const prompt = `Create a lesson plan for ${formData.grade} on ${formData.subject}, specifically ${formData.subtopic}, lasting ${formData.lessonLength} minutes for ${formData.studentCount} students. Tech available: ${formData.techAvailable}, devices: ${formData.devicesCount}, can the devices play sound: ${formData.soundAvailable} please list any specific websites or make suggestions to specific sites they/the teacher should visit. Other materials: ${formData.materialsAvailable}. Teacher involvement on a scale from 1-100 wheras 1 is entirely student led and 100 is extremely guided by the teacher: ${formData.teacherInvolvement}. Include any mockup worksheets or handouts you may suggest in full. Include at least 1 open-ended extension activity`;

    try {
      setIsLoading(true); //start loading
      const response = await axios.post("http://localhost:8080/sendToGPT", {
        prompt,
      });

      setGptResponse(response.data.message);
      setIsLoading(false);
      console.log(response.data.message);
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
          <Dropdown label="Grade:" items={grades} name="grades" />
        </div>
        {/* subject */}
        <div className="creator-form__subject">
          <Dropdown label="Subject:" items={subjects} name="subject" />
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
          <label for="teacherInvolvement">Teacher involvement:</label>
          <div className="slider-labels">
            <span className="min-label">Student-led</span>
            <input
              type="range"
              min="1"
              max="100"
              className="slider"
              id="teacherInvolvement"
            />
            <span className="max-label">Teacher-led</span>
          </div>
        </div>

        <button className="creator-form__button" type="submit">
          Create Lesson Now
        </button>
      </form>

      {isLoading && <div>Loading...</div>}

      {gptResponse && (
        <>
          <h2>Generated Lesson Plan:</h2>
          <pre className="gpt__response">{gptResponse}</pre>
          <button className="save__lesson-button">Save Lesson</button>
          <button className="export__lesson-button">Export to pdf</button>
        </>
      )}
    </>
  );
}

const Dropdown = ({ label, items, name }) => (
  <>
    <label htmlFor={name}>{label}</label>
    <select id={name} name={name}>
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
