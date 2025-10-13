import Header from "./components/Header.jsx";
import RecipeItem from "./components/RecipeItem.js";
import Footer from "./components/Footer.jsx";
import { BrowserRouter } from "react-router-dom";

const recipeItems = [
  {
    title: "Salad",
    description: "A delicious sample recipe for a healthy meal option. Try it out!",
    imageUrl: "../assets/food1.jpeg"
  },
  {
    title: "Pasta",
    description: "A delightful pasta recipe with rich flavors and easy preparation.",
    imageUrl: "../assets/food2.jpeg"
  },
  {
    title: "Dessert",
    description: "A sweet and indulgent dessert recipe to satisfy your cravings.",
    imageUrl: "../assets/food3.jpeg"
  },
  {
    title: "Soup",
    description: "A warm and comforting soup, perfect for a chilly evening.",
    imageUrl: "../assets/food4.jpeg"
  },
  {
    title: "Grilled Steak",
    description: "A perfectly grilled steak, juicy and full of flavor.",
    imageUrl: "../assets/food5.jpeg"
  },
  {
    title: "Pizza",
    description: "Classic homemade pizza with all your favorite toppings.",
    imageUrl: "../assets/food6.jpeg"
  }
];

function App() {
  return (
    <BrowserRouter>
      <Header />
      {recipeItems.map((recipe) => (
        <RecipeItem
          key={recipe.title}
          title={recipe.title}
          description={recipe.description}
          imageUrl={recipe.imageUrl}
          onViewRecipe={() => console.log(`View ${recipe.title}`)}
          onAddToFavorites={() => console.log(`Add ${recipe.title} to Favorites`)}
        />
      ))}
      <Footer />
    </BrowserRouter>
  );
}

export default App;