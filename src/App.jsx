import { useEffect, useState } from "react";
import {getMovieData} from "./utils/api.js";

import SideBar from "./components/SideBar.jsx";
import AppHeader from "./components/AppHeader";
import SearchBar from "./components/SearchBar.jsx";
import SelectSort from "./components/SelectSort.jsx"
import MovieList from "./components/MovieList";
import Modal from "./components/Modal.jsx"
import LoadMore from "./components/LoadMore.jsx";
import Footer from "./components/Footer.jsx";

import "./App.css";

const App = () => {
  const [pageNumber, setPageNumber] = useState(1); // keeps track of the page number when searching
  const [searchQuery, setSearchQuery] = useState(""); // holds search input
  const [sortOption, setSortOption] = useState(""); // holds sort option value
  const [resetDisplay, setResetDisplay] = useState(false); // determines whether reset the movie data
  const [displayMovieData, setDisplayMovieData] = useState([]); // holds data for movies to be displayed
  const [favoriteMovies, setFavoriteMovies] = useState([]); // holds data for favorite movies
  const [displayFavoriteMovies, setDisplayFavoriteMovies] = useState(false); // determines if favorite movies are displayed 
  const [watchedMovies, setWatchedMovies] = useState([]); // holds data for watched movies
  const [displayWatchedMovies, setDisplayWatchedMovies] = useState(false); // determines if watched movies are displayed
  const [displayModal, setDisplayModal] = useState(false); // determines if modal is displayed
  const [modalMovie, setModalMovie] = useState({}); // holds which movie the modal needs to display
  const [displaySideBar, setDisplaySideBar] = useState(false); // determines if sidebar is displayed

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
    setDisplayFavoriteMovies((prev) => false);
    setDisplayWatchedMovies((prev) => false);
    setSearchQuery((prev) => "");
    setSortOption((prev) => "");
    setResetDisplay((prev) => true);
    setPageNumber((prev) => 1);
  }

  // function for going to the favorite page
  const goToFavorite = () => {
    setDisplayFavoriteMovies((prev) => true);
    setDisplayWatchedMovies((prev) => false);
    setSearchQuery((prev) => "");
    setSortOption((prev) => "");
    setResetDisplay((prev) => true);
    setPageNumber((prev) => 1);
  }

  // function for going to the watched page
  const goToWatched = () => {
    setDisplayFavoriteMovies((prev) => false);
    setDisplayWatchedMovies((prev) => true);
    setSearchQuery((prev) => "");
    setSortOption((prev) => "");
    setResetDisplay((prev) => true);
    setPageNumber((prev) => 1);
  }
  
  // handles sidebar displaying logic
  const handleDisplaySideBar = () => {
    setDisplaySideBar((prev) => !prev);
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

  // function for adding movies to favorite movies array
  const addFavoriteMovie = (movie) => {
    if (!favoriteMovies.find((favoriteMovie) => favoriteMovie.id === movie.id)) {
      setFavoriteMovies((prev) => [...prev, movie]);
    }
  };

  // function for removing movies from favorite movies array
  const removeFavoriteMovie = (removeMovie) => {
    const newFavoriteMovies = favoriteMovies.filter(
      (movie) => movie.id !== removeMovie.id
    );
    setFavoriteMovies(newFavoriteMovies);
  };

  // function for adding movies to watched movies array
  const addWatchedMovie = (movie) => {
    if (!watchedMovies.find((watchedMovie) => watchedMovie.id === movie.id)) {
      setWatchedMovies((prev) => [...prev, movie]);
    }
  };

  // function for removing movies from watched movies array
  const removeWatchedMovie = (removeMovie) => {
    const newWatchedMovies = watchedMovies.filter(
      (movie) => movie.id !== removeMovie.id
    );
    setWatchedMovies(newWatchedMovies);
  };

  // updating what movies are displayed
  const loadMovies = async () => {
    let data;
    if (displayFavoriteMovies) {
      setDisplayMovieData((prev) => favoriteMovies);
    } else if (displayWatchedMovies) {
      setDisplayMovieData((prev) => watchedMovies);
    } else {
      data = await getMovieData(pageNumber, searchQuery);
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
  }

  // either display completely new data or add on to our existing data
  // only change display when search or sort are done or user chooses to load more
  // always change display if we need to display favorites or watched page
  useEffect(() => {
    if (resetDisplay) {
      setDisplayMovieData((prev) => []);
    }

    loadMovies();
    setResetDisplay((prev) => false);
  }, [searchQuery, pageNumber, sortOption, displayFavoriteMovies, displayWatchedMovies]);

  return (
    <div className="App">
      <img id="menu" src="/menu.png" onClick={handleDisplaySideBar}/>
      {displaySideBar && <SideBar onClose={handleDisplaySideBar} onNowPlaying={goToHome} onFavorite={goToFavorite} onWatched={goToWatched} />}
      <div className="App-header">
        <AppHeader onClick={goToHome} />
        <div id="filter">
          <SearchBar value={searchQuery} onSubmit={handleSearchChange}/>
          <SelectSort value={sortOption} onChange={handleSortChange} />
        </div>
      </div>
      <main id="Movie-container">
        <MovieList props={displayMovieData} handlers={{ openModal, addFavoriteMovie, removeFavoriteMovie, addWatchedMovie, removeWatchedMovie }} favoriteMovies={favoriteMovies} watchedMovies={watchedMovies} ifParse={!(displayFavoriteMovies || displayWatchedMovies)} />
        <LoadMore onClick={handleLoadMore} />
        {displayModal && <Modal onClose={closeModal} movie={modalMovie} />}
      </main>
      <Footer/>
    </div>
  );
};

export default App;