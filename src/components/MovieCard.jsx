import { useEffect, useState } from "react";
import "../App.css"

function MovieCard({ onClick, poster, title, rating }) {
    const [watched, setWatched] = useState(false);
    const [favorite, setFavorite] = useState(false);

    const handleWatchedChange = (event) => {
        event.stopPropagation();
        setWatched(!watched)
    }

    const handleFavoriteChange = (event) => {
        event.stopPropagation();
        setFavorite(!favorite);
    }

    return (
        <div id="Movie-card" onClick={onClick}>
            <img onClick={handleWatchedChange} id="watch-icon" src={watched ? "/public/watched.png" : "/public/not-watched.png"} />
            <img onClick={handleFavoriteChange}  id="favorite-icon" src={favorite ? "/public/favorite.png" : "/public/not-favorite.png"} />
            <img src={poster} alt={`poster for ${title}`}/>
            <div id="Movie-card-footer">
                <h4>{title}</h4>
                <p>Rating: {rating}</p>
            </div>
        </div>
    )
}

export default MovieCard;