import React, { useState, useEffect } from 'react';
import RecipeCard from '../Components/RecipeCard';

const dietType = ['All','Vegan', 'Dash', 'Keto', 'Atkins', 'Pescatarian', 'Gluten-Free'];

const ExploreRecipes = () => {
  const [selectedDietType, setSelectedDietType] = useState('All');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [recipes, setRecipes] = useState([]);
  const URL = 'http://localhost:3001/recipes'

  useEffect(() => {
    fetch(`${URL}`) 
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setRecipes(data))
      .catch(error => console.error('Error fetching recipes:', error));
  }, []);
  console.log(recipes);

  const filteredRecipes = recipes.filter(recipe => 
    (recipe.dietType === selectedDietType || selectedDietType === 'All') &&
    (recipe.countryOfOrigin === selectedCountry || selectedCountry === 'All')
  );

  const countries = ['All', ...new Set(recipes.map(recipe => recipe.countryOfOrigin))];

  return (
    <div className="bg-green-50 min-h-screen p-8 font-urbanist">
      <h1 className="text-4xl font-bold text-center mb-12 text-black">Explore Recipes</h1>
      
      {/* Categories */}
      <div className="flex justify-center space-x-4 mb-12">
        {dietType.map(dietType => (
          <button
            key={dietType}
            className={`px-6 py-3 ${selectedDietType === dietType ? 'bg-green-600 text-white' : 'bg-white text-green-600'} rounded-full shadow-lg transition duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50`}
            onClick={() => setSelectedDietType(dietType)}
          >
            {dietType}
          </button>
        ))}
      </div>

      {/* Country Dropdown */}
      <div className="flex justify-end mb-12 mr-8">
        <label htmlFor="country-select" className="mr-4 self-center text-green-600 font-semibold text-lg">
          Select Country:
        </label>
        <select
          id="country-select"
          className="px-6 py-3 bg-white text-green-600 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 cursor-pointer"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          {countries.map(country => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      {/* Recipe Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredRecipes.map(recipe => (
          <div key={recipe.id} className="transform transition duration-300 hover:scale-105 bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="relative h-64">
              <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
              <div className="absolute top-0 right-0 bg-green-600 text-white px-3 py-1 rounded-bl-lg">
                {recipe.dietType}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2 text-green-800">{recipe.title}</h3>
              <div className="flex items-center mb-4">
                <img src={recipe.chefImage} alt={recipe.chefName} className="w-10 h-10 rounded-full mr-3" />
                <span className="text-gray-600">{recipe.chefName}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500 mb-4">
                <span>Prep Time: {recipe.prepTime}</span>
                <span>Servings: {recipe.servings}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-yellow-500">★ {recipe.rating}</span>
                <span className="text-green-600">{recipe.countryOfOrigin}</span>
              </div>
              <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300">
                View Recipe
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreRecipes;