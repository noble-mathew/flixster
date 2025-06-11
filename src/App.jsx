import { useEffect, useState } from "react";

import AppHeader from "./components/AppHeader";
import SearchBar from "./components/SearchBar.jsx";
import SelectSort from "./components/SelectSort.jsx"
import MovieList from "./components/MovieList";
import LoadMore from "./components/LoadMore.jsx";
import Footer from "./components/Footer.jsx";

import getMovieData from "./utils/api.js";

import "./App.css";

const App = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [resetDisplay, setResetDisplay] = useState(false);

  const [displayMovieData, setDisplayMovieData] = useState([]);

  const handleLoadMore = () => {
    setPageNumber((prev) => prev + 1);
  };

  const handleSearchChange = (name) => {
    setSearchQuery((prev) => name);
    setResetDisplay((prev) => true);
    setPageNumber((prev) => 1);
  };

  const loadMovies = async () => {
    let data = await getMovieData(pageNumber, searchQuery);
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
    if (resetDisplay) {
      setDisplayMovieData((prev) => []);
    }

    loadMovies();
    setResetDisplay((prev) => false);
  }, [searchQuery, pageNumber]);

  return (
    <div className="App">
      <div className="App-header">
        <AppHeader />
        <div id="filter">
          <SearchBar onSubmit={handleSearchChange}/>
          <SelectSort/>
        </div>
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
