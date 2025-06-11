async function fetchMovieData(pageNumber) {
    try {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_BEARER_KEY}`
            }
        };

        const resp = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_API_KEY}&page=${pageNumber}`, options);
        if (!resp.ok) {
            throw new Error('Failed to fetch movie data');
        }
        const data = await resp.json();
        return data;
    } catch (error) {
        console.error(`Fetch error: ${error}`);
    }
}

export default fetchMovieData;