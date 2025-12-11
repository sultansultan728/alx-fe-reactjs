function MovieCard({ movie, onSelect }) {
  return (
    <div
      className="border rounded p-3 shadow hover:shadow-lg cursor-pointer"
      onClick={() => onSelect(movie.imdbID)}
    >
      <img
        src={movie.Poster}
        alt={movie.Title}
        className="w-full h-64 object-cover rounded"
      />
      <h3 className="font-bold mt-3">{movie.Title}</h3>
      <p className="text-sm text-gray-600">{movie.Year}</p>
    </div>
  );
}

export default MovieCard;

