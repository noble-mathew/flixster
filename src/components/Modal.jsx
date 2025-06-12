import { useState, useEffect } from "react";
import { getMovieInformation, getMovieVideo } from "../utils/api";

import "../App.css"

function Modal({ movie, onClose }) {
    const [genres, setGenres] = useState([]) // stores the genres in an array
    const [movieInformation, setMovieInformation] = useState({}); // stores the information for the movie
    const [movieVideo, setMovieVideo] = useState(null) // stores all the videos associated with this movie
    const [movieTrailer, setMovieTrailer] = useState(null); // stores the latest trailer

    // getting the name of the genre using the associated id
    const getGenreName = (id) => {
        const genre = genres.find((name) => name.id === id);
        return genre?.name || "Unknown";
    };

    // getting the latest trailer for the movie selected
    const getMovieTrailer = () => {
        return movieVideo?.find(
            (video) =>
                video.site === "YouTube" &&
                video.name.toLowerCase().includes("official trailer")
        );
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

        const fetchMovieVideo = async () => {
            const data = await getMovieVideo(movie.id);
            if (data.results) {
                setMovieVideo(data.results);
            }
        }

        fetchMovieInformation();
        fetchMovieVideo();
    }, []);

    // only trying to get trailer after we get all the video information
    useEffect(() => {
        if (movieVideo) {
            const trailer = getMovieTrailer();
            if (trailer) {
                setMovieTrailer(trailer);
            }
        }
    }, [movieVideo]);


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
                    {movieTrailer && <iframe width="560" height="315" src={`https://www.youtube.com/embed/${movieTrailer.key}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />}
                    </div>
                    <p id="Modal-close" onClick={onClose}><strong>&times;</strong></p>
                </div>
        </div>
    )
}

export default Modal;