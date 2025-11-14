import { create } from 'zustand';

export const useRecipeStore = create((set) => ({
  recipes: [],
  filteredRecipes: [],
  searchTerm: '',

  addRecipe: (newRecipe) =>
    set((state) => ({
      recipes: [...state.recipes, newRecipe],
      filteredRecipes: [...state.recipes, newRecipe],
    })),

  updateRecipe: (updatedRecipe) =>
    set((state) => {
      const updatedList = state.recipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      );
      return {
        recipes: updatedList,
        filteredRecipes: updatedList.filter((r) =>
          r.title.toLowerCase().includes(state.searchTerm.toLowerCase())
        ),
      };
    }),

  deleteRecipe: (id) =>
    set((state) => {
      const remaining = state.recipes.filter((recipe) => recipe.id !== id);
      return {
        recipes: remaining,
        filteredRecipes: remaining.filter((r) =>
          r.title.toLowerCase().includes(state.searchTerm.toLowerCase())
        ),
      };
    }),

  setRecipes: (recipes) => set({ recipes, filteredRecipes: recipes }),

  setSearchTerm: (term) =>
    set((state) => {
      const filtered = state.recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(term.toLowerCase())
      );
      return { searchTerm: term, filteredRecipes: filtered };
    }),

  filterRecipes: () =>
    set((state) => ({
      filteredRecipes: state.recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      ),
    })),

favorites: [],

  addFavorite: (recipeId) =>
    set((state) => {
      if (state.favorites.includes(recipeId)) return state;
      return { favorites: [...state.favorites, recipeId] };
    }),

  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId),
    })),
  
  
  recommendations: [],

  generateRecommendations: () => {
    const { recipes, favorites } = get();

    
    const recommended = recipes.filter(
      (recipe) =>
        favorites.includes(recipe.id) || (Math.random() > 0.6 && !favorites.includes(recipe.id))
    );

    set({ recommendations: recommended });
  },
}));

}));

