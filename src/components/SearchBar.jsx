import { useState, useEffect } from "react";

function SearchBar({ onSubmit, value }) {
    const [input, setInput] = useState(value);
    
    useEffect(() => {
    setInput(value);
    }, [value]);

    const handleChange = (e) => {
    setInput(e.target.value);
    };

    const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(input); 
    };

    const handleReset = (event) => {
        event.preventDefault();
        setInput("");
        onSubmit("");
    };

    return (
    <div id="search-container">
        <form onReset={handleReset} onSubmit={handleSubmit}>
        <input name="movieInput" type="text" placeholder="Search" value={input} onChange={handleChange} />
        <div id="search-buttons">
            <button type="submit">Search</button>
            <button type="reset">Clear</button>   
        </div>
        </form>
    </div>
    );
}

export default SearchBar;