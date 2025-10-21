import type { Recipe } from "../types.ts";
import defaultImage from '../assets/food1.jpeg';
import React from 'react';

interface RecipeItemProps {
    recipe: Recipe;
    title: string;
    description: string; 
    imageUrl: string | undefined;
    onViewRecipe: () => void;
    onAddToFavorites: (recipe: Recipe) => void;
    isFavorite: boolean;
    buttonText?: string; 
}

export default function RecipeItem(props: RecipeItemProps) {
    const imageUrl = props.imageUrl || defaultImage;
    const buttonClass = props.isFavorite ? 'btn btn-favorited' : 'btn';

    return(
        <div className="recipe-item">
            <img 
                src={imageUrl} 
                alt={props.title} 
                className="recipe-item-img" 
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null; 
                    target.src = defaultImage;
                }}
            />
            <h3 className="recipe-title">{props.title}</h3>
            {/* Removed description <p> tag as requested */}
            <button className='btn' onClick={props.onViewRecipe}>View Recipe</button>
            <button className={buttonClass} onClick={() => props.onAddToFavorites(props.recipe)}>
                {props.buttonText || (props.isFavorite ? 'Remove from Favorites' : 'Add to Favorites')} 
            </button>
        </div>
    );
}