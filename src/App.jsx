import { useEffect, useState } from "react";

import AppHeader from "./components/AppHeader";
import SearchBar from "./components/SearchBar.jsx";
import SelectSort from "./components/SelectSort.jsx"
import MovieList from "./components/MovieList";
import Modal from "./components/Modal.jsx"
import LoadMore from "./components/LoadMore.jsx";
import Footer from "./components/Footer.jsx";

import getMovieData from "./utils/api.js";

import "./App.css";

const App = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [resetDisplay, setResetDisplay] = useState(false);
  const [displayMovieData, setDisplayMovieData] = useState([]);

  // function to handle when the load more button is pressed
  const handleLoadMore = () => {
    setPageNumber((prev) => prev + 1);
  };

  // function to handle when the user searches something
  const handleSearchChange = (name) => {
    setSearchQuery((prev) => name);
    setResetDisplay((prev) => true);
    setPageNumber((prev) => 1);
  };

  // function to handle when the user selects a sort option
  const handleSortChange = (option) => {
    setSortOption((prev) => option);
    setResetDisplay((prev) => true);
    setPageNumber((prev) => 1);
  }

  // function that if the header is pressed the page goes back to the now playing page
  const goToHome = () => {
    setSearchQuery((prev) => "");
    setSortOption((prev) => "");
    setResetDisplay((prev) => true);
    setPageNumber((prev) => 1);
  }

  // sorting the movies based on what option is selected
  const sortMovies = () => {
    if (sortOption === "title") {
      setDisplayMovieData(displayMovieData.sort((a, b) => a.title.localeCompare(b.title)));
    } else if (sortOption === "rating") { 
      setDisplayMovieData(displayMovieData.sort((a, b) => b.vote_average - a.vote_average));
    } else if (sortOption === "release") {
      setDisplayMovieData(displayMovieData.sort((a, b) => Date.parse(b.release_date) - Date.parse(a.release_date)));
    }
  }

  // updating what movies are displayed
  const loadMovies = async () => {
    let data = await getMovieData(pageNumber, searchQuery);
    if (data.results) {
      if (sortOption) {
        sortMovies();
      }
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
  }, [searchQuery, pageNumber, sortOption]);

  useEffect(() => {
  }, [displayMovieData]);

  return (
    <div className="App">
      <div className="App-header">
        <AppHeader onClick={goToHome} />
        <div id="filter">
          <SearchBar value={searchQuery} onSubmit={handleSearchChange}/>
          <SelectSort value={sortOption} onChange={handleSortChange} />
        </div>
      </div>
      <main id="Movie-container">
        <MovieList props={displayMovieData} />
        <LoadMore onClick={handleLoadMore} />
      </main>
      <Footer/>
    </div>
  );
};

export default App;
