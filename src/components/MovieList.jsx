import MovieCard from "./MovieCard"

import "../App.css"
import { parseData } from "../utils/utils.js"

function MovieList({props}) {
    const movieData = props?.map(obj => {
        return parseData(obj);
    });

    return (
        <main id="Movie-list">
            {
                movieData?.map(obj => {
                    return <MovieCard key={obj.id} poster={obj.poster} title={obj.title} rating={obj.rating}/>
                })
            }
        </main>
    );
}

export default MovieList