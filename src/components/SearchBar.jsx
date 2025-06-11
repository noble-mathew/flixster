import "../App.css"

function SearchBar({ onSubmit }) {
    const handleSubmit = (event) => {
        event.preventDefault();
        const input = event.target.elements.movieInput.value;
        onSubmit(input);
    }
    
    const handleReset = (event) => {
        event.preventDefault();
        event.target.elements.movieInput.value = "";
        onSubmit("");
    }

    return (
        <div id="search-container">
            <form onReset={handleReset} onSubmit={handleSubmit}>
                <input name="movieInput" type="text" placeholder="Search"/>
                <button type="submit">Search</button>
                <button type="reset">Clear</button>
            </form>
        </div>
    )
}

export default SearchBar