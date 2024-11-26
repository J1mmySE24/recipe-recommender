import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Image,
  Text,
  VStack,
  Spinner,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";

const NutritionAnalyse = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      setResponse({ error: "Please select an image first." });
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    setIsLoading(true);
    setResponse(null);

    try {
      const res = await fetch("http://localhost:5003/api/image-analysis", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to upload the image.");
      }

      const data = await res.json();
      setResponse(data); // Set raw response data for processing
    } catch (error) {
      console.error("Error:", error.message);
      setResponse({ error: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const renderResponse = () => {
    if (!response) return null;

    if (response.error) {
      return <Text color="red.500">{response.error}</Text>;
    }

    if (response.analysis) {
      // Parse the response text into lines and create a structured list
      const lines = response.analysis.split("\n").filter((line) => line.trim());

      return (
        <Box mt={4} p={4} bg="gray.50" borderRadius="md" boxShadow="md">
          <Text fontWeight="bold" mb={2}>
            Analysis:
          </Text>
          <UnorderedList spacing={2}>
            {lines.map((line, index) => (
              <ListItem key={index}>{line}</ListItem>
            ))}
          </UnorderedList>
        </Box>
      );
    }

    return <Text color="gray.500">No analysis available.</Text>;
  };

  return (
    <Box
      maxW="500px"
      mx="auto"
      mt={8}
      p={6}
      boxShadow="lg"
      borderRadius="lg"
      bg="white"
    >
      <VStack spacing={4} align="stretch">
        <Text
          fontSize="xl"
          fontWeight="bold"
          textAlign="center"
          color="purple.600"
        >
          How healthy do you eat?
        </Text>
        <FormControl>
          <FormLabel htmlFor="image">
            Upload an image of nutrition facts/ingredient list
          </FormLabel>
          <Input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleFileChange}
          />
        </FormControl>

        {/* Image Preview */}
        {preview && (
          <Image
            src={preview}
            alt="Preview"
            maxH="200px"
            objectFit="contain"
            borderRadius="md"
          />
        )}

        <Button
          colorScheme="purple"
          onClick={handleSubmit}
          isLoading={isLoading}
        >
          Upload
        </Button>

        {/* Render Response */}
        {isLoading ? <Spinner size="lg" /> : response && renderResponse()}
      </VStack>
    </Box>
  );
};

export default NutritionAnalyse;
