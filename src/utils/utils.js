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
        poster: data.poster_path,
        title: data.title,
        rating: data.vote_average,
        release_date: formatDate(data.release_date),
        overview: data.overview,
        genres: data.genre_ids //?.map(id => genreIdToName[id]) || [],
    };
}

export { parseData };