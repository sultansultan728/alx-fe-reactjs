import React, { useContext } from 'react';
import UserInfo from './UserInfo';
import UserContext from './UserContext'; 

function UserProfile() {
  const userData = useContext(UserContext); 

  return (
    <div>
      <h2>User Profile</h2>
      <p>Welcome, {userData.name}!</p>
      <UserInfo />
    </div>
  );
}

export default UserProfile;

