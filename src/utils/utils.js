const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-us", {
        month: "short",
        day: "numeric",
        year: "numeric",
        }
    );
}

const parseData = (data) => {
    return {
        id: data.id,
        poster: (data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : "https://static.vecteezy.com/system/resources/previews/055/688/760/non_2x/simple-tripod-camera-icon-vector.jpg"),
        title: data.title,
        rating: data.vote_average,
        release_date: formatDate(data.release_date),
        overview: data.overview,
        genres: data.genre_ids //?.map(id => genreIdToName[id]) || [],
    };
}

export { parseData };