import React from 'react';
import ProfilePage from './ProfilePage';
import { UserContext } from './UserContext'; // ✅ Import the context

function App() {
  const userData = { name: "Jane Doe", email: "jane.doe@example.com" };

  return (
    // ✅ Provide the context to child components
    <UserContext.Provider value={userData}>
      <ProfilePage />
    </UserContext.Provider>
  );
}

export default App;

