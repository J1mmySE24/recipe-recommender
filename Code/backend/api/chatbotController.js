import express from "express";
import bodyParser from "body-parser";
import ollama from "ollama"; // Assuming the ollama package exists and can be imported
import cors from "cors";

const app = express();
const port = 5003; // Keep the existing port

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  }),
);
app.use(bodyParser.json());

// Chatbot Endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { userMessage } = req.body;

    if (!userMessage) {
      return res.status(400).json({ error: "Message content is required." });
    }

    const response = await ollama.chat({
      model: "llama3.2",
      messages: [{ role: "user", content: userMessage }],
    });

    return res.status(200).json({ botMessage: response.message.content });
  } catch (error) {
    console.error("Error in chatbot response:", error);
    return res.status(500).json({ error: "Failed to process the message." });
  }
});

// Grocery List Generator Endpoint
app.post("/api/grocerylist", async (req, res) => {
  try {
    
    const { recipeName, cuisine, dietType, allergens } = req.body;

    if (!recipeName || !cuisine || !dietType) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const allergenList = allergens ? allergens.join(", ") : "None";

    const prompt = `
      Generate a detailed grocery list for the recipe:
      - Recipe Name: ${recipeName}
      - Cuisine: ${cuisine}
      - Diet Type: ${dietType}
      - Allergens to exclude: ${allergenList}

      Format the response in JSON with the following structure and only json format nothing extra in normal text:
      {
        "ingredients": [
          {"item": "<name>", "unit": "<amount and unit>"}
        ]
      }
    `;

    const response = await ollama.chat({
      model: "llama3.2",
      messages: [{ role: "user", content: prompt}],
    });
    
    const content = response.message.content;

    // Use a regular expression to isolate JSON content
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Failed to extract JSON from the model's response.");
    }

    const botResponse = JSON.parse(jsonMatch[0]);
    console.log(botResponse)
    if (!botResponse.ingredients || !Array.isArray(botResponse.ingredients)) {
      throw new Error("Invalid response format from model.");
    }

    return res.status(200).json({ groceryList: botResponse.ingredients });
  } catch (error) {
    console.error("Error generating grocery list:", error.message);
    return res.status(500).json({ error: "Failed to generate grocery list." });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
