import "../App.css";

function SelectSort({ value, onChange }) {
    const handleChange = (event) => {
    const input = event.target.value;
    onChange(input);
};

    return (
        <select value={value} name="sortBy" onChange={handleChange}>
            <option default hidden>Sort By</option>
            <option value="title">Title (A-Z)</option>
            <option value="release">Release Date (most recent to oldest)</option>
            <option value="rating">Vote Average (highest to lowest)</option>
        </select>
    );
}

export default SelectSort;
