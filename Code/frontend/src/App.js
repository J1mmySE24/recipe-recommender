//
import Form from "./components/Form.js";
import Header from "./components/Header";
import recipeDB from "./apis/recipeDB";
import RecipeList from "./components/RecipeList";
import AddRecipe from "./components/AddRecipe.js";
import React, { Component } from "react";
import {
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Box,
  VStack,
} from "@chakra-ui/react";
import RecipeLoading from "./components/RecipeLoading.js";
import Nav from "./components/Navbar.js";
import SearchByRecipe from "./components/SearchByRecipe.js";
import Login from "./components/Login.js";
import UserProfile from "./components/UserProfile.js";
import ChatbotComponent from "./components/chatbot.js";
import GroceryListGenerator from "./components/GroceryList.js";
import Calendar from "./components/Calendar.js";
import Share from "./components/Share.js";
import NutrionAnalyse from "./components/NutritionAnalyse.js";
// Main component of the project
class App extends Component {
  // constructor for the App Component
  constructor() {
    super();

    this.state = {
      cuisine: "",
      ingredients: new Set(),
      recipeList: [],
      recipeByNameList: [],
      email: "",
      cookingTime: "",
      flag: false,
      isLoading: false,
      isLoggedIn: false,
      isProfileView: false,
      userData: {},
    };
  }

  handleBookMarks = () => {
    this.setState({
      isProfileView: true,
    });
  };

  handleProfileView = () => {
    this.setState({
      isProfileView: false,
    });
  };

  handleSignup = async (userName, password) => {
    try {
      const response = await recipeDB.post("/recipes/signup", {
        userName,
        password,
      });
      console.log(response.data);
      if (response.data.success) {
        alert("Successfully Signed up!");
        this.setState({
          isLoggedIn: true,
          userData: response.data.user,
        });
        localStorage.setItem("userName", response.data.user.userName);
        console.log(response.data.user);
      } else {
        alert("User already exists");
      }
    } catch (err) {
      console.log(err);
    }
  };

  handleLogin = async (userName, password) => {
    try {
      const response = await recipeDB.get("/recipes/login", {
        params: {
          userName,
          password,
        },
      });
      console.log(response.data);
      if (response.data.success) {
        this.setState({
          isLoggedIn: true,
          userData: response.data.user,
        });
        localStorage.setItem("userName", response.data.user.userName);
        console.log(response.data.user);
        alert("Successfully logged in!");
      } else {
        console.log("Credentials are incorrect");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Function to get the user input from the Form component on Submit action
  handleSubmit = async (formDict) => {
    this.setState({
      isLoading: true,
    });
    console.log(formDict);
    this.setState({
      ingredients: formDict["ingredient"],
      cuisine: formDict["cuisine"],
      email: formDict["email_id"],
      cookingTime: formDict["cooking_time"],
      flag: formDict["flag"],
      dietType: formDict["diet_type"], // Update for diet type
    });

    const mail = formDict["email_id"];
    const flag = formDict["flag"];
    const items = Array.from(formDict["ingredient"]);
    const cuis = formDict["cuisine"];
    const cookingTime = formDict["cooking_time"];
    const dietType = formDict["diet_type"]; // Update for diet type
    this.getRecipeDetails(items, cuis, mail, flag, cookingTime, dietType); // Update to include diet type
  };

  handleRecipesByName = (recipeName, cookingTime) => {
    this.setState({
      isLoading: true,
    });
    recipeDB
      .get("/recipes/getRecipeByName", {
        params: {
          recipeName: recipeName,
          TotalTimeInMins: cookingTime,
        },
      })
      .then((res) => {
        console.log(res.data);
        this.setState({
          recipeByNameList: res.data.recipes,
          isLoading: false,
        });
      });
  };

  getRecipeDetails = async (
    ingredient,
    cuis,
    mail,
    flag,
    cookingTime,
    dietType,
  ) => {
    // Update to include diet type
    try {
      const response = await recipeDB.get("/recipes", {
        params: {
          CleanedIngredients: ingredient,
          Cuisine: cuis,
          Email: mail,
          Flag: flag,
          TotalTimeInMins: cookingTime,
        },
      });
      this.setState({
        recipeList: response.data.recipes,
        isLoading: false,
      });
    } catch (err) {
      console.log(err);
    }
  };

  handleLogout = () => {
    console.log("logged out");
    this.setState({
      isLoggedIn: false,
    });
  };

  render() {
    return (
      <div>
        {this.state.isLoggedIn ? (
          <>
            <Nav
              handleLogout={this.handleLogout}
              handleBookMarks={this.handleBookMarks}
              user={this.state.userData}
            />
            {this.state.isProfileView ? (
              <UserProfile
                handleProfileView={this.handleProfileView}
                user={this.state.userData}
              />
            ) : (
              <Tabs variant="soft-rounded" colorScheme="purple">
                <TabList ml={10}>
                  <Tab>Search Recipe</Tab>
                  <Tab>Add Recipe</Tab>
                  <Tab>Search Recipe By Name</Tab>
                  <Tab>Generate Grocery List</Tab>
                  <Tab>Nutritious?</Tab>
                  <Tab>Calendar</Tab>
                  <Tab>Share it</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <Box display="flex">
                      <Form sendFormData={this.handleSubmit} />
                      {this.state.isLoading ? (
                        <RecipeLoading />
                      ) : (
                        <RecipeList recipes={this.state.recipeList} />
                      )}
                    </Box>
                  </TabPanel>
                  <TabPanel>
                    <AddRecipe />
                  </TabPanel>
                  <TabPanel>
                    <Box
                      minH="100vh"
                      bgImage="url('/assets/back.jpg')" // Update this with your background image path
                      bgSize="cover"
                      bgPosition="center"
                      bgRepeat="no-repeat"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      p={6}
                    >
                      <VStack spacing={6} align="stretch">
                        {/* Search By Recipe */}
                        <SearchByRecipe
                          sendRecipeData={this.handleRecipesByName}
                        />

                        {/* Loading or Recipe List */}
                        {this.state.isLoading ? (
                          <RecipeLoading />
                        ) : (
                          <RecipeList recipes={this.state.recipeByNameList} />
                        )}
                      </VStack>
                    </Box>
                  </TabPanel>
                  <TabPanel>
                    <GroceryListGenerator />
                  </TabPanel>
                  <TabPanel>
                    <NutrionAnalyse />
                  </TabPanel>
                  <TabPanel>
                    <Calendar />
                  </TabPanel>
                  <TabPanel>
                    <Share />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            )}
            <ChatbotComponent />
          </>
        ) : (
          <Login
            handleSignup={this.handleSignup}
            handleLogin={this.handleLogin}
          />
        )}
        {/* handleSubmit function is being sent as a prop to the form component*/}

        {/* RecipeList is the component where results are displayed.
        App's recipeList state item is being sent as a prop
        */}
      </div>
    );
  }
}

export default App;
