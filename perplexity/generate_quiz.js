require('dotenv').config();
const fs = require('fs').promises;
const path = require('path');
const fetch = require('node-fetch'); // Ensure you have node-fetch installed
const API_KEY = "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" ;   // Load the API key from the .env file
// console.log(PERPLEXITY_KEY);  // Should print your API key if the .env file is loaded correctly



// File paths
const NOTES_PATH = path.join(__dirname, "..", "backend", "data", "transcript.txt");
const QUESTIONS_PATH = path.join(__dirname, "..", "frontend", "public", "questions.txt");
const ANSWERS_PATH = path.join(__dirname,"..", "frontend", "public", "answers.txt");
// Function to read the transcript file
async function readNotes() {
  try {
    return await fs.readFile(NOTES_PATH, 'utf8');
  } catch (error) {
    console.error(`Error reading transcript: ${error.message}`);
    return '';
  }
}

async function saveToFile(filename, content) {
  try {
    await fs.writeFile(filename, content, 'utf8');
    console.log(`Saved to ${filename}`);
  } catch (error) {
    console.error(`Error saving to ${filename}: ${error.message}`);
  }
}

async function generateQuiz() {
  try {
    const notes = await readNotes();

    if (!notes.trim()) {
      console.error("Transcript is empty! Cannot generate quiz.");
      return;
    }

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
            content: "Generate 3 short open-ended questions based on the following notes.",
          },
          {
            role: "user",
            content: notes,
          },
        ],
      }),
    });

    if (!response.ok) {
      console.error(`Error: Received ${response.status} from API.`);
      return;
    }

    const data = await response.json();
    const quizContent = data.choices[0].message.content;

    const questions = quizContent.replace(/Answer: [A-D]/g, '').trim();
    const answers = quizContent.match(/Answer: [A-D]/g)?.join('\n') || '';

    await saveToFile(QUESTIONS_PATH, questions);
    await saveToFile(ANSWERS_PATH, answers);

  } catch (error) {
    console.error(`Error generating quiz: ${error.message}`);
  }
}

generateQuiz();
