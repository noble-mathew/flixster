import { useState } from 'react'

import AppHeader from './components/AppHeader'
import FilterBar from './components/FilterBar'
import MovieList from './components/MovieList'
import LoadMore from './components/LoadMore.jsx'
import Footer from './components/Footer.jsx'
import data from "./data/data.js"

import './App.css'

const App = () => {
  return (
    <div className="App">
      <div className="App-header">
        <AppHeader/>
        <FilterBar/>
      </div>
      <div id="Movie-container">
        <MovieList props={data}/>
        <LoadMore/>
      </div>
      <Footer/>
    </div>
  )
}

export default App
