import { useState, useEffect } from "react";
import "./QuizDisplay.css";

export default function QuizDisplay() {
  const [quizText, setQuizText] = useState("");

  useEffect(() => {
    fetch("/questions.txt")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch quiz file");
        }
        return response.text();
      })
      .then((data) => setQuizText(data))
      .catch((error) => console.error("Error loading the file:", error));
  }, []);

  return (
    <div className="quiz-container">
      <h2 className="quiz-title">Perplexity Checks Your Understanding:</h2>
      <div className="quiz-question">
        <pre>{quizText}</pre>
      </div>
    </div>
  );
}
