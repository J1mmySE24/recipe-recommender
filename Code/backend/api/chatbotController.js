import express from 'express';
import bodyParser from 'body-parser';
import ollama from 'ollama';  // Assuming the ollama package exists and can be imported
import cors from 'cors';  // Import the cors package

const app = express();
const port = 5003;

app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  })); 
app.use(bodyParser.json());

app.post('/api/chat', async (req, res) => {
    try {
      const { userMessage } = req.body;  // Extract the user's message from the request body
  
      if (!userMessage) {
        return res.status(400).json({ error: 'Message content is required.' });
      }
      
      const response = await ollama.chat({
        model: 'llama3.2',
        messages: [{ role: 'user', content: userMessage }],
      });
  
      
      return res.status(200).json({ botMessage: response.message.content });
    } catch (error) {
      console.error('Error in chatbot response:', error);
      return res.status(500).json({ error: 'Failed to process the message.' });
    }
  });

// Start the server
app.listen(port, () => {
  console.log(`Chatbot server running at http://localhost:${port}`);
});
