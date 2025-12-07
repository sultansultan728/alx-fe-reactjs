import { useState, useEffect } from "react";

export default function HomePage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.error("Error loading data:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-10">Recipe Sharing Platform</h1>

      {/* Responsive grid with required class */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-48 object-cover rounded-t-xl"
            />

            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
              <p className="text-gray-600 mb-4">{recipe.summary}</p>

              <a
                href={`/recipes/${recipe.id}`}
                className="text-blue-600 font-medium hover:underline"
              >
                View Recipe →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

