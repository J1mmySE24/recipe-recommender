/* MIT License

Copyright (c) 2023 Pannaga Rao, Harshitha, Prathima, Karthik  
Modified by 2024 Krisha Patel, Shreyas Devraj, Jinming Xing */

import { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  FormHelperText,
  Flex,
  Center,
  Heading,
  Stack,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const Login = ({ handleLogin, handleSignup }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateInputs = () => {
    if (!userName || !password) {
      setError("Both fields are required.");
      return false;
    }
    setError("");
    return true;
  };

  const handleUserName = (e) => {
    setUserName(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginClick = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    setIsLoading(true);
    try {
      await handleLogin(userName, password); // Simulated async operation
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupClick = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    setIsLoading(true);
    try {
      await handleSignup(userName, password); // Simulated async operation
    } catch (err) {
      setError("Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Center h="100vh" bg="gray.100">
      <Box
        w="100%"
        maxW="400px"
        p={6}
        boxShadow="lg"
        bg="purple.50"
        borderRadius="lg"
      >
        {/* Website Name */}
        <Stack spacing={2} align="center" mb={6}>
          <Heading as="h1" size="lg" color="purple.800">
            Saveurs Sélection
          </Heading>
        </Stack>

        {/* Login Form */}
        <Heading as="h2" size="md" textAlign="center" mb={4}>
          Log In
        </Heading>

        <FormControl isInvalid={!!error} mb={4}>
          <FormLabel htmlFor="username">User Name</FormLabel>
          <Input
            id="username"
            placeholder="Enter your username"
            onChange={handleUserName}
            value={userName}
            aria-label="User Name"
          />
        </FormControl>

        <FormControl isInvalid={!!error} mb={4}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <InputGroup>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              pr="4.5rem" // Add padding-right to make space for the InputRightElement
              onChange={handlePassword}
              value={password}
            />
            <InputRightElement>
              <IconButton
                aria-label="Toggle password visibility"
                icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                onClick={() => setShowPassword(!showPassword)}
                variant="link"
                size="sm"
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>

        {error && (
          <Text mt={2} color="red.500" fontSize="sm">
            {error}
          </Text>
        )}

        {/* Buttons */}
        <Flex direction="column" align="center" mt={6}>
          <Button
            onClick={handleSignupClick}
            colorScheme="purple"
            bg="#8A4EFF"
            mb={3}
            isLoading={isLoading}
            width="100%"
          >
            Sign Up
          </Button>
          <Button
            onClick={handleLoginClick}
            colorScheme="purple"
            bg="#6E23FF"
            isLoading={isLoading}
            width="100%"
          >
            Log In
          </Button>
        </Flex>
      </Box>
    </Center>
  );
};

export default Login;
