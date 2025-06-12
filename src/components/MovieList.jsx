import { parseData } from "../utils/utils.js"

import MovieCard from "./MovieCard"

import "../App.css"

function MovieList({ props, handlers, favoriteMovies, watchedMovies }) {
    const movieData = props?.map(obj => {
        return parseData(obj);
    });

    return (
        <div id="Movie-list">
            {
                movieData?.map(movie => {
                    return <MovieCard key={movie.id} poster={movie.poster} title={movie.title} rating={movie.rating} isFavorite={favoriteMovies.some((obj) => obj.id === movie.id)} isWatched={watchedMovies.some((obj) => obj.id === movie.id)}
                        onOpenModal={() => handlers.openModal(movie)}
                        onAddFavorite={() => handlers.addFavoriteMovie(movie)}
                        onRemoveFavorite={() => handlers.removeFavoriteMovie(movie)}
                        onAddWatched={() => handlers.addWatchedMovie(movie)}
                        onRemoveWatched={() => handlers.removeWatchedMovie(movie)} />
                })
            }
        </div>
    );
}

export default MovieList