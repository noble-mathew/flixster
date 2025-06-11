import "../App.css"

function FilterBar() {
    return (
        <div id="filter">
            <div id="search-container">
                <form>
                    <input placeholder="Search"/>
                    <button>Search</button>
                    <button>Clear</button>
                </form>
            </div>

            <select>
                <option hidden>Sort By</option>
                <option>Title (A-Z)</option>
                <option>Release Date (most recent to oldest)</option>
                <option>Vote Average (highest to lowest)</option>
            </select>
        </div>
    )
}

export default FilterBar