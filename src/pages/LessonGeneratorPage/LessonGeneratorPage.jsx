import { useState } from "react";

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
  { display: "Science", value: "Science" },
  { display: "Math", value: "Math" },
  { display: "English Language Arts", value: "English Language Arts" },
  { display: "Social Studies", value: "Social Studies" },
  { display: "History", value: "History" },
  { display: "Geography", value: "Geography" },
  { display: "Visual Arts", value: "Visual Arts" },
  { display: "Drama", value: "Drama" },
  { display: "Music", value: "Music" },
  { display: "Core French", value: "Core French" },
];
function LessonForm({ onSubmit }) {
  const [subtopic, setSubtopic] = useState("");
  const [lessonLength, setLessonLength] = useState("");
  const [studentCount, setStudentCount] = useState("");
  const [techAvailable, setTechAvailable] = useState("");
  const [devicesCount, setDevicesCount] = useState("");
  const [soundAvailable, setSoundAvailable] = useState("");
  const [materialsAvailable, setMaterialsAvailable] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      subtopic,
      lessonLength,
      studentCount,
      techAvailable,
      devicesCount,
      soundAvailable,
      materialsAvailable,
    });
  };

  return (
    <>
      <h2>Create your lesson plan below</h2>
      <form onSubmit={handleSubmit}>
        <Dropdown label="Grade" items={grades} name="grades" />
        <Dropdown label="Subject" items={subjects} name="subject" />

        <label htmlFor="subtopic">Sub-Topic if applicable</label>
        <input
          type="text"
          value={subtopic}
          onChange={(e) => setSubtopic(e.target.value)}
          placeholder="ex: Electricity"
        />

        <label htmlFor="lessonLength">
          Length of lesson and activity in minutes
        </label>
        <input
          type="number"
          value={lessonLength}
          onChange={(e) => setLessonLength(e.target.value)}
          placeholder="ex: 45"
        />

        <label htmlFor="quantityofstudents">
          Anticipated number of students
        </label>
        <input
          type="number"
          value={studentCount}
          onChange={(e) => setStudentCount(e.target.value)}
          placeholder="ex: 30"
        />
        {/* change to checkbox */}
        <fieldset>
          <legend>Tech available? Select "No" if unsure</legend>
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
        </fieldset>

        {/* t/f boolean not string */}
        {techAvailable === "yes" && (
          <>
            <label htmlFor="devicesCount">How many devices available?</label>
            <input
              type="number"
              value={devicesCount}
              onChange={(e) => setDevicesCount(e.target.value)}
              placeholder="ex: 25"
            />
            {/* change to checkbox */}
            <fieldset>
              <legend>
                Will they have access to headphones or devices that make sound?
                Select "No" if unsure.
              </legend>
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
            </fieldset>
          </>
        )}
        {/* other materials available */}
        <label htmlFor="materialsAvailable">
          All other materials available
        </label>
        <input
          type="text"
          value={materialsAvailable}
          onChange={(e) => setMaterialsAvailable(e.target.value)}
          placeholder="ex: 24 whiteboards and markers, colouring crayons"
        />
        {/* teacher involvement */}
        <div class="slidecontainer">
          <label for="teacherInvolvement">Teacher involvement</label>
          <div class="slider-labels">
            <span class="min-label">Student-led</span>
            <input
              type="range"
              min="1"
              max="100"
              class="slider"
              id="teacherInvolvement"
            />
            <span class="max-label">Teacher-led</span>
          </div>
        </div>

        <button type="submit">Create Lesson Now</button>
      </form>
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
