require('dotenv').config();
const fs = require('fs').promises;
const path = require('path');
const fetch = require('node-fetch');
const PERPLEXITY_KEY = process.env.REACT_APP_PUBLIC_API_KEY ;


const NOTES_PATH = path.join(__dirname, "..", "backend", "data", "transcript.txt");
const RESOURCES_PATH = path.join(__dirname, "resources.txt");

async function readNotes() {
  try {
    return await fs.readFile(NOTES_PATH, "utf8");
  } catch (error) {
    console.error(`Error reading transcript: ${error.message}`);
    return "";
  }
}

async function saveToFile(filename, content) {
  try {
    await fs.writeFile(filename, content, "utf8");
    console.log(`Saved to ${filename}`);
  } catch (error) {
    console.error(`Error saving to ${filename}: ${error.message}`);
  }
}

async function generateResources() {
  try {
    const notes = await readNotes();

    if (!notes.trim()) {
      console.error("Transcript is empty! Cannot generate resources.");
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
            content: "Based on the following notes, generate strictly the following: \n" +
                        "1. Two YouTube video titles that would be helpful for learning this topic and their channels.\n" +
                        "2. One website resource (with URL) that would be useful.\n" +
                        "3. One textbook recommendation (including author and edition if available).\n\n"
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
    const resourcesContent = data.choices[0].message.content;

    await saveToFile(RESOURCES_PATH, resourcesContent);

  } catch (error) {
    console.error(`Error generating resources: ${error.message}`);
  }
}

generateResources();
