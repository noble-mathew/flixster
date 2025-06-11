import "../App.css"

function SearchBar() {
    return (
        <div id="search-container">
            <form>
                <input placeholder="Search"/>
                <button>Search</button>
                <button>Clear</button>
            </form>
        </div>
    )
}

export default SearchBar