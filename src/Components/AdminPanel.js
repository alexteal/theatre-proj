import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Css/AdminPanel.css";
import { writeMovieData, getMovies, deleteMovieData } from "./Database";
const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState("manageMovies");
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [editedTitle, setEditedTitle] = useState("");
    const [editedTrailerUrl, setEditedTrailerUrl] = useState("");
    const [newMovieTitle, setNewMovieTitle] = useState("");
    const [newMovieTrailerUrl, setNewMovieTrailerUrl] = useState("");
    const [movies, setMovies] = useState({});
    useEffect(() => {
        getMovies().then((movies) => setMovies(movies));
    }, []);
    const handleSelectMovie = (movieName) => {
        if (movies[movieName]) {
            setSelectedMovie(movieName);
            setEditedTitle(movieName);
            setEditedTrailerUrl(movies[movieName].url);
        }
    };
    const handleUpdateMovie = () => {
        writeMovieData(
            editedTitle,
            editedTrailerUrl,
            movies[selectedMovie].running
        ).then(() => getMovies().then((movies) => setMovies(movies)));
    };
    const handleAddMovie = (runningStatus) => {
        writeMovieData(newMovieTitle, newMovieTrailerUrl, runningStatus).then(
            () => {
                setNewMovieTitle("");
                setNewMovieTrailerUrl("");
                getMovies().then((movies) => setMovies(movies));
            }
        );
    };
    const handleDeleteMovie = (movieName) => {
        deleteMovieData(movieName)
            .then(() => {
                const updatedMovies = { ...movies };
                delete updatedMovies[movieName];
                setMovies(updatedMovies);
                setSelectedMovie(null);
                getMovies().then((movies) => setMovies(movies));
            })
            .catch((error) => console.error(error));
    };
    const renderContent = () => {
        switch (activeTab) {
            case "manageMovies":
                return (
                    <>
                        <h3>Manage Movies</h3>
                        <div>
                            <h4>Currently Running</h4>
                            {Object.keys(movies)
                                .filter(
                                    (movieName) => movies[movieName].running
                                )
                                .map((movieName, index) => (
                                    <div key={index}>
                                        <button
                                            onClick={() =>
                                                handleSelectMovie(movieName)
                                            }
                                        >
                                            {movieName}
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDeleteMovie(movieName)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))}
                        </div>
                        <div>
                            <h4>Coming Soon</h4>
                            {Object.keys(movies)
                                .filter(
                                    (movieName) => !movies[movieName].running
                                )
                                .map((movieName, index) => (
                                    <div key={index}>
                                        <button
                                            onClick={() =>
                                                handleSelectMovie(movieName)
                                            }
                                        >
                                            {movieName}
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDeleteMovie(movieName)
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
                            <button onClick={() => handleAddMovie(true)}>
                                Add to Currently Running
                            </button>
                            <button onClick={() => handleAddMovie(false)}>
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
