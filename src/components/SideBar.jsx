import "../App.css"

function SideBar({ onClose, onNowPlaying, onFavorite, onWatched}) {
    return (
        <div id="Sidebar">
            <div id="Sidebar-overlay">
                <div id="Sidebar-container">
                    <p onClick={onNowPlaying}>Now Playing</p>
                    <p onClick={onFavorite}>Favorite</p>
                    <p onClick={onWatched}>Watched</p>
                </div>
            </div>
        </div>

    )
}

export default SideBar;