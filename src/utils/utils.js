const parseData = (data) => {
    return {
        id: data.id,
        poster: data.backdrop_path,
        title: data.original_title,
        rating: data.vote_average
    };
}

export { parseData };