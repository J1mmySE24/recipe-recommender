import React, { useState } from "react";
import {
  Box,
  Heading,
  Textarea,
  Button,
  VStack,
  HStack,
  useToast,
} from "@chakra-ui/react";

const Share = () => {
  const [thought, setThought] = useState("");
  const toast = useToast();

  const handleShare = (platform) => {
    const url = encodeURIComponent(thought);
    let shareUrl = "";

    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${url}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}`;
        break;
      default:
        break;
    }

    if (!thought) {
      toast({
        title: "Input required",
        description: "Please enter your thoughts before sharing.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    window.open(shareUrl, "_blank");
  };

  return (
    <Box
      minH="100vh"
      bgImage="url('/assets/back.jpg')"
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      display="flex"
      alignItems="center"
      justifyContent="center" // Ensures horizontal and vertical centering
    >
      <Box
        maxW="600px"
        mx="auto"
        p={8}
        boxShadow="md"
        bg="white"
        borderRadius="md"
        textAlign="center"
      >
        <Heading as="h1" size="lg" color="purple.800" mb={6}>
          Share Your Meal Thoughts
        </Heading>
        <VStack spacing={4}>
          <Textarea
            placeholder="What's on your mind?"
            value={thought}
            onChange={(e) => setThought(e.target.value)}
            focusBorderColor="purple.500"
            size="md"
          />
          <HStack spacing={4} justify="center">
            <Button
              colorScheme="purple"
              onClick={() => handleShare("twitter")}
              flex="1"
            >
              Share on Twitter
            </Button>
            <Button
              colorScheme="purple"
              onClick={() => handleShare("facebook")}
              flex="1"
            >
              Share on Facebook
            </Button>
            <Button
              colorScheme="purple"
              onClick={() => handleShare("linkedin")}
              flex="1"
            >
              Share on LinkedIn
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default Share;
