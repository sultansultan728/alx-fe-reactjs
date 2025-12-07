import { useState } from "react";

export default function AddRecipeForm() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) newErrors.title = "Title is required.";
    if (!ingredients.trim()) {
      newErrors.ingredients = "Ingredients are required.";
    } else {
      const list = ingredients.split("\n").filter((item) => item.trim() !== "");
      if (list.length < 2) {
        newErrors.ingredients = "Please enter at least two ingredients (one per line).";
      }
    }

    if (!steps.trim()) newErrors.steps = "Preparation steps are required.";

    setErrors(newErrors);

    // form is valid if no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const newRecipe = {
      title,
      ingredients: ingredients.split("\n"),
      instructions: steps.split("\n"),
    };

    console.log("New Recipe Submitted:", newRecipe);

    alert("Recipe submitted successfully!");

    // Reset form
    setTitle("");
    setIngredients("");
    setSteps("");
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Add New Recipe</h1>

        {/* Title Field */}
        <label className="block mb-4">
          <span className="text-gray-700 font-medium">Recipe Title</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </label>

        {/* Ingredients Field */}
        <label className="block mb-4">
          <span className="text-gray-700 font-medium">Ingredients (one per line)</span>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            rows="5"
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
          ></textarea>
          {errors.ingredients && (
            <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>
          )}
        </label>

        {/* Steps Field */}
        <label className="block mb-6">
          <span className="text-gray-700 font-medium">Preparation Steps (one per line)</span>
          <textarea
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            rows="5"
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
          ></textarea>
          {errors.steps && (
            <p className="text-red-500 text-sm mt-1">{errors.steps}</p>
          )}
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Submit Recipe
        </button>
      </form>
    </div>
  );
}

