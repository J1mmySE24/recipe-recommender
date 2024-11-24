import React, { useState } from "react";
import Chatbot from "react-chatbot-kit";
import config from "./configChatbot.js";
import MessageParser from "./MessageParser.js";
import ActionProvider from "./ActionProvider.js";
import "react-chatbot-kit/build/main.css";
import { Box, Button, Icon, VStack } from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import "./ChatbotComponent.css";

const ChatbotComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box position="fixed" bottom="40px" right="40px" zIndex={1000}>
      {/* Chat Toggle Button */}
      <Button
        onClick={toggleChatbot}
        bg="purple.400"
        color="white"
        borderRadius="full"
        width="60px"
        height="60px"
        boxShadow="lg"
        display="flex"
        justifyContent="center"
        alignItems="center"
        _hover={{ bg: "purple.500" }}
        _active={{ bg: "pruple.600" }}
      >
        <Icon as={ChatIcon} boxSize="6" />
      </Button>

      {/* Chatbot Card */}
      {isOpen && (
        <Box
          mt="10px"
          borderRadius="lg"
          boxShadow="lg"
          overflow="hidden"
          bg="white"
          width="360px"
        >
          <VStack spacing={0} align="stretch">
            <Box p={4}>
              <Chatbot
                config={config}
                messageParser={MessageParser}
                actionProvider={ActionProvider} // Pass class directly
              />
            </Box>
          </VStack>
        </Box>
      )}
    </Box>
  );
};

export default ChatbotComponent;
