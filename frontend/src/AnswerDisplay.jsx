import { useState, useEffect } from "react";

export default function AnswerDisplay() {
  const [answerText, setAnswerText] = useState("");

  useEffect(() => {
    fetch("/answers.txt")  // Correct fetch path
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch answer file");
        }
        return response.text();
      })
      .then((data) => setAnswerText(data))
      .catch((error) => console.error("Error loading the file:", error));
  }, []);

  return (
      <pre>{answerText}</pre>
  );
}
