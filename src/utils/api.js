const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_BEARER_KEY}`
    }
};

async function getMovieData(pageNumber, movieName, sortOption) {
    console.log(pageNumber, movieName, sortOption);
    let webURL;
    if (movieName) {
        webURL = `https://api.themoviedb.org/3/search/movie?query=${movieName}&api_key=${import.meta.env.VITE_API_KEY}&page=${pageNumber}`;
    } else if (sortOption) { 
        webURL = `https://api.themoviedb.org/3/discover/movie?sort_by=${sortOption}&api_key=${import.meta.env.VITE_API_KEY}&page=${pageNumber}`;
    } else {
        webURL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_API_KEY}&page=${pageNumber}`;
    }

    try {
        const resp = await fetch(webURL, options);
        if (!resp.ok) {
            throw new Error('Failed to fetch movie data');
        }
        const data = await resp.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(`Fetch error: ${error}`);
    }
}

export default getMovieData;