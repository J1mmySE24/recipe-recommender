import requests

def test_recipe1() :
    result = requests.get("http://localhost:5001/api/v1/recipes?CleanedIngredients=tomato&Cuisine=Mexican").json()
    assert len(result['recipes']) != 0

def test_recipe2() :
    result = requests.get("http://localhost:5001/api/v1/recipes?CleanedIngredients=tomato&Cuisine=Mexican").json()
    assert len(result['recipes']) != 0

def test_recipe3() :
    result = requests.get("http://localhost:5001/api/v1/recipes?CleanedIngredients=tomato&Cuisine=Mexican").json()
    assert result['recipes'][0]['TotalTimeInMins'] != 0
    
def test_recipe4() :
    result = requests.get("http://localhost:5001/api/v1/recipes?CleanedIngredients=tomato&Cuisine=Mexican").json()
    assert result['recipes'][0]['Restaurant'] != 0

def test_recipe5() :
    result = requests.get("http://localhost:5001/api/v1/recipes?CleanedIngredients=tomato&Cuisine=Mexican").json()
    assert len(result['recipes'][0]['Diet-type']) != 0

    
def test_recipe6() :
    result = requests.get("http://localhost:5001/api/v1/recipes?CleanedIngredients=tomato&Cuisine=Mexican").json()
    assert (result['recipes'][0]['Restaurant-Location']) != 0        
    
def test_recipe7() :
    result = requests.get("http://localhost:5001/api/v1/recipes?CleanedIngredients=tomato&Cuisine=Mexican").json()
    assert (result['recipes'][0]['image-url']) != 0        
#def test_recipe8() :
#    result = requests.get("http://localhost:5001/api/v1/recipes?CleanedIngredients=tomato&Cuisine=Mexican").json()
#    assert result['recipes'][0]['Recipe-rating'] > 0

#def test_recipe9() :
#    result = requests.get("http://localhost:5001/api/v1/recipes?CleanedIngredients=tomato&Cuisine=Mexican").json()
#    assert result['recipes'][0]['Ingredient-count'] > 0

def test_recipe8():
    result = requests.get("http://localhost:5001/api/v1/recipes?CleanedIngredients=tomato&Cuisine=Mexican").json()
    assert float(result['recipes'][0]['Recipe-rating']) > 0

def test_recipe9():
    result = requests.get("http://localhost:5001/api/v1/recipes?CleanedIngredients=tomato&Cuisine=Mexican").json()
    ingredients = result['recipes'][0]['Cleaned-Ingredients'].split('%')
    assert len(ingredients) > 0