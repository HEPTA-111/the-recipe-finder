import { useState, useEffect } from "react";
import type { Recipe } from "../types.ts";


interface ModalProps {
    recipe: Recipe | null;
    onClose: () => void;
}

export function RecipeModal({ recipe, onClose }: ModalProps) {

    const [fullInstructions, setFullInstructions] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (recipe?.id) {
            fetchFullDetails(recipe.id);
        }
    }, [recipe?.id]);

    if (!recipe) {
        return null;
    }

    const fetchFullDetails = async (id: string) => {
        setIsLoading(true); // Start loading
        setFullInstructions(""); // Clear old instructions
        const DETAIL_URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

        try {
            const response = await fetch(DETAIL_URL);
            const data = await response.json();

            const meal = data.meals ? data.meals[0] : null;
            const instructions = meal ? meal.strInstructions : "No instructions available.";

            setFullInstructions(instructions);

        } catch (error) {
            console.error("Error fetching full recipe details:", error);
            setFullInstructions("Failed to load instructions.");
        } finally {
            setIsLoading(false); // Stop loading
        }
    };


    const formattedInstructions = fullInstructions.replace(/\. /g, '.<br /><br />');

    return (
        <div className="modal-backdrop" onClick={onClose}>
            {/* Stop clicks inside the modal from closing the backdrop */}
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>{recipe.title}</h2>
                <img src={recipe.imageUrl} alt={recipe.title} style={{ width: '90%', maxWidth: '400px' }} />

                <h3>Method/Procedure</h3>

                {/* Conditional Rendering for Loading or Instructions */}
                {isLoading ? (
                    <p>Loading full instructions...</p>
                ) : (
                    // CRITICAL: Uses the special React prop to render the HTML string
                    <div
                        className="recipe-instructions"
                        dangerouslySetInnerHTML={{ __html: formattedInstructions }}
                    />
                )}

                <button className="btn" onClick={onClose}>Close</button>
            </div>
        </div>
    );
}