import React from 'react';
import Header from './components/Header';
import UserProfile from './components/UserProfile';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import Counter from './components/Counter'; // ✅ Import Counter

function App() {
  return (
    <div>
      <Header />
      <MainContent />
      <Counter /> {/* ✅ Add Counter component here */}
      <Footer />
    </div>
  );
}

export default App;

