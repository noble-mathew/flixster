import "../App.css"

function MovieCard({ onClick, poster, title, rating}) {
    return (
        <div id="Movie-card" onClick={onClick}>
            <img src={poster} alt={`poster for ${title}`}/>
            <div id="Movie-card-footer">
                <h4>{title}</h4>
                <p>Rating: {rating}</p>
            </div>
        </div>
    )
}

export default MovieCard;