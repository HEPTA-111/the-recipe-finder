import Header from "./components/Header.tsx";
import RecipeItem from "./components/RecipeItem.tsx";
import Footer from "./components/Footer.tsx";
import { Route, Routes } from "react-router-dom";
import Favorites from "./components/Favorites.tsx";
import { useState, useEffect } from "react";

// --- INTERFACE AND API_URL are fine ---
export interface Recipe {
    title: string;
    description: string;
    imageUrl: string;
}

// Remove the hardcoded recipeItems array entirely, 
// as we will now use the live data from the API!

const API_URL = "https://www.themealdb.com/api/json/v1/1/random.php";

function App() {

    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [favorites, setFavorites] = useState<Recipe[]>([]);

    // --- FIX START: Correct Fetch Logic ---
    const fetchRandomRecipe = async () => {
        const NUM_RECIPES = 6;
        const fetchPromises = []; // Array to hold all 6 promises

        for (let i = 0; i < NUM_RECIPES; i++) {
            // 1. Push the promise from the fetch request onto the array
            fetchPromises.push(fetch(API_URL)); 
        }

        try {
            // 2. Wait for all 6 requests to finish simultaneously
            const responses = await Promise.all(fetchPromises);
            
            // 3. Convert all responses to JSON promises
            const dataPromises = responses.map(response => response.json());
            const allData = await Promise.all(dataPromises);

            // 4. Process the data into the correct Recipe[] format
            const newRecipes: Recipe[] = allData.map(data => {
                const meal = data.meals ? data.meals[0] : null;

                if (!meal) return null;

                // Return a new Recipe object, mapping API fields to your interface
                return {
                    title: meal.strMeal,
                    description: meal.strInstructions.substring(0, 150) + '...', // Shorten description
                    imageUrl: meal.strMealThumb
                };
            }).filter((recipe): recipe is Recipe => recipe !== null); // Filter out any nulls and ensure TypeScript knows the type

            // 5. Update the state with the new array of recipes
            setRecipes(newRecipes);

        } catch (error) {
            console.error("Error fetching random recipes:", error);
            // Optionally set recipes to a fallback empty array on failure
            setRecipes([]); 
        }
    };
    // --- FIX END ---
    
    useEffect(() => {
        fetchRandomRecipe();
    }, []);


    return (
        <>
            <Header />
            <Routes>
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/" element={
                    <div className="recipe-list">
                        {/* Use the live 'recipes' state instead of 'recipeItems' */}
                        {recipes.map((recipe) => ( 
                            <RecipeItem
                                key={recipe.title}
                                title={recipe.title}
                                description={recipe.description}
                                imageUrl={recipe.imageUrl}
                                onViewRecipe={() => console.log(`View ${recipe.title}`)}
                                onAddToFavorites={() => console.log(`Add ${recipe.title} to Favorites`)}
                            />
                        ))}
                    </div>
                } />
            </Routes>
            <Footer />
        </>
    );
}

export default App;