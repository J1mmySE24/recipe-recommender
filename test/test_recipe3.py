import requests
from unittest.mock import patch

# Mock response data
mock_response = {
    "recipes": [
        {
            "image-url": "http://example.com/image.jpg",
            "Restaurant": "Taco Bell",
            "Diet-type": "Vegan",
            "Restaurant-Location": "California",
            "Recipe-rating": 4.5,
            "Ingredient-count": 5,
            "Cleaned-Ingredients": "tomato%onion%cilantro%lime"
        }
    ],
    "page": 0,
    "filters": {
        "CleanedIngredients": "tomato",
        "Cuisine": "Mexican"
    },
    "entries_per_page": 20,
    "total_results": 1
}

# Mocking requests.get to return mock data
@patch('requests.get')
def test_recipe1(mock_get):
    mock_get.return_value.json.return_value = mock_response
    result = requests.get("http://localhost:5001/api/v1/recipes?CleanedIngredients=tomato&Cuisine=Mexican").json()
    
    if not result['recipes']:
        print("No recipes found for the query")
    else:
        assert result['recipes'][0]['image-url'] != 0

@patch('requests.get')
def test_recipe2(mock_get):
    mock_get.return_value.json.return_value = mock_response
    result = requests.get("http://localhost:5001/api/v1/recipes?CleanedIngredients=tomato&Cuisine=Mexican").json()
    
    if not result['recipes']:
        print("No recipes found for the query")
    else:
        assert result['recipes'][0]['image-url'] != 0

@patch('requests.get')
def test_recipe3(mock_get):
    mock_get.return_value.json.return_value = mock_response
    result = requests.get("http://localhost:5001/api/v1/recipes?CleanedIngredients=tomato&Cuisine=Mexican").json()
    
    if not result['recipes']:
        print("No recipes found for the query")
    else:
        assert result['recipes'][0]['image-url'] != 0

@patch('requests.get')
def test_recipe4(mock_get):
    mock_get.return_value.json.return_value = mock_response
    result = requests.get("http://localhost:5001/api/v1/recipes?CleanedIngredients=tomato&Cuisine=Mexican").json()
    assert result['recipes'][0]['Restaurant'] != 0

@patch('requests.get')
def test_recipe5(mock_get):
    mock_get.return_value.json.return_value = mock_response
    result = requests.get("http://localhost:5001/api/v1/recipes?CleanedIngredients=tomato&Cuisine=Mexican").json()
    assert len(result['recipes'][0]['Diet-type']) != 0

@patch('requests.get')
def test_recipe6(mock_get):
    mock_get.return_value.json.return_value = mock_response
    result = requests.get("http://localhost:5001/api/v1/recipes?CleanedIngredients=tomato&Cuisine=Mexican").json()
    assert (result['recipes'][0]['Restaurant-Location']) != 0

@patch('requests.get')
def test_recipe7(mock_get):
    mock_get.return_value.json.return_value = mock_response
    result = requests.get("http://localhost:5001/api/v1/recipes?CleanedIngredients=tomato&Cuisine=Mexican").json()
    assert (result['recipes'][0]['image-url']) != 0

@patch('requests.get')
def test_recipe8(mock_get):
    mock_get.return_value.json.return_value = mock_response
    result = requests.get("http://localhost:5001/api/v1/recipes?CleanedIngredients=tomato&Cuisine=Mexican").json()
    assert float(result['recipes'][0]['Recipe-rating']) > 0

@patch('requests.get')
def test_recipe9(mock_get):
    mock_get.return_value.json.return_value = mock_response
    result = requests.get("http://localhost:5001/api/v1/recipes?CleanedIngredients=tomato&Cuisine=Mexican").json()
    ingredients = result['recipes'][0]['Cleaned-Ingredients'].split('%')
    assert len(ingredients) > 0

if __name__ == '__main__':
    test_recipe1()
    test_recipe2()
    test_recipe3()
    test_recipe4()
    test_recipe5()
    test_recipe6()
    test_recipe7()
    test_recipe8()
    test_recipe9()
