import './App.scss';
import Context from './components/context/context'
// import './components/FetchRequest1.js'


import AnimeList from './components/AnimeList';
import AnimeFavorite from './components/AnimeFavorite';
import logo from './logo.svg';

import React, { useState } from 'react';

function App() {

  const [favoritList, setfavoritList] = useState([]);

  const addItemFavorit = (item) => {
      setfavoritList([...favoritList, item]);
  }

  const filterItemFavorit  = id => {
    return favoritList.find(item => { 
      return item.id === id
    })
  }

  const remuveItemFavorit = id => {
    setfavoritList(favoritList.filter(item => {
      return item.id !== id
    }))
  }

const value = {
    favoritList, 
    addItemFavorit,
    filterItemFavorit,
    remuveItemFavorit
  }
  
  return (
    <Context.Provider value={value}>
        <header className="App-header">
          <img src={logo} className="logo" alt="logo" />
        </header>
        <AnimeList />
        <AnimeFavorite />
    </Context.Provider>
  );
}

export default App;
