import React from 'react';
import Header from './Header';
import UserProfile from './UserProfile';
import MainContent from './MainContent';
import Footer from './Footer';

function App() {
  return (
    <div>
      <Header />
      <UserProfile name="Alice" age={28} bio="Loves traveling and photography." />
      <UserProfile name="Bob" age={32} bio="Enjoys hiking and outdoor adventures." />
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;

