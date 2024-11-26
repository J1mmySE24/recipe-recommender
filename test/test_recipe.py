import requests

def test_get_result():
    result = requests.get("http://localhost:5001/api/v1/recipes?CleanedIngredients=Tomato")
    assert result is not None

def test_get_result_status():
    result = requests.get("http://localhost:5001/api/v1/recipes?CleanedIngredients=Tomato")
    assert result.status_code == 200
    
def test_get_result1():
    result = requests.get("http://localhost:5001/api/v1/recipes?CleanedIngredients=Tomato")
    assert result.text.find("Tomato") != -1
    
def test_get_result2():
    result = requests.get("http://localhost:5001/api/v1/recipes?CleanedIngredients=Tomato")
    assert result.text.find("pear123") == -1

def test_get_result3():
    result = requests.get("http://localhost:5001/api/v1/recipes?CleanedIngredients=Tomato")
    assert result.text.find("peach") == -1

def test_get_result4():
    result = requests.get("http://localhost:5001/api/v1/recipes?CleanedIngredients=Tomato")
    assert result.text.find("salt") == -1
    
def test_get_result5():
    result = requests.get("http://localhost:5001/api/v1/recipes?CleanedIngredients=Tomato")
    assert result.text.find("sugar") == -1
    
def test_get_result6():
    result = requests.get("http://localhost:5001/api/v1/recipes?CleanedIngredients=Tomato")
    assert result.text.find("cheese") == -1
    
def test_get_result7():
    result = requests.get("http://localhost:5001/api/v1/recipes?CleanedIngredients=Tomato")
    assert result.text.find("lemon") == -1
    

def test_get_result8():
    result = requests.get("http://localhost:5001/api/v1/recipes?CleanedIngredients=Tomato")
    assert result.text.find("spinach") == -1
    
def test_get_result9():
    result = requests.get("http://localhost:5001/api/v1/recipes?CleanedIngredients=Tomato")
    assert result.text.find("apple") == -1
    
def test_get_result10():
    result = requests.get("http://localhost:5001/api/v1/recipes?CleanedIngredients=Tomato")
    assert result.text.find("tortillas") == -1
    
def test_get_result11():
    result = requests.get("http://localhost:5001/api/v1/recipes?CleanedIngredients=Tomato")
    assert result.text.find("chicken") == -1
    
def test_get_result12():
    result = requests.get("http://localhost:5001/api/v1/recipes?CleanedIngredients=Tomato")
    assert result.text.find("beef") == -1
    
    
    
        