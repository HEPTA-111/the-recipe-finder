import type { Recipe } from "../types.ts";
import RecipeItem from "./RecipeItem.tsx"; 

interface FavoritesProps {
    favoritesList: Recipe[];
    onToggleFavorite: (recipe: Recipe) => void;
    onViewRecipe: (recipe: Recipe) => void; 
} 
export default function Favorites({ favoritesList, onToggleFavorite, onViewRecipe }: FavoritesProps) { 
    return (
        <div className="favorites-container"> 
            <h2>Your Favorite Recipes</h2>
            <div className="recipe-list">
                {favoritesList.length === 0 ? (
                    <p>You haven't saved any recipes yet!</p>
                ) : (
                    favoritesList.map(recipe => (
                        <RecipeItem
                            key={recipe.id} 
                            recipe={recipe}
                            title={recipe.title}
                            description={recipe.description}
                            imageUrl={recipe.imageUrl}
                            isFavorite={true}
                            
                            onAddToFavorites={onToggleFavorite} 
                            buttonText="Remove from Favorites"
                            onViewRecipe={() => onViewRecipe(recipe)} 
                        />
                    ))
                )}
            </div>
        </div>
    );
}