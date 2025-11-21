import { useState } from "react";
import { searchUsers } from "../services/githubService";
import { fetchUserData, searchUsers } from "../services/githubService";

const Search = () => {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResults([]);

    try {
      const { users, hasMorePages } = await searchUsers({
        username,
        location,
        minRepos,
        page: 1
      });

      setResults(users);
      setHasMore(hasMorePages);
      setPage(1);
    } catch (err) {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    const nextPage = page + 1;
    setLoading(true);

    try {
      const { users, hasMorePages } = await searchUsers({
        username,
        location,
        minRepos,
        page: nextPage
      });

      setResults(prev => [...prev, ...users]);
      setHasMore(hasMorePages);
      setPage(nextPage);
    } catch (err) {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">

      {/* SEARCH FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 space-y-4"
      >
        <h2 className="text-xl font-semibold mb-2">Advanced GitHub User Search</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          placeholder="Location (e.g., Nairobi)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <input
          type="number"
          placeholder="Minimum repositories"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {/* CONDITIONAL UI */}
      <div className="mt-6">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
      </div>

      {/* RESULTS */}
      <div className="space-y-4 mt-4">
        {results.map((user) => (
          <div
            key={user.id}
            className="flex items-center bg-gray-100 p-4 rounded shadow"
          >
            <img
              src={user.avatar_url}
              alt="avatar"
              className="w-16 h-16 rounded-full mr-4"
            />

            <div>
              <h3 className="text-lg font-bold">{user.login}</h3>
              <a
                href={user.html_url}
                className="text-blue-600 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Profile
              </a>
            </div>
          </div>
        ))}

        {hasMore && (
          <button
            onClick={loadMore}
            className="w-full bg-gray-800 text-white py-2 rounded hover:bg-black"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default Search;

