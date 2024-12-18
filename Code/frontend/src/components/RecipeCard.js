import React from "react";
import {
  Card,
  CardHeader,
  Heading,
  Text,
  CardBody,
  Image,
  Tag,
} from "@chakra-ui/react";
import recipeDB from "../apis/recipeDB";

const RecipeCard = (props) => {
  const handleClick = () => {
    props.handler(props.recipe);
  };
  const handleSave = () => {
    console.log("saved");
    var userName = localStorage.getItem("userName");
    try {
      const response = recipeDB.post("/recipes/addRecipeToProfile", {
        userName: userName,
        recipe: props.recipe,
      });
      alert("Recipe saved to your profile!");
    } catch (e) {
      console.log(`Error adding recipe to user-${userName}`);
      console.log("caught exception");
    }
  };
  return (
    <>
      <Card
        data-testid="recipeCard"
        _hover={{
          transform: "scale(1.05)",
          bg: "purple.100",
          transitionDuration: "4",
          cursor: "pointer",
        }}
      >
        <CardHeader onClick={handleClick}>
          <Heading data-testid="recipeName" size="md">
            {props.recipe.TranslatedRecipeName}
          </Heading>
        </CardHeader>
        <CardBody>
          <Text data-testid="time">
            Cooking Time: {props.recipe.TotalTimeInMins} mins{" "}
          </Text>
          <Text data-testid="time">
            Cooking Time: {props.recipe.TotalTimeInMins} mins
          </Text>
          <Text data-testid="rating">
            Rating: {props.recipe["Recipe-rating"]}
          </Text>
          <Text data-testid="diet">Diet Type: {props.recipe["Diet-type"]}</Text>
          <Tag
            onClick={handleSave}
            _hover={{ bg: "#553c9ad1" }}
            ml={"160px"}
            bg={"#553c9a"}
            color={"white"}
          >
            Save Recipe
          </Tag>
        </CardBody>
        <Image
          data-testid="recipeImg"
          objectFit="cover"
          src={props.recipe["image-url"]}
          width={"90%"}
          height={"50%"}
          m={"auto"}
          mb="2"
        />
      </Card>
    </>
  );
};

export default RecipeCard;
