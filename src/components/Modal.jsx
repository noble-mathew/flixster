import { useState, useEffect } from "react";
import { getGenres } from "../utils/api";

import "../App.css"

function Modal({ movie, onClose }) {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const fetchGenres = async () => {
            const data = await getGenres();
            if (data?.genres) {
                setGenres(data.genres)
            };
        };

        fetchGenres();
    }, []);

    const getGenreName = (id) => {
        const genre = genres.find((name) => name.id === id);
        return genre?.name || "Unknown";
    };

    return (
        <div id="Modal">
            <div onClick={onClose} id="Modal-overlay"></div>
                <div id="Modal-content">
                    <div id="Modal-info">
                        <h2>{movie.title}</h2>
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster}`} />
                        <p><strong>Release Date: </strong>{movie.release_date}</p>
                        <p><strong>Overview: </strong>{movie.overview}</p>
                        <p><strong>Genres: </strong></p>
                        <ul>
                            {movie.genres.map((id) => {
                                return <li key={id}>{getGenreName(id)}</li>;
                            })}
                        </ul>
                    </div>
                    <p id="Modal-close" onClick={onClose}><strong>&times;</strong></p>
                </div>
        </div>
    )
}

export default Modal;