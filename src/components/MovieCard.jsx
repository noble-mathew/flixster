import "../App.css"

function MovieCard(data) {
    return (
        <div id="Movie-card">
            <img src={`https://image.tmdb.org/t/p/w500${data.poster}`} alt={`poster for ${data.title}`}/>
            <div id="Movie-card-footer">
                <h4>{data.title}</h4>
                <p>Rating: {data.rating}</p>
            </div>
        </div>
    )
}

export default MovieCard;