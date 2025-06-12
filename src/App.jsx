import { useEffect, useState } from "react";
import {getMovieData} from "./utils/api.js";

import AppHeader from "./components/AppHeader";
import SearchBar from "./components/SearchBar.jsx";
import SelectSort from "./components/SelectSort.jsx"
import MovieList from "./components/MovieList";
import Modal from "./components/Modal.jsx"
import LoadMore from "./components/LoadMore.jsx";
import Footer from "./components/Footer.jsx";

import "./App.css";

const App = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [resetDisplay, setResetDisplay] = useState(false);
  const [displayMovieData, setDisplayMovieData] = useState([]);
  const [displayModal, setDisplayModal] = useState(false);
  const [modalMovie, setModalMovie] = useState({});

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

  // sorting the movies based on what option is selected
  const sortMovies = (movieData) => {
    if (sortOption === "title") {
      return movieData.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "rating") { 
      return movieData.sort((a, b) => b.vote_average - a.vote_average);
    } else if (sortOption === "release") {
      return movieData.sort((a, b) => Date.parse(b.release_date) - Date.parse(a.release_date));
    }
  }

  // function that if the header is pressed the page goes back to the now playing page
  const goToHome = () => {
    setSearchQuery((prev) => "");
    setSortOption((prev) => "");
    setResetDisplay((prev) => true);
    setPageNumber((prev) => 1);
  }

  // function that handles when the modal needs to be opened
  const openModal = (movie) => {
    setModalMovie(movie);         
    setDisplayModal(true);       
  };

  // function that handles when the modal needs to be closed
  const closeModal = () => {
    setDisplayModal(false);  
    setModalMovie({});            
  };

  // updating what movies are displayed
  const loadMovies = async () => {
    let data = await getMovieData(pageNumber, searchQuery);
    if (data.results) {
      setDisplayMovieData((prev) => {
        if (data.page === pageNumber) {
          const newIds = new Set(prev.map(item => item.id));
          const filtered = data.results.filter(item => !newIds.has(item.id));
          const merged = [...prev, ...filtered];
          if (sortOption) {
            return sortMovies(merged);
          }
          return merged
        }
        return prev;
      })
    };
  }
  
  // either display completely new data or add on to our existing data
  // only change display when search or sort are done or user chooses to load more
  useEffect(() => {
    if (resetDisplay) {
      setDisplayMovieData((prev) => []);
    }

    loadMovies();
    setResetDisplay((prev) => false);
  }, [searchQuery, pageNumber, sortOption]);

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
        <MovieList props={displayMovieData} onClick={openModal}/>
        <LoadMore onClick={handleLoadMore} />
        {displayModal && <Modal onClose={closeModal} movie={modalMovie} />}
      </main>
      <Footer/>
    </div>
  );
};

export default App;