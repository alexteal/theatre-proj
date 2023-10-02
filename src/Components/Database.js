import { initializeApp } from "firebase/app";
import { remove, getDatabase, ref, set, onValue } from "firebase/database";
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

export function writeMovieData(title, trailerUrl, thumbnail, runningStatus) {
    return new Promise((resolve, reject) => {
        try {
            const db = getDatabase(app);
            const reference = ref(db, "movies/" + title);
            set(reference, {
                title: title,
                trailerUrl: trailerUrl,
                thumbnail: thumbnail,
                running: runningStatus,
            })
                .then(() => resolve())
                .catch((error) => reject(error));
        } catch (error) {
            reject(error);
        }
    });
}

export function getMovies() {
    return new Promise((resolve, reject) => {
        const db = getDatabase(app);
        const reference = ref(db, "movies");
        onValue(
            reference,
            (snapshot) => {
                const data = snapshot.val();
                resolve(data ? data : {}); // if data is null or undefined, return an empty object
            },
            (error) => {
                reject(error);
            }
        );
    });
}

export function deleteMovieData(movieName) {
    return new Promise((resolve, reject) => {
        try {
            const db = getDatabase(app);
            const reference = ref(db, "movies/" + movieName);
            remove(reference)
                .then(() => resolve())
                .catch((error) => reject(error));
        } catch (error) {
            reject(error);
        }
    });
}
