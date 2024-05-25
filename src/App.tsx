import React from 'react';
import Autocomplete from './components/Autocomplete';
import './App.css';

function App() {
  return (
    <section className='app'>
      <h1>Where do you live?</h1>
      <Autocomplete />
    </section>
  );
}

export default App;
