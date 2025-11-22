import create from 'zustand'

const useRecipeStore = create(set => ({
	recipes: []
	addRecipe: (newRecipe) => set(state => ({
recipes: [...state.recipes, newRecipe] })),
	setRecipes: (recipes) => set({ recipes })


     updateRecipe: (updateRecipe) =>
	set((state) => ({
	   recipes: state.recipes.map((recipe) =>
	    recipe.id === updatedRecipe.id ? updatedRecipe : recipe
	),
     })),

    deleteRecipe: (id) =>
	set((state) => ({
	   recipes: state.recipes.filter((recipe) => recipe.id !== id),
    })),
 
    setReceipes: (receipes) => set({ recipes })

addFavorite: (recipeId) =>
    set((state) =>
      state.favorites.includes(recipeId)
        ? state
        : { favorites: [...state.favorites, recipeId] }
    ),

  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId),
    })),

 
  recommendations: [],

  generateRecommendations: () => {
    const { recipes, favorites } = get();

 
    const recommended = recipes.filter(
      (recipe) =>
        favorites.includes(recipe.id) || Math.random() > 0.7
    );

    set({ recommendations: recommended });
  },

  
  setRecipes: (recipes) => set({ recipes }),
}));

}));
