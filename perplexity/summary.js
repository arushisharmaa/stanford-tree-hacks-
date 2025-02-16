<<<<<<< HEAD
// require('dotenv').config(); // Ensure dotenv is at the top
const fs = require('fs').promises;
const path = require('path');
const fetch = require('node-fetch'); // Ensure you have node-fetch installed

const API_KEY = "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"; 
// Define the path to the transcript file
const transcriptPath = path.join(__dirname, "..", "backend", "data", "transcript.txt");

// Define the path for the summary output file
const summaryFilePath = path.join(__dirname, "..", "frontend", "public", "summary.txt");
=======
require('dotenv').config();
const fs = require('fs').promises;
const path = require('path');
const fetch = require('node-fetch');
const PERPLEXITY_KEY = process.env.REACT_APP_PUBLIC_API_KEY;

const transcriptPath = path.join(__dirname, "..", "backend", "data", "transcript.txt");

const summaryFilePath = path.join(__dirname, "summary.txt");
>>>>>>> fc697d17c2d0f8b98c456e4cfd7ef2ec239a0cce

async function readTranscript() {
  try {
    const data = await fs.readFile(transcriptPath, "utf8");
    return data;
  } catch (err) {
    throw new Error("Error reading the transcript file: " + err);
  }
}

async function saveSummaryToFile(summary) {
  try {
    await fs.writeFile(summaryFilePath, summary, "utf8");
  } catch (err) {
    console.error("Error writing summary to file:", err);
  }
}

async function generateSummary() {
  try {
    const notes = await readTranscript();

    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "sonar-pro",
        messages: [
          {
            role: "system",
            content: "Be precise and concise; summarize in a maximum of four sentences.",
          },
          {
            role: "user",
            content: notes,
          },
        ],
      }),
    });

    if (!response.ok) {
      console.error(`Error: Received ${response.status} status from API.`);
      const errorText = await response.text();
      console.log("Error response body:", errorText);
      return;
    }

    const text = await response.text();

    if (text) {
      try {
        const data = JSON.parse(text);
        const summary = data.choices[0].message.content;

        await saveSummaryToFile(summary);
      } catch (err) {
        console.error("Error parsing the API response:", err);
      }
    } else {
      console.error("Received empty response from API.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

generateSummary();
