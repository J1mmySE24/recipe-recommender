/* MIT License

Copyright (c) 2023 Pannaga Rao, Harshitha, Prathima, Karthik  
Modified by 2024 Krisha Patel, Shreyas Devraj, Jinming Xing */

import { useState, React } from "react";
import {
  Box,
  Stack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Text,
  Flex,
  Button,
  Image,
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
    <Box
      minH="100vh"
      bgImage="url('/assets/back.jpg')" 
      // bgImage="linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/assets/back.jpg')"
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={6}
    >
      {/* Content */}
      <Box
        w="100%"
        maxW="800px"
        bg="white"
        boxShadow="2xl"
        borderRadius="lg"
        p={8}
      >
        {/* Title */}
        <Stack spacing={4} align="center" mb={12}>
          <Heading as="h1" size="2xl" color="purple.800" fontFamily={"fantasy"}>
            Saveurs Sélection
          </Heading>
        </Stack>

        {/* Main Content */}
        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="center"
          gap={8}
        >
          {/* Illustration */}
          <Box flex="1" display="flex" justifyContent="center">
            <Image
              src="/assets/landing.jpg" // Replace with your illustration path
              alt="Illustration"
              maxW={{ base: "200px", md: "300px", lg: "400px" }}
              objectFit="cover"
            />
          </Box>

          {/* Login Form */}
          <Box
            flex="1"
            maxW="400px"
            w="100%"
            p={6}
            bg="whiteAlpha.100"
            boxShadow="md"
            borderRadius="md"
          >
            <Heading as="h2" size="md" textAlign="center" mb={4}>
              Log In
            </Heading>

            <FormControl isInvalid={!!error} mb={4}>
              <FormLabel htmlFor="username">Username</FormLabel>
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
                  pr="4.5rem"
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
                onClick={handleLoginClick}
                colorScheme="purple"
                bg="#6E23FF"
                mb={3}
                isLoading={isLoading}
                width="100%"
              >
                Log In
              </Button>
              <Button
                onClick={handleSignupClick}
                colorScheme="purple"
                bg="#8A4EFF"
                
                isLoading={isLoading}
                width="100%"
              >
                Sign Up
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Login;
