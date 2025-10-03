import defaultImage from '../assets/food1.jpeg';

interface RecipeItemProps {
    title: string;
    description: string;    
    imageUrl: string | undefined;
    onViewRecipe: () => void;
    onAddToFavorites: () => void;
}

export default function RecipeItem(props: RecipeItemProps) {
    const imageUrl = props.imageUrl || defaultImage;

    return(

        <div className="recipe-item">
            <img 
                src={imageUrl} 
                alt="Recipe Image" 
                className="recipe-item.iag"
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null; 
                    target.src = defaultImage;
                }}
            />
            <h3 className="recipe-title">{props.title}</h3>
            <p>{props.description}</p>
            <button className = 'btn'onClick={props.onViewRecipe}>View Recipe</button>
            <button className='btn' onClick={props.onAddToFavorites}>Add to Favorites</button>
        </div>
    );
}