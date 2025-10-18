import type { Recipe } from "../types.ts";
import defaultImage from '../assets/food1.jpeg';

interface RecipeItemProps {
    recipe: Recipe;
    title: string;
    description: string;     
    imageUrl: string | undefined;
    onViewRecipe: () => void;
    onAddToFavorites: (recipe: Recipe) => void;
    
    buttonText?: string; 
}

export default function RecipeItem(props: RecipeItemProps) {
    const imageUrl = props.imageUrl || defaultImage;

    return(
        <div className="recipe-item">
            <img src={imageUrl} alt={props.title} className="recipe-image" />
            <h3 className="recipe-title">{props.title}</h3>
            <p>{props.description}</p>
            <button className = 'btn' onClick={props.onViewRecipe}>View Recipe</button>
            <button className='btn' onClick={() => props.onAddToFavorites(props.recipe)}>
                {props.buttonText || 'Add to Favorites'} 
            </button>
        </div>
    );
}