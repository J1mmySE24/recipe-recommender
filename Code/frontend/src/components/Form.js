import React, { Component } from "react";
import {
  HStack,
  Button,
  Input,
  InputGroup,
  Switch,
  Box,
  VStack,
  Text,
  InputRightElement,
  FormLabel,
  Badge,
} from "@chakra-ui/react";
import recipeDB from "../apis/recipeDB";
import TypeAheadDropDown from "./TypeAheadDropDown";

// Form component to maintain input form
class Form extends Component {
  constructor() {
    super();

    this.state = {
      ingredients: new Set(),
      cuisineState: 0,
      cuisine: "",
      cookingTime: "",
      dietType: "Vegan", // Default diet type
    };
  }

  async componentDidMount() {
    try {
      const response = await recipeDB.get("/recipes/callIngredients/");
      this.setState({
        ingredient_list: response.data,
        cuisine_list: [
          "Mexican",
          "South Indian",
          "Chinese",
          "Thai",
          "Japanese",
          "Gujarati",
          "North Indian",
          "Lebanese",
          "Mediterranean",
          "Middle East",
          "Italian",
          "Korean",
          "Continental",
          "Greek",
          "Latin",
          "American",
          "Other",
          "Swedish",
          "Latvian",
          "Italian",
          "Spanish",
          "American",
          "Scottish",
          "British",
          "Thai",
          "Japanese",
          "Indian",
          "Canadian",
          "Russian",
          "Jewish",
          "Polish",
          "German",
          "French",
          "Hawaiian",
          "Brazilian",
          "Peruvian",
          "Cuban",
          "Tibetian",
          "Salvadorian",
          "Egyptian",
          "Greek",
          "Belgian",
          "Irish",
          "Welsh",
          "Mormon",
          "Cajun",
          "Portugese",
          "Turkish",
          "Haitian",
          "Tahitian",
          "Kenyan",
          "Korean",
          "Algerian",
          "Nigerian",
          "Libyan",
        ],
      });
    } catch (err) {
      console.log(err);
    }
  }

  handleCookingTimeChange = (event) => {
    this.setState({ cookingTime: event.target.value });
  };

  handleDietTypeChange = (event) => {
    this.setState({ dietType: event.target.value });
  };

  printHander = () => {
    const items = [...this.state.ingredients];
    const list_items = items.map((item) => (
      <Badge
        id={item}
        m={1}
        _hover={{ cursor: "pointer" }}
        onClick={this.removeHandler}
        colorScheme="purple"
      >
        {item}
      </Badge>
    ));
    return <ul className="addedIngredientList">{list_items}</ul>;
  };

  addHandler = (event) => {
    const ingredient = document.getElementById("ingredient").value;
    this.setState(
      {
        ingredients: new Set(this.state.ingredients).add(ingredient),
      },
      () => console.log(this.state),
    );
    document.getElementById("ingredient").value = "";
  };

  removeHandler = (event) => {
    console.log("clicked tag");
    var discardIngredient = event.target.id;
    var ingredientList = this.state.ingredients;
    ingredientList.delete(discardIngredient);
    this.setState(
      {
        ingredients: ingredientList,
      },
      () => console.log(this.state),
    );
  };

  handleSendEmail = (event) => {
    console.log(event.target.checked);
  };

  handleSubmit = (event) => {
    this.setState(
      {
        cuisine: document.getElementById("cuisine").value,
      },
      () => console.log(this.state),
    );

    event.preventDefault();
    var dict = {};
    dict["ingredient"] = this.state.ingredients;
    dict["cuisine"] = document.getElementById("cuisine").value;
    dict["diet_type"] = this.state.dietType; // Add diet type to the dict
    dict["email_id"] = document.getElementById("email_id").value;
    dict["flag"] = document.getElementById("Send_email").checked;
    dict["cookingTime"] = this.state.cookingTime;
    this.props.sendFormData(dict);
    console.log(dict);
    document.getElementById("cuisine").value = "";
    document.getElementById("email_id").value = "";
    this.setState({ cookingTime: "" });
  };

