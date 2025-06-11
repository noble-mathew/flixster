const parseData = (data) => {
    return {
        id: data.id,
        poster: data.poster_path,
        title: data.title,
        rating: data.vote_average
    };
}

export { parseData };