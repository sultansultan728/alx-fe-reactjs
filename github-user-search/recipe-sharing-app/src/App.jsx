import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import SearchBar from './components/SearchBar';
import './App.css';
import FavoritesList from "./components/FavoritesList";
import RecommendationsList from "./components/RecommendationsList";

function App() {
  return (
    <div className="App">
      <h1>Recipe Sharing App</h1>

      {/* ...recipe list displayed here... */}

      <FavoritesList />
      <RecommendationsList />
    </div>
  );
}

export default App;


function App() {
  return (
    <Router>
      <div className="App" style={{ padding: '20px' }}>
        <h1>🍲 Recipe Sharing App</h1>
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/">Home</Link>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchBar />
                <AddRecipeForm />
                <RecipeList />
              </>
            }
          />
          <Route path="/recipes/:id" element={<RecipeDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

