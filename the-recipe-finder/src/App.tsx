import Header from "./components/Header.jsx";
import RecipeItem from "./components/RecipeItem.js";
import Footer from "./components/Footer.jsx";


function App() {

  return (
    <>
    <Header />
    <RecipeItem 
      title="Salad"
      description="A delicious sample recipe for a healthy meal option. Try it out!"
      imageUrl="../assets/food1.jpeg"
      onViewRecipe={() => console.log("View Recipe")}
      onAddToFavorites={() => console.log("Add to Favorites")}
    />
    <Footer />

    </>
  )
}

export default App
