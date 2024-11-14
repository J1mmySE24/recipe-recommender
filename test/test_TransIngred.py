import requests

def test() :
    result = requests.get("http://localhost:5000/api/v1/recipes?Cleaned-Ingredients=tomato&Cuisine=Mexican").json()
    assert len(result['recipes'][0]['TranslatedInstructions']) != 0
