import type { Recipe } from "../types.ts";
import RecipeItem from "./RecipeItem.tsx"; 


interface FavoritesProps {
    favoritesList: Recipe[];
    onToggleFavorite: (recipe: Recipe) => void; 
} 
export default function Favorites({ favoritesList, onToggleFavorite }: FavoritesProps) { 
    return (
        // I've wrapped the content in a container for the new CSS styles
        <div className="favorites-container"> 
            <h2>Your Favorite Recipes</h2>
            
            
            
            <div className="recipe-list">
                {favoritesList.length === 0 ? (
                    <p>You haven't saved any recipes yet!</p>
                ) : (
                    favoritesList.map(recipe => (
                        <RecipeItem
                            key={recipe.title}
                            recipe={recipe}
                            title={recipe.title}
                            description={recipe.description}
                            imageUrl={recipe.imageUrl}
                            isFavorite={true} // Always true on this page
                            
                            onAddToFavorites={onToggleFavorite} 
                            buttonText="Remove from Favorites"
                            
                            onViewRecipe={() => console.log(`Viewing ${recipe.title}`)}
                        />
                    ))
                )}
            </div>
        </div>
    );
}