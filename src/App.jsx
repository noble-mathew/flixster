import { useState } from 'react'

import AppHeader from './components/AppHeader'
import FilterBar from './components/FilterBar'
import MovieList from './components/MovieList'
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
      </div>
    </div>
  )
}

export default App
