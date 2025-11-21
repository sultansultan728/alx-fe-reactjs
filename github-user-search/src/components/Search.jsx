import { useState } from "react";
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
    if (!username && !location && !minRepos) return;

    setLoading(true);
    setError("");
    setResults([]);
    setPage(1);

    try {
      // If only username is provided, use fetchUserData (Task 1)
      if (username && !location && !minRepos) {
        const data = await fetchUserData(username);
        setResults([data]); // wrap in array for consistency
        setHasMore(false);
      } else {
        // Advanced search (Task 2)
        const { users, hasMorePages } = await searchUsers({
          username,
          location,
          minRepos,
          page: 1,
        });
        setResults(users);
        setHasMore(hasMorePages);
      }
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
        page: nextPage,
      });
      setResults((prev) => [...prev, ...users]);
      setHasMore(hasMorePages);
      setPage(nextPage);
    } catch (err) {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* SEARCH FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 space-y-4"
      >
        <h2 className="text-2xl font-bold text-gray-800">GitHub User Search</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder="Location (optional)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          placeholder="Minimum Repositories (optional)"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>

      {/* LOADING & ERROR */}
      <div className="mt-6">
        {loading && <p className="text-gray-700">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
      </div>

      {/* RESULTS */}
      <div className="space-y-4 mt-6">
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
              <h3 className="text-lg font-semibold">{user.name || user.login}</h3>
              {user.location && <p className="text-gray-600">Location: {user.location}</p>}
              {user.public_repos !== undefined && (
                <p className="text-gray-600">Repos: {user.public_repos}</p>
              )}
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                View Profile
              </a>
            </div>
          </div>
        ))}

        {hasMore && (
          <button
            onClick={loadMore}
            className="w-full bg-gray-800 text-white py-2 rounded hover:bg-black transition"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default Search;

