import "./styles.css";
import data from "./data";
import { useState } from "react";

export default function App() {
  const topics = data.topics;
  const units = data.topics[0].units;
  const [searchTerm, setSearchTerm] = useState("");

  function displayUnits(topic) {
    return topic.units.map((unit) => {
      const searchResults = unit.lessons.filter((lesson) =>
        lesson.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return (
        <>
          {searchResults.length > 0 && <h3>{unit.title}</h3>}
          {searchResults.map((lesson) => (
            <p>
              <a href={`https://github.com/${lesson.github_repo_name}`}>
                {lesson.title}
              </a>
            </p>
          ))}
        </>
      );
    });
  }
  return (
    <div className="App">
      <h1>FlatNav</h1>
      <input
        type="text"
        placeholder="find something"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {/* iterate over units in topic and see if there is at least one lesson in any unit that matches the input. */}
      {topics.map((topic) => {
        const foundLessons = topic.units.some((unit) => {
          return unit.lessons.find((lesson) =>
            lesson.title.toLowerCase().includes(searchTerm.toLowerCase())
          );
        });
        return (
          <>
            {foundLessons && <h2>{topic.title}</h2>}
            {displayUnits(topic)}
          </>
        );
      })}
    </div>
  );
}
