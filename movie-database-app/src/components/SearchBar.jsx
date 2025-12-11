import { useState } from "react";

function SearchBar({ onSearch }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;
    onSearch(text);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
      <input
        type="text"
        className="border p-2 rounded w-full"
        placeholder="Search for a movie..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="bg-blue-600 text-white px-4 rounded">
        Search
      </button>
    </form>
  );
}

export default SearchBar;

