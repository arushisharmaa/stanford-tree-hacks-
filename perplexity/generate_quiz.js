require('dotenv').config();
const fs = require('fs').promises;
const path = require('path');
const fetch = require('node-fetch');
const PERPLEXITY_KEY = process.env.REACT_APP_PUBLIC_API_KEY ;

const NOTES_PATH = path.join(__dirname, "..", "backend", "data", "transcript.txt");
const QUESTIONS_PATH = path.join(__dirname, "questions.txt");
const ANSWERS_PATH = path.join(__dirname, "answers.txt");

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
        "Authorization": `Bearer ${PERPLEXITY_KEY}`,
      },
      body: JSON.stringify({
        model: "sonar-pro",
        messages: [
          {
            role: "system",
            content: "Generate 10 multiple-choice quiz questions based on the following notes. Each question should have 4 options (A, B, C, D) with one correct answer. Format the response as: \n\nQ1: Question text\nA) Option 1\nB) Option 2\nC) Option 3\nD) Option 4\nAnswer: X\n\nRepeat for all 10 questions.",
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
