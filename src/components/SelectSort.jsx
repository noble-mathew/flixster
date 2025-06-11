import "../App.css";

function SelectSort({ onChange }) {
    const handleChange = (event) => {
    const input = event.target.value;
    onChange(input);
};

    return (
        <select name="sortBy" onChange={handleChange}>
            <option hidden>Sort By</option>
            <option value="title.desc">Title (A-Z)</option>
            <option value="primary_release_date.desc">Release Date (most recent to oldest)</option>
            <option value="vote_avg.desc">Vote Average (highest to lowest)</option>
        </select>
    );
}

export default SelectSort;
