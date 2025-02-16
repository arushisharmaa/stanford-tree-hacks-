const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");

const API_KEY = "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";

// Define the path to the transcript file
const transcriptPath = path.join(__dirname, "..", "backend", "data", "transcript.txt");

// Define the path for the summary output file
const summaryFilePath = path.join(__dirname, "summary.txt");

// Function to read the transcript file
function readTranscript() {
  return new Promise((resolve, reject) => {
    fs.readFile(transcriptPath, "utf8", (err, data) => {
      if (err) {
        reject("Error reading the transcript file: " + err);
      } else {
        resolve(data);
      }
    });
  });
}

// Function to save summary to a file
function saveSummaryToFile(summary) {
  fs.writeFile(summaryFilePath, summary, "utf8", (err) => {
    if (err) {
      console.error("Error writing summary to file:", err);
    } else {
      console.log("Summary saved to:", summaryFilePath);
    }
  });
}

// Function to send request to Perplexity API
async function generateSummary() {
  try {
    const notes = await readTranscript(); // Read transcript dynamically

    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "sonar-pro", // Using the "sonar-pro" model as per the documentation
        messages: [
          {
            role: "system",
            content: "Be precise and concise; summarize in a maximum of four sentences.", // System instruction
          },
          {
            role: "user",
            content: notes, // Sending the transcript as user input
          },
        ],
      }),
    });

    // Check if the response status is OK (status code 200)
    if (!response.ok) {
      console.error(`Error: Received ${response.status} status from API.`);
      const errorText = await response.text();
      console.log("Error response body:", errorText); // Log the error body
      return;
    }

    const text = await response.text(); // Get the raw response text
    console.log("Raw API response:", text);

    // If the response is not empty and seems like JSON, try parsing it
    if (text) {
      const data = JSON.parse(text); // Manually parse the JSON
      const summary = data.choices[0].message.content; // Extract summary

      // console.log("Summary:", summary); // Log the summary to the console
c
      // Save the summary to a text file
      saveSummaryToFile(summary);
    } else {
      console.error("Received empty response from API.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Run the summary function
generateSummary();
