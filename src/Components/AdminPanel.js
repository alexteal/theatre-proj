import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Css/AdminPanel.css";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const AdminPanel = ({
    currentlyRunning,
    setCurrentlyRunning,
    comingSoon,
    setComingSoon,
}) => {
    const [activeTab, setActiveTab] = useState("manageMovies");
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [editedTitle, setEditedTitle] = useState("");
    const [editedTrailerUrl, setEditedTrailerUrl] = useState("");
    const [newMovieTitle, setNewMovieTitle] = useState("");
    const [newMovieTrailerUrl, setNewMovieTrailerUrl] = useState("");

    const handleSelectMovie = (movie, category) => {
        setSelectedMovie(movie);
        setEditedTitle(movie.title);
        setEditedTrailerUrl(movie.trailerUrl);
    };

    const handleUpdateMovie = () => {
        const updatedCurrentlyRunning = currentlyRunning.map((movie) =>
            movie === selectedMovie
                ? { ...movie, title: editedTitle, trailerUrl: editedTrailerUrl }
                : movie
        );
        const updatedComingSoon = comingSoon.map((movie) =>
            movie === selectedMovie
                ? { ...movie, title: editedTitle, trailerUrl: editedTrailerUrl }
                : movie
        );

        setCurrentlyRunning(updatedCurrentlyRunning);
        setComingSoon(updatedComingSoon);
    };

    const handleAddMovie = (category) => {
        const newMovie = {
            title: newMovieTitle,
            trailerUrl: newMovieTrailerUrl,
        };

        if (category === "currentlyRunning") {
            setCurrentlyRunning([...currentlyRunning, newMovie]);
        } else if (category === "comingSoon") {
            setComingSoon([...comingSoon, newMovie]);
        }
        setNewMovieTitle("");
        setNewMovieTrailerUrl("");
    };

    const handleDeleteMovie = (movie, category) => {
        if (category === "currentlyRunning") {
            const updatedCurrentlyRunning = currentlyRunning.filter(
                (item) => item !== movie
            );
            setCurrentlyRunning(updatedCurrentlyRunning);
        } else if (category === "comingSoon") {
            const updatedComingSoon = comingSoon.filter(
                (item) => item !== movie
            );
            setComingSoon(updatedComingSoon);
        }

        setSelectedMovie(null);
    };

    const renderContent = () => {
        switch (activeTab) {
            case "manageMovies":
                return (
                    <>
                        <h3>Manage Movies</h3>
                        <div>
                            <h4>Currently Running</h4>
                            {currentlyRunning.map((movie, index) => (
                                <div key={index}>
                                    <button
                                        onClick={() =>
                                            handleSelectMovie(
                                                movie,
                                                "currentlyRunning"
                                            )
                                        }
                                    >
                                        {movie.title}
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDeleteMovie(
                                                movie,
                                                "currentlyRunning"
                                            )
                                        }
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div>
                            <h4>Coming Soon</h4>
                            {comingSoon.map((movie, index) => (
                                <div key={index}>
                                    <button
                                        onClick={() =>
                                            handleSelectMovie(
                                                movie,
                                                "comingSoon"
                                            )
                                        }
                                    >
                                        {movie.title}
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDeleteMovie(
                                                movie,
                                                "comingSoon"
                                            )
                                        }
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                        </div>
                        {selectedMovie && (
                            <div>
                                <h4>Edit Movie</h4>
                                <input
                                    value={editedTitle}
                                    onChange={(e) =>
                                        setEditedTitle(e.target.value)
                                    }
                                    placeholder="Title"
                                />
                                <input
                                    value={editedTrailerUrl}
                                    onChange={(e) =>
                                        setEditedTrailerUrl(e.target.value)
                                    }
                                    placeholder="Trailer URL"
                                />
                                <button onClick={handleUpdateMovie}>
                                    Update
                                </button>
                            </div>
                        )}
                        <div className="mt-5">
                            <h4>Add New Movie</h4>
                            <input
                                value={newMovieTitle}
                                onChange={(e) =>
                                    setNewMovieTitle(e.target.value)
                                }
                                placeholder="Title"
                            />
                            <input
                                value={newMovieTrailerUrl}
                                onChange={(e) =>
                                    setNewMovieTrailerUrl(e.target.value)
                                }
                                placeholder="Trailer URL"
                            />
                            <button
                                onClick={() =>
                                    handleAddMovie("currentlyRunning")
                                }
                            >
                                Add to Currently Running
                            </button>
                            <button
                                onClick={() => handleAddMovie("comingSoon")}
                            >
                                Add to Coming Soon
                            </button>
                        </div>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="admin-panel">
            <nav className="admin-nav">
                <button onClick={() => setActiveTab("manageMovies")}>
                    Manage Movies
                </button>
                <button>manage users</button>
                <button>manage promotions</button>
                <Link to="/">
                    <button>LogOut</button>{" "}
                </Link>
            </nav>
            <div className="admin-content">{renderContent()}</div>
        </div>
    );
};

export default AdminPanel;
