import { Recipe } from "../types.ts";
import RecipeItem from "./RecipeItem.tsx"; 


interface FavoritesProps {
    favoritesList: Recipe[];

    onToggleFavorite: (recipe: Recipe) => void; 
} 
export default function Favorites({ favoritesList, onToggleFavorite }: FavoritesProps) { 
    return (
        <div className="recipe-list">
            <h2>Your Favorite Recipes</h2>
            
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
                        
                        onAddToFavorites={onToggleFavorite} 
                        
                        onViewRecipe={() => console.log(`Viewing ${recipe.title}`)}
                        buttonText="Remove from Favorites"

                    />
                ))
            )}
        </div>
    );
}