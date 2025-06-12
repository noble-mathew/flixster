import { useEffect, useState } from "react";
import "../App.css"

function MovieCard({ poster, title, rating, onOpenModal, onAddFavorite, onRemoveFavorite, onAddWatched, onRemoveWatched, isFavorite, isWatched }) {
    const [watched, setWatched] = useState(isWatched);
    const [favorite, setFavorite] = useState(isFavorite);

    const handleWatchedChange = (event) => {
        event.stopPropagation();
        setWatched(prev => !prev);
    }

    const handleFavoriteChange = (event) => {
        event.stopPropagation();
        setFavorite(prev => !prev);
    }

    useEffect(() => {
        watched ? onAddWatched() : onRemoveWatched();
    }, [watched]);

    useEffect(() => {
        favorite ? onAddFavorite() : onRemoveFavorite();
    }, [favorite]);

    return (
        <div id="Movie-card" onClick={onOpenModal}>
            <img id="watch-icon" src={watched ? "/watched.png" : "/not-watched.png"} onClick={handleWatchedChange} />
            <img id="favorite-icon" src={favorite ? "/favorite.png" : "/not-favorite.png"} onClick={handleFavoriteChange} />
            <img src={poster} alt={`poster for ${title}`}/>
            <div id="Movie-card-footer">
                <h4>{title}</h4>
                <p>Rating: {rating}</p>
            </div>
        </div>
    )
}

export default MovieCard;