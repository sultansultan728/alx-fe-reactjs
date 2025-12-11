import axios from "axios";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com/";

export async function searchMovies(query) {
  try {
    const response = await axios.get(BASE_URL, {
      params: { s: query, apikey: API_KEY }
    });

    return response.data;
  } catch (error) {
    throw new Error("Network error. Try again.");
  }
}

export async function getMovieDetails(id) {
  try {
    const response = await axios.get(BASE_URL, {
      params: { i: id, apikey: API_KEY }
    });

    return response.data;
  } catch (error) {
    throw new Error("Network error. Try again.");
  }
}

