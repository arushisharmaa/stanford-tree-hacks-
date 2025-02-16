const fs = require('fs').promises;
const path = require('path');
const fetch = require('node-fetch'); // Ensure you have node-fetch installed

const API_KEY = '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'; // Replace with your actual API key

// File paths
const NOTES_PATH = path.join(__dirname, "..", "backend", "data", "transcript.txt");
const RESOURCES_PATH = path.join(__dirname, "resources.txt");

// Function to read the transcript file
async function readNotes() {
  try {
    return await fs.readFile(NOTES_PATH, "utf8");
  } catch (error) {
    console.error(`Error reading transcript: ${error.message}`);
    return "";
  }
}

// Function to save content to a file
async function saveToFile(filename, content) {
  try {
    await fs.writeFile(filename, content, "utf8");
    console.log(`Saved to ${filename}`);
  } catch (error) {
    console.error(`Error saving to ${filename}: ${error.message}`);
  }
}

// Function to generate learning resources
async function generateResources() {
  try {
    const notes = await readNotes(); // Read transcript

    if (!notes.trim()) {
      console.error("Transcript is empty! Cannot generate resources.");
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
            content: "Based on the following notes, generate strictly the following: \n" +
                        "1. Two YouTube video titles that would be helpful for learning this topic.\n" +
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

    // Save resources
    await saveToFile(RESOURCES_PATH, resourcesContent);

  } catch (error) {
    console.error(`Error generating resources: ${error.message}`);
  }
}

// Run the resource generation
generateResources();
