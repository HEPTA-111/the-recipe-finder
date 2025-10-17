import Header from "./components/Header.tsx";
import RecipeItem from "./components/RecipeItem.tsx";
import Footer from "./components/Footer.tsx";
import { Route,Routes} from "react-router-dom";
import Favorites from "./components/Favorites.tsx"; 

const recipeItems = [
  {
    title: "Salad",
    description: "A delicious sample recipe for a healthy meal option. Try it out!",
    imageUrl: "../assets/food1.jpeg"
  },
  {
    title: "Pasta",
    description: "A delightful pasta recipe with rich flavors and easy preparation.",
    imageUrl: "../assets/food1.jpeg"
  },
  {
    title: "Dessert",
    description: "A sweet and indulgent dessert recipe to satisfy your cravings.",
    imageUrl: "../assets/food1.jpeg"
  },
  {
    title: "Soup",
    description: "A warm and comforting soup, perfect for a chilly evening.",
    imageUrl: "../assets/food1.jpeg"
  },
  {
    title: "Grilled Steak",
    description: "A perfectly grilled steak, juicy and full of flavor.",
    imageUrl: "../assets/food1.jpeg"
  },
  {
    title: "Pizza",
    description: "Classic homemade pizza with all your favorite toppings.",
    imageUrl: "../assets/food1.jpeg"
  }
];

function App() {
  return (
    <>
      <Header />
      <Routes>
      <Route path ="/favorites" element={<Favorites/>} />
      <Route path="/" element={
      <div className="recipe-list">
      {
        recipeItems.map((recipe) => (
          <RecipeItem
            key={recipe.title}
            title={recipe.title}
            description={recipe.description}
            imageUrl={recipe.imageUrl}
            onViewRecipe={() => console.log(`View ${recipe.title}`)}
            onAddToFavorites={() => console.log(`Add ${recipe.title} to Favorites`)}
          />
        ))
      }
      </div>
      } />
      </Routes>
      <Footer />
    </>

  );
}

export default App;