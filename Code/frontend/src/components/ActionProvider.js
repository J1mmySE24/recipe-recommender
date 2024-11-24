class ActionProvider {
  constructor(createChatBotMessage, setState) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setState;
  }

  async fetchResponse(message) {
    try {
      const res = await fetch("http://localhost:5003/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userMessage: message }),  // Send message as "question"
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`Error: ${errorData.error || 'Unknown error'}`);
      }
    

      const data = await res.json();

      // Ensure the response key is consistent
      return data.answer || data.botMessage || "Sorry, I couldn't get a response."; 
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      return "An error occurred while fetching the response."; 
    }
  }

  async handleResponse(response) {
    // Create a message from the response
    const message = this.createChatBotMessage(response);

    // Update state with the new message
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  }
}

export default ActionProvider;
