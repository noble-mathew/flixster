import "../App.css"

function SelectSort() {
    return (
        <select>
            <option hidden>Sort By</option>
            <option>Title (A-Z)</option>
            <option>Release Date (most recent to oldest)</option>
            <option>Vote Average (highest to lowest)</option>
        </select>
    )
}

export default SelectSort;