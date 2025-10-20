import Header from "./components/Header.tsx";
import RecipeItem from "./components/RecipeItem.tsx";
import Footer from "./components/Footer.tsx";
import { Route, Routes } from "react-router-dom";
import Favorites from "./components/Favorites.tsx";
import { useState, useEffect } from "react";
import type { Recipe } from "./types.ts";

const API_URL = "https://www.themealdb.com/api/json/v1/1/random.php";

function App() {

    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [favorites, setFavorites] = useState<Recipe[]>([]);
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const fetchRandomRecipe = async () => {
        const NUM_RECIPES = 7;
        const fetchPromises = [];
        for (let i = 0; i < NUM_RECIPES; i++) {

            fetchPromises.push(fetch(API_URL));
        }

        try {
            const responses = await Promise.all(fetchPromises);

            const dataPromises = responses.map(response => response.json());
            const allData = await Promise.all(dataPromises);

            const newRecipes: Recipe[] = allData.map(data => {
                const meal = data.meals ? data.meals[0] : null;

                if (!meal) return null;

                return {
                    title: meal.strMeal,
                    description: meal.strInstructions.substring(0, 150) + '...',
                    imageUrl: meal.strMealThumb,
                    id: meal.idMeal
                };
            }).filter((recipe): recipe is Recipe => recipe !== null);
            setRecipes(newRecipes);

        } catch (error) {
            console.error("Error fetching random recipes:", error);
            setRecipes([]);
        }
    };

    useEffect(() => {
        fetchRandomRecipe();
    }, []);

    const toggleFavorite = (recipe: Recipe) => {
        setFavorites((prevFavorites) => {
            const isFavorite = prevFavorites.some(fav => fav.title === recipe.title);
            if (isFavorite) {
                return prevFavorites.filter(fav => fav.title !== recipe.title);
            }
            else {
                return [...prevFavorites, recipe];
            }
        });
    };

    const openRecipeModal = (recipe: Recipe) => {
        setSelectedRecipe(recipe);
        setIsModalOpen(true);
    }

    const closeRecipeModal = () => {
        setSelectedRecipe(null);
        setIsModalOpen(false);
    }
 


    return (
        <>
            <Header />
            <Routes>
                <Route path="/favorites" element={<Favorites favoritesList={favorites} onToggleFavorite={toggleFavorite}/>} />
                <Route path="/" element={
                    <div className="recipe-list">
                        {recipes.map((recipe) => ( 
                            <RecipeItem
                                recipe={recipe} 
                                key={recipe.title}
                                title={recipe.title}
                                description={recipe.description}
                                imageUrl={recipe.imageUrl}
                                onViewRecipe={() => openRecipeModal(recipe)}
                                isFavorite={favorites.some(fav => fav.title === recipe.title)}
                                onAddToFavorites={toggleFavorite} 
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