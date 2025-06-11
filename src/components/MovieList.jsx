import { parseData } from "../utils/utils.js"

import MovieCard from "./MovieCard"

import "../App.css"

function MovieList({ props, onClick }) {
    const movieData = props?.map(obj => {
        return parseData(obj);
    });

    return (
        <div id="Movie-list">
            {
                movieData?.map(movie => {
                    return <MovieCard onClick={() => onClick(movie)} key={movie.id} poster={movie.poster} title={movie.title} rating={movie.rating}/>
                })
            }
        </div>
    );
}

export default MovieList