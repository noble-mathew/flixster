import "../App.css"

function SideBar({ onNowPlaying, onFavorite, onWatched, isFavorite, isWatched}) {
    return (
        <div id="Sidebar">
            <div id="Sidebar-overlay">
                <div id="Sidebar-container">
                    <p onClick={onNowPlaying} class={(!isFavorite && !isWatched) ? "active" : null}>Now Playing</p>
                    <p onClick={onFavorite} class={isFavorite ? "active": null}>Favorite</p>
                    <p onClick={onWatched} class={isWatched ? "active": null}>Watched</p>
                </div>
            </div>
        </div>

    )
}

export default SideBar;