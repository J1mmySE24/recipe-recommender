import express from "express";
import bodyParser from "body-parser";
import ollama from "ollama"; // Assuming the ollama package exists and can be imported
import cors from "cors";
import multer from "multer";
import path from "path";

const app = express();
const port = 5003; // Keep the existing port

// Multer setup for file uploads
const upload = multer({ dest: "uploads/" }); // Destination folder for uploaded images

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
      model: "llama3.2-vision",
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
      model: "llama3.2-vision",
      messages: [{ role: "user", content: prompt }],
    });

    const content = response.message.content;

    // Use a regular expression to isolate JSON content
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Failed to extract JSON from the model's response.");
    }

    const botResponse = JSON.parse(jsonMatch[0]);
    console.log(botResponse);
    if (!botResponse.ingredients || !Array.isArray(botResponse.ingredients)) {
      throw new Error("Invalid response format from model.");
    }

    return res.status(200).json({ groceryList: botResponse.ingredients });
  } catch (error) {
    console.error("Error generating grocery list:", error.message);
    return res.status(500).json({ error: "Failed to generate grocery list." });
  }
});

// Image Analysis Endpoint
app.post("/api/image-analysis", upload.single("image"), async (req, res) => {
  try {
    const { file } = req;

    if (!file) {
      return res.status(400).json({ error: "No image file uploaded." });
    }

    const imagePath = path.resolve(file.path);

    // Send image to the llama3.2-vision model
    const response = await ollama.chat({
      model: "llama3.2-vision",
      messages: [
        {
          role: "user",
          content: `Analyze the nutrition facts/ingredients in this image. Focus on key indicators of health and assess whether the item is healthy or not, and provide a brief explanation for your conclusion. 
                    Suggest possible improvements or healthier alternatives. In your response have 3 sections only : "Health Assessment", "Possible Improvements" and "Healthier Alternatives", nothing else is requried.`,
          images: [imagePath], // Using the uploaded image
        },
      ],
    });

    return res.status(200).json({ analysis: response.message.content });
  } catch (error) {
    console.error("Error processing image:", error.message);
    return res.status(500).json({ error: "Failed to analyze the image." });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
