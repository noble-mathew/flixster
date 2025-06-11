import { useEffect, useState } from "react";

import AppHeader from "./components/AppHeader";
import FilterBar from "./components/FilterBar";
import MovieList from "./components/MovieList";
import LoadMore from "./components/LoadMore.jsx";
import Footer from "./components/Footer.jsx";
import data from "./data/data.js";
import fetchMovieData from "./utils/api.js";

import "./App.css";

const App = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const [displayMovieData, setDisplayMovieData] = useState([]);

  const handleLoadMore = () => {
    setPageNumber((prev) => prev + 1);
    console.log("Load more movies");
  };

  const loadMovies = async () => {
    const data = await fetchMovieData(pageNumber);
    if (data.results) {
      setDisplayMovieData((prev) => {
        if (data.page === pageNumber) {
          const newIds = new Set(prev.map(item => item.id));
          const filtered = data.results.filter(item => !newIds.has(item.id));
          return [...prev, ...filtered];
        }
        return prev;
      })
    };
  }
  
  useEffect(() => {
    if (!searchQuery) {
      loadMovies();
    }
  }, [searchQuery, pageNumber]);

  return (
    <div className="App">
      <div className="App-header">
        <AppHeader />
        <FilterBar />
      </div>
      <div id="Movie-container">
        <MovieList props={displayMovieData} />
        <LoadMore onClick={handleLoadMore} />
      </div>
      <Footer/>
    </div>
  );
};

export default App;
