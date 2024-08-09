import React, { useState, useEffect } from 'react';
import RecipeCard from '../Components/RecipeCard';

const categories = ['All', 'Dinners', 'Lunches', 'Breakfast', 'Desserts', 'More'];

const ExploreRecipes = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Fetch the recipes data from your JSON file or API
    fetch('/path/to/recipes.json')
      .then(response => response.json())
      .then(data => setRecipes(data))
      .catch(error => console.error('Error fetching recipes:', error));
  }, []);

  const filteredRecipes = selectedCategory === 'All'
    ? recipes
    : recipes.filter(recipe => recipe.category === selectedCategory);

  return (
    <div className="bg-green-50 min-h-screen p-8 font-urbanist">
      <h1 className="text-3xl font-semibold text-center mb-8">Explore Recipes</h1>
      
      {/* Categories */}
      <div className="flex justify-center space-x-4 mb-8">
        {categories.map(category => (
          <button
            key={category}
            className={`px-4 py-2 ${selectedCategory === category ? 'bg-green-500 text-white' : 'bg-white text-green-500'} rounded-full shadow-lg`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Recipe Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredRecipes.map(recipe => (
          <RecipeCard
            key={recipe.id}
            id={recipe.id}
            title={recipe.title}
            image={recipe.image}
            rating={recipe.rating}
          />
        ))}
      </div>
    </div>
  );
};

export default ExploreRecipes;
