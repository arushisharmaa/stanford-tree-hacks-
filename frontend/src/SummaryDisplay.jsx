import { useState, useEffect } from "react";
import "./SummaryDisplay.css";

export default function SummaryDisplay() {
  const [summaryText, setSummaryText] = useState("");

  useEffect(() => {
    fetch("/summary.txt")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch file");
        }
        return response.text();
      })
      .then((data) => setSummaryText(data))
      .catch((error) => console.error("Error loading the file:", error));
  }, []);

  return (
    <div className="summary-container">
      <pre>{summaryText}</pre>
    </div>
  );
}
