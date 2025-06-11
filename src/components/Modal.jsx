import { useState, useEffect } from "react";
import { getMovieInformation } from "../utils/api";

import "../App.css"

function Modal({ movie, onClose }) {
    const [genres, setGenres] = useState([]) // stores the genres in an array
    const [movieInformation, setMovieInformation] = useState({}); // stores the information for the movie

    // getting the name of the genre using the associated id
    const getGenreName = (id) => {
        const genre = genres.find((name) => name.id === id);
        return genre?.name || "Unknown";
    };

    // want the information for the movie to load as soon as the modal is opened and only then
    useEffect(() => {
        const fetchMovieInformation = async () => {
            const data = await getMovieInformation(movie.id);
            if (data) {
                setMovieInformation(data);
                if (data?.genres) {
                    setGenres(data.genres);
                }
            }
        };

        fetchMovieInformation();
    }, []);

    return (
        <div id="Modal">
            <div onClick={onClose} id="Modal-overlay"></div>
                <div id="Modal-content">
                    <div id="Modal-info">
                        <h2>{movie.title}</h2>
                        <img src={movie.poster ? `https://image.tmdb.org/t/p/w500${movie.poster}`: "https://static.vecteezy.com/system/resources/previews/055/688/760/non_2x/simple-tripod-camera-icon-vector.jpg"} />
                        <p><strong>Release Date: </strong>{movie.release_date}</p>
                        <p><strong>Runtime: </strong> {Math.floor(movieInformation.runtime / 60)} hours {movieInformation.runtime % 60} minutes</p>
                        <p><strong>Overview: </strong>{movie.overview}</p>
                        <p><strong>Genres: </strong></p>
                        <ul>
                            {genres.map((obj) => {
                                return <li key={obj.id}>{getGenreName(obj.id)}</li>;
                            })}
                        </ul>
                    </div>
                    <p id="Modal-close" onClick={onClose}><strong>&times;</strong></p>
                </div>
        </div>
    )
}

export default Modal;