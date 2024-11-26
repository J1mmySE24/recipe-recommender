/* MIT License

Copyright (c) 2023 Pannaga Rao, Harshitha, Prathima, Karthik 
*/

import {
  Box,
  Input,
  InputGroup,
  Button,
  Heading,
  VStack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

const SearchByRecipe = (props) => {
  const [recipeName, setRecipeName] = useState("");
  const [cookingTime, setCookingTime] = useState("");

  const handleNameChange = (e) => {
    e.preventDefault();
    setRecipeName(e.target.value);
  };

  const handleCookingTimeChange = (e) => {
    e.preventDefault();
    setCookingTime(e.target.value);
  };

  const handleSearchByRecipeClick = (e) => {
    e.preventDefault();
    props.sendRecipeData(recipeName, cookingTime);
  };

  return (
    <Box
      bg="whiteAlpha.900"
      borderRadius="lg"
      boxShadow="2xl"
      p={8}
      maxW="500px"
      width="100%"
      textAlign="center"
    >
      <Heading as="h1" size="lg" color="purple.800" mb={4}>
        Search Recipes
      </Heading>
      <Text mb={6} color="gray.600">
        Find delicious recipes quickly. Enter the recipe name and maximum
        cooking time to get started!
      </Text>
      <VStack spacing={4} align="stretch">
        {/* Recipe Name Input */}
        <InputGroup>
          <Input
            placeholder="Enter Recipe Name"
            onChange={handleNameChange}
            focusBorderColor="purple.500"
          />
        </InputGroup>

        {/* Cooking Time Input */}
        <InputGroup>
          <Input
            type="number"
            placeholder="Max Cooking Time (mins)"
            onChange={handleCookingTimeChange}
            focusBorderColor="purple.500"
          />
        </InputGroup>

        {/* Search Button */}
        <Button
          colorScheme="purple"
          onClick={handleSearchByRecipeClick}
          width="100%"
        >
          Search
        </Button>
      </VStack>
    </Box>
  );
};

export default SearchByRecipe;
