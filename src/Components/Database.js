import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
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
export function writeMovieData(movieName, movieUrl, runningStatus) {
    const db = getDatabase(app);
    const reference = ref(db, "movies/" + movieName);
    set(reference, {
        running: runningStatus,
        url: movieUrl,
    });
}
export function getMovies() {
    const db = getDatabase(app);
    const reference = ref(db, "movies");
    onValue(reference, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
    });
}
