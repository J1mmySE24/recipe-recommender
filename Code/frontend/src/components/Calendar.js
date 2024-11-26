import React, { useState } from "react";
import {
  Box,
  Heading,
  VStack,
  Input,
  Textarea,
  Button,
  Text,
  UnorderedList,
  ListItem,
  Flex,
} from "@chakra-ui/react";

const Calendar = () => {
  const [sessions, setSessions] = useState([]);
  const [newSession, setNewSession] = useState({
    title: "",
    date: "",
    time: "",
    notes: "",
  });

  // Function to add a new session
  const handleAddSession = () => {
    if (newSession.title && newSession.date && newSession.time) {
      setSessions([...sessions, { ...newSession, id: Date.now() }]);
      setNewSession({ title: "", date: "", time: "", notes: "" });
    }
  };

  // Function to delete a session
  const handleDeleteSession = (id) => {
    setSessions(sessions.filter((session) => session.id !== id));
  };

  return (
    <Flex
      align="center"
      justify="center"
      minH="100vh"
      bgImage="url('/assets/back.jpg')"
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      p={4}
    >
      <Box
        maxW="600px"
        w="100%"
        p={8}
        boxShadow="lg"
        bg="white"
        borderRadius="md"
      >
        <Heading as="h1" size="lg" textAlign="center" color="purple.800" mb={6}>
          Schedule a New Meal Plan
        </Heading>

        {/* Form */}
        <VStack spacing={4} align="stretch" mb={8}>
          <Input
            placeholder="Title"
            value={newSession.title}
            onChange={(e) =>
              setNewSession({ ...newSession, title: e.target.value })
            }
            size="md"
            focusBorderColor="purple.500"
          />
          <Input
            type="date"
            value={newSession.date}
            onChange={(e) =>
              setNewSession({ ...newSession, date: e.target.value })
            }
            size="md"
            focusBorderColor="purple.500"
          />
          <Input
            type="time"
            value={newSession.time}
            onChange={(e) =>
              setNewSession({ ...newSession, time: e.target.value })
            }
            size="md"
            focusBorderColor="purple.500"
          />
          <Textarea
            placeholder="Notes"
            value={newSession.notes}
            onChange={(e) =>
              setNewSession({ ...newSession, notes: e.target.value })
            }
            size="md"
            focusBorderColor="purple.500"
          />
          <Button onClick={handleAddSession} colorScheme="purple" width="100%">
            Add Meal Plan
          </Button>
        </VStack>

        {/* Scheduled Meal Plans */}
        <Heading as="h2" size="md" textAlign="center" color="purple.800" mb={4}>
          Scheduled Meal Plans
        </Heading>

        <UnorderedList spacing={4} styleType="none">
          {sessions.map((session) => (
            <ListItem
              key={session.id}
              p={4}
              bg="purple.100"
              borderRadius="md"
              boxShadow="sm"
            >
              <Text fontWeight="bold">{session.title}</Text>
              <Text>Date: {session.date}</Text>
              <Text>Time: {session.time}</Text>
              <Text>Notes: {session.notes}</Text>
              <Button
                onClick={() => handleDeleteSession(session.id)}
                colorScheme="red"
                size="sm"
                mt={2}
              >
                Delete
              </Button>
            </ListItem>
          ))}
        </UnorderedList>
      </Box>
    </Flex>
  );
};

export default Calendar;
