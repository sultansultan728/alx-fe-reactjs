import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((item) => item.id === parseInt(id));
        setRecipe(found);
      })
      .catch((error) => console.error("Error loading recipe:", error));
  }, [id]);

  if (!recipe) {
    return <p className="text-center mt-10 text-gray-600">Loading recipe...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <Link
        to="/"
        className="text-blue-600 font-medium hover:underline mb-6 inline-block"
      >
        ← Back to Home
      </Link>

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 object-cover rounded-xl mb-6"
        />

        <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
        <p className="text-gray-700 mb-6">{recipe.summary}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Ingredients */}
          <div>
            <h2 className="text-2xl font-semibold mb-3">Ingredients</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              {recipe.ingredients.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div>
            <h2 className="text-2xl font-semibold mb-3">Instructions</h2>
            <ol className="list-decimal list-inside text-gray-700 space-y-3">
              {recipe.instructions.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

