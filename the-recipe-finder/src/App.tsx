import Header from "./components/Header.tsx";
import RecipeItem from "./components/RecipeItem.tsx";
import Footer from "./components/Footer.tsx";
import { Route, Routes } from "react-router-dom";
import Favorites from "./components/Favorites.tsx";
import { useState, useEffect } from "react";
import type { Recipe, RawMealData } from "./types.ts"; 
import { RecipeModal } from "./components/RecipeModal.tsx";


const API_URL = "https://www.themealdb.com/api/json/v1/1/random.php";

function App() {

    // --- State Declarations ---
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>("");

    // --- Persistence: Lazy State Initialization ---
    const [favorites, setFavorites] = useState<Recipe[]>(() => {
        const savedFavorites = localStorage.getItem('recipeFavorites');
        if (savedFavorites) {
            return JSON.parse(savedFavorites);
        }
        return [];
    });

    // --- Persistence: Synchronization ---
    useEffect(() => {
        localStorage.setItem('recipeFavorites', JSON.stringify(favorites));
    }, [favorites]);

    // --- API & Core Functions ---
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
                const meal: RawMealData = data.meals ? data.meals[0] : null;

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

    const executeSearch = async () => {
        if (!searchTerm.trim()) {
            alert("Please enter a recipe name to search.");
            return;
        }

        const SEARCH_URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;

        try {
            const response = await fetch(SEARCH_URL);
            const data = await response.json();

            const rawMeals: RawMealData[] = data.meals || [];

            const newRecipes: Recipe[] = rawMeals.map((meal) => {
                return {
                    title: meal.strMeal,
                    description: meal.strInstructions.substring(0, 150) + '...',
                    imageUrl: meal.strMealThumb,
                    id: meal.idMeal
                };
            });

            setRecipes(newRecipes);
            if (rawMeals.length === 0) {
                alert(`No recipes found for "${searchTerm}".`);
            }

        } catch (error) {
            console.error("Error executing search:", error);
            setRecipes([]);
        }
    };

    const toggleFavorite = (recipe: Recipe) => {
        setFavorites((prevFavorites) => {
            const isFavorite = prevFavorites.some(fav => fav.id === recipe.id); 
            if (isFavorite) {
                return prevFavorites.filter(fav => fav.id !== recipe.id);
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

    useEffect(() => {
        fetchRandomRecipe();
    }, []);
    

    return (
        <>
            <Header onSearchChange={setSearchTerm} onSearchSubmit={executeSearch} />
            <Routes>
                {/* Favorites Route: Passed openRecipeModal function */}
                <Route 
                    path="/favorites" 
                    element={<Favorites 
                        favoritesList={favorites} 
                        onToggleFavorite={toggleFavorite} 
                        onViewRecipe={openRecipeModal} 
                    />} 
                />
                <Route path="/" element={
                    <div className="recipe-list">
                        {recipes.map((recipe) => (
                            <RecipeItem
                                recipe={recipe}
                                key={recipe.id} 
                                title={recipe.title}
                                description={recipe.description}
                                imageUrl={recipe.imageUrl}
                                onViewRecipe={() => openRecipeModal(recipe)}
                                isFavorite={favorites.some(fav => fav.id === recipe.id)}
                                onAddToFavorites={toggleFavorite}
                            />
                        ))}
                    </div>
                } />
            </Routes>
            <Footer />
            {isModalOpen && (
                <RecipeModal
                    recipe={selectedRecipe}
                    onClose={closeRecipeModal}
                />
            )}
        </>
    );
}
export default App;