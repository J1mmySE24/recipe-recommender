import React, { Component } from "react";
import Select from "react-select";
import {
  HStack,
  Button,
  Input,
  InputGroup,
  Box,
  VStack,
  Text,
  Badge,
  Alert,
  AlertIcon,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import recipeDB from "../apis/recipeDB";

class GroceryListForm extends Component {
  constructor() {
    super();

    this.state = {
      recipeName: "",
      cuisine: null, // Updated to hold the selected option
      dietType: null, // Updated to hold the selected option
      allergens: [],
      allergenInput: "",
      groceryList: [], // Holds generated grocery list
      loading: false,
      error: null,
      cuisineOptions: [], // Options for cuisine dropdown
      dietTypeOptions: [
        { label: "Vegetarian", value: "vegetarian" },
        { label: "Vegan", value: "vegan" },
        { label: "Gluten-Free", value: "gluten-free" },
        { label: "Keto", value: "keto" },
        { label: "Paleo", value: "paleo" },
      ],
    };
  }

  async componentDidMount() {
    try {
      const response = await recipeDB.get("/recipes/callIngredients/");
      this.setState({
        ingredient_list: response.data,
        cuisineOptions: [
          { label: "Mexican", value: "mexican" },
          { label: "South Indian", value: "south-indian" },
          { label: "Chinese", value: "chinese" },
          { label: "Thai", value: "thai" },
          { label: "Japanese", value: "japanese" },
          { label: "Italian", value: "italian" },
          { label: "French", value: "french" },
          { label: "Indian", value: "indian" },
          { label: "American", value: "american" },
          { label: "Mediterranean", value: "mediterranean" },
          { label: "Lebanese", value: "lebanese" },
          { label: "Caribbean", value: "caribbean" },
          { label: "Brazilian", value: "brazilian" },
          { label: "Vietnamese", value: "vietnamese" },
          { label: "Korean", value: "korean" },
          { label: "Greek", value: "greek" },
          { label: "Turkish", value: "turkish" },
          { label: "Spanish", value: "spanish" },
          { label: "Peruvian", value: "peruvian" },
          { label: "Argentinian", value: "argentinian" },
          { label: "Ethiopian", value: "ethiopian" },
          { label: "African", value: "african" },
          { label: "Eastern European", value: "eastern-european" },
          { label: "Central Asian", value: "central-asian" },
          { label: "Scandinavian", value: "scandinavian" },
          { label: "Polish", value: "polish" },
          { label: "Russian", value: "russian" },
          { label: "Portuguese", value: "portuguese" },
          { label: "Swiss", value: "swiss" },
          { label: "Dutch", value: "dutch" },
          { label: "Belgian", value: "belgian" },
          { label: "Irish", value: "irish" },
          { label: "Australian", value: "australian" },
          { label: "New Zealand", value: "new-zealand" },
        ],
      });
    } catch (err) {
      console.log(err);
    }
  }

  // Handle form submission
  handleSubmit = async (event) => {
    event.preventDefault();

    const { recipeName, cuisine, dietType, allergens } = this.state;

    if (!recipeName || !cuisine || !dietType) {
      this.setState({ error: "Please fill in all required fields" });
      return;
    }

    const data = {
      recipeName,
      cuisine: cuisine.value, // Send only the value of the selected cuisine
      dietType: dietType.value, // Send only the value of the selected diet type
      allergens,
    };

    this.setState({ loading: true, error: null });

    try {
      const response = await fetch("http://localhost:5003/api/grocerylist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to generate grocery list");
      }

      const result = await response.json();
      this.setState({ groceryList: result.groceryList, loading: false });
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  };

  render() {
    return (
      <Flex
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
        <Box
          borderRadius="lg"
          border="1px solid"
          borderColor="gray.200"
          boxShadow="lg"
          bg="white"
          width={["90%", "70%", "50%"]}
          p={8}
        >
          <VStack spacing={6} alignItems="stretch">
            <Text
              fontSize="xl"
              fontWeight="bold"
              textAlign="center"
              color="purple.600"
            >
              Generate Grocery List
            </Text>

            {/* Recipe Name */}
            <InputGroup>
              <Input
                type="text"
                name="recipeName"
                value={this.state.recipeName}
                placeholder="Enter Recipe Name"
                onChange={(e) => this.setState({ recipeName: e.target.value })}
                bg="gray.100"
                borderColor="gray.300"
                _hover={{ borderColor: "purple.400" }}
                _focus={{ borderColor: "purple.500", bg: "white" }}
              />
            </InputGroup>

            {/* Cuisine Typeahead */}
            <Box>
              <Text fontWeight="semibold" mb={2}>
                Cuisine
              </Text>
              <Select
                options={this.state.cuisineOptions}
                value={this.state.cuisine}
                onChange={(selectedOption) =>
                  this.setState({ cuisine: selectedOption })
                }
                placeholder="Select a Cuisine"
                styles={{
                  container: (provided) => ({
                    ...provided,
                    width: "100%",
                  }),
                }}
              />
            </Box>

            {/* Diet Type Typeahead */}
            <Box>
              <Text fontWeight="semibold" mb={2}>
                Diet Type
              </Text>
              <Select
                options={this.state.dietTypeOptions}
                value={this.state.dietType}
                onChange={(selectedOption) =>
                  this.setState({ dietType: selectedOption })
                }
                placeholder="Select a Diet Type"
                styles={{
                  container: (provided) => ({
                    ...provided,
                    width: "100%",
                  }),
                }}
              />
            </Box>

            {/* Allergens */}
            <Box>
              <Text fontWeight="semibold" mb={2}>
                Allergens
              </Text>
              <HStack>
                <Input
                  type="text"
                  name="allergenInput"
                  value={this.state.allergenInput}
                  placeholder="Add Allergen"
                  onChange={(e) =>
                    this.setState({ allergenInput: e.target.value })
                  }
                  bg="gray.100"
                  borderColor="gray.300"
                  _hover={{ borderColor: "purple.400" }}
                  _focus={{ borderColor: "purple.500", bg: "white" }}
                />
                <Button
                  colorScheme="purple"
                  onClick={() => {
                    this.setState({
                      allergens: [
                        ...this.state.allergens,
                        this.state.allergenInput,
                      ],
                      allergenInput: "",
                    });
                  }}
                >
                  Add
                </Button>
              </HStack>
              <HStack mt={2} wrap="wrap" spacing={2}>
                {this.state.allergens.map((allergen, idx) => (
                  <Badge key={idx} colorScheme="purple">
                    {allergen}
                  </Badge>
                ))}
              </HStack>
            </Box>

            {/* Error Handling */}
            {this.state.error && (
              <Alert status="error" borderRadius="md">
                <AlertIcon />
                {this.state.error}
              </Alert>
            )}

            {/* Submit Button */}
            <Button
              isLoading={this.state.loading}
              loadingText="Generating List"
              colorScheme="purple"
              onClick={this.handleSubmit}
              width="100%"
            >
              Generate List
            </Button>

            {/* Display Generated Grocery List */}
            {this.state.groceryList.length > 0 && (
              <Box bg="gray.100" borderRadius="md" p={4} mt={4}>
                <Text fontWeight="bold" mb={2}>
                  Grocery List:
                </Text>
                <VStack align="stretch" spacing={2}>
                  {this.state.groceryList.map((grocery, idx) => (
                    <Box
                      key={idx}
                      bg="white"
                      p={3}
                      borderRadius="md"
                      boxShadow="sm"
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Text>{grocery.item}</Text>
                      <Text>{grocery.unit}</Text>
                    </Box>
                  ))}
                </VStack>
                <Button
                  colorScheme="purple"
                  mt={4}
                  width="100%"
                  onClick={() => {
                    const fileContent = this.state.groceryList
                      .map((grocery) => `${grocery.item} - ${grocery.unit}}`)
                      .join("\n");
                    const blob = new Blob([fileContent], {
                      type: "text/plain",
                    });
                    const link = document.createElement("a");
                    link.href = window.URL.createObjectURL(blob);
                    link.download = "grocery_list.txt";
                    link.click();
                  }}
                >
                  Download Grocery List
                </Button>
              </Box>
            )}
          </VStack>
        </Box>
      </Flex>
    );
  }
}
export default GroceryListForm;
