import "../App.css"

function MovieCard(data) {
    return (
        <div id="Movie-card">
            <img src={data.poster}/>
            <div id="Movie-card-footer">
                <h4>{data.title}</h4>
                <p>Rating: {data.rating}</p>
            </div>
        </div>
    )
}

export default MovieCard;