  // render function dispays the UI content i.e the form content
  render() {
    {
      /* const cuisine_list = [ "Any", "Swedish", "Latvian", "Italian",
        "Spanish", "American","Scottish","British","Thai","Japanese",
        "Indian","Canadian","Russian","Jewish","Polish","German","French","Hawaiian",
        "Brazilian", "Peruvian","Cuban","Tibetian","Salvadorian","Egyptian","Greek",
        "Belgian","Irish","Welsh","Mormon","Cajun","Portugese","Turkish","Haitian",
    "Tahitian","Kenyan","Korean","Algerian","Nigerian","Libyan" ]*/
    }

    // returns jsx element
    return (
      <>
        <Box
          borderRadius={"lg"}
          border="2px"
          boxShadow={"lg"}
          borderColor={"gray.100"}
          fontFamily="regular"
          m={10}
          width={"23%"}
          height="fit-content"
          p={5}
        >
          <VStack spacing={"5"} alignItems={"flex-start"}>
            <Text fontSize={"larger"} fontWeight={"semibold"}>
              Get A Recipe
            </Text>
            <InputGroup variant={"filled"} zIndex={+2}>
              {/* <InputLeftElement pointerEvents='none'>
                            <FontAwesomeIcon size="lg" icon={faLocationDot} />
                        </InputLeftElement> */}
              <TypeAheadDropDown
                iteams={this.state.ingredient_list}
                placeholder_inp={"  Ingredients"}
                id_inp={"ingredient"}
              />
              {/* <Input size={"lg"} type='text' id="ingredient" placeholder='Ingredients'/> */}
              <InputRightElement>
                <Button mt={2} mr={2} onClick={this.addHandler}>
                  Add
                </Button>
              </InputRightElement>
            </InputGroup>
            <HStack direction="row">{this.printHander()}</HStack>
            <InputGroup variant={"filled"} zIndex={+1}>
              {/* <InputLeftElement pointerEvents='none'>
                            <FontAwesomeIcon size="lg" icon={faCalendarDays} />
                            </InputLeftElement> */}
              <TypeAheadDropDown
                iteams={this.state.cuisine_list}
                placeholder_inp={"  Cuisine"}
                id_inp={"cuisine"}
              />

              {/* <Input type="text" id="cuisine" color={"gray.500"} size={"lg"} placeholder='Cuisine' /> */}
            </InputGroup>
            <InputGroup variant={"filled"}>
              <Input
                data-testid="email_id"
                type="text"
                id="email_id"
                color={"gray.500"}
                size={"lg"}
                placeholder="Email"
              />
            </InputGroup>
            <InputGroup variant={"filled"}>
              {/* <InputLeftElement pointerEvents='none'>
                            <FontAwesomeIcon size="lg" icon={faClock} />
                            </InputLeftElement> */}
              {/* <Select textAlign={"left"} size={"lg"} color={"gray.500"} variant={"filled"} placeholder="Time" >
                            <option value='option1'>Option 1</option>
                            <option value='option2'>Option 2</option>
                            <option value='option3'>Option 3</option>
                        </Select> */}
              <Input
                data-testid="email_id"
                type="text"
                id="email_id"
                color={"gray.500"}
                size={"lg"}
                placeholder="Email"
              />
            </InputGroup>
            <InputGroup variant={"filled"}>
              <FormLabel htmlFor="email-alerts" mb="0">
                Enable email alert?
                <Switch ml={2} id="Send_email" name="email" size="md" />
              </FormLabel>
            </InputGroup>

            <Button
              data-testid="submit"
              id="submit"
              onClick={this.handleSubmit}
              width={"100%"}
              _hover={{ bg: "purple.700", color: "white" }}
              color={"white"}
              bg={"purple.700"}
            >
              Search Recipes
            </Button>
          </VStack>
        </Box>
      </>
    );
  }
}
export default Form;
