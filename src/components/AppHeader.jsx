import "../App.css"

function AppHeader({ onClick }) {
    return (
        <header>
            <img src="movie.png"/>
            <h1 onClick={onClick}>Flixster</h1>
        </header>
    )
}

export default AppHeader;