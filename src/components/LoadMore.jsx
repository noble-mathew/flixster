import "../App.css"

function LoadMore({ onClick }) {
    return (
        <div>
            <button onClick={onClick} id="Load-more">Load More</button>
        </div>
    )
}

export default LoadMore;