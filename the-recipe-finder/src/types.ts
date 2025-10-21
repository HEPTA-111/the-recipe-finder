// The public facing recipe data structure
export interface Recipe {
    title: string;
    description: string;
    imageUrl: string;
    id: string;
}

// The internal structure of the raw data returned by the MealDB API
export interface RawMealData {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strInstructions: string;
    [key: string]: any;
}