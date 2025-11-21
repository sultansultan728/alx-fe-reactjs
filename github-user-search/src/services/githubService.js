import axios from "axios";

export const searchUsers = async ({ username, location, minRepos, page }) => {
  let query = "";

  if (username) query += `${username} `;
  if (location) query += `location:${location} `;
  if (minRepos) query += `repos:>${minRepos} `;

  const url = `https://api.github.com/search/users?q=${encodeURIComponent(
    query
  )}&page=${page}&per_page=10`;

  const response = await axios.get(url);

  return {
    users: response.data.items,
    hasMorePages: response.data.total_count > page * 10
  };
};

