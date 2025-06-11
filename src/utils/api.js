const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_BEARER_KEY}`
    }
};

// data that displays the movie cards and most of the modal information
export async function getMovieData(pageNumber, movieName) {
    let webURL;
    if (movieName) {
        webURL = `https://api.themoviedb.org/3/search/movie?query=${movieName}&api_key=${import.meta.env.VITE_API_KEY}&page=${pageNumber}`;
    } else {
        webURL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_API_KEY}&page=${pageNumber}`;
    }

    try {
        const resp = await fetch(webURL, options);
        if (!resp.ok) {
            throw new Error('Failed to fetch movie data');
        }
        const data = await resp.json();
        return data;
    } catch (error) {
        console.error(`Fetch error: ${error}`);
    }
}

// gets all the information relevant to the specific movie
export async function getMovieInformation(id) {
    try {
        const resp = await fetch(`https://api.themoviedb.org/3/movie/${id}`, options);
        if (!resp.ok) {
            throw new Error('Failed to fetch available genres');
        }
        const data = await resp.json();
        return data;
    } catch (error) {
        console.error(`Fetch error: ${error}`);
    }
}