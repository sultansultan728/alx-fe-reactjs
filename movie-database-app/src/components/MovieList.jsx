import MovieCard from "./MovieCard";

function MovieList({ movies, onSelect }) {
  if (!movies || movies.length === 0)
    return <p>No movies found. Try another search.</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} onSelect={onSelect} />
      ))}
    </div>
  );
}

export default MovieList;

