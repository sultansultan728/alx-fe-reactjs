function MovieDetails({ movie }) {
  if (!movie) return null;

  return (
    <div className="p-4 border rounded shadow mt-6">
      <h2 className="text-2xl font-bold mb-2">{movie.Title}</h2>

      <img
        src={movie.Poster}
        alt={movie.Title}
        className="w-60 rounded mb-4"
      />

      <p><strong>Plot:</strong> {movie.Plot}</p>
      <p><strong>Genre:</strong> {movie.Genre}</p>
      <p><strong>Actors:</strong> {movie.Actors}</p>
      <p><strong>Ratings:</strong> {movie.imdbRating}</p>
    </div>
  );
}

export default MovieDetails;

