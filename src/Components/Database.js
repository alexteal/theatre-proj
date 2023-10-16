import { initializeApp } from "firebase/app";
import { remove, getDatabase, ref, set, onValue } from "firebase/database";
import { faker } from "@faker-js/faker";
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

export function writeTempData(amountOfData) {
    return new Promise((resolve, reject) => {
        try {
            const db = getDatabase();
            for (let i = 0; i < amountOfData; i++) {
                const theatreRef = ref(db, "theatre/" + i);
                set(theatreRef, {
                    id: i,
                    name: faker.company.companyName(),
                });
                const showRoomRef = ref(db, "showRoom/" + i);
                set(showRoomRef, {
                    theatreID: i,
                    showRoomID: i,
                    numberOfSeats: faker.datatype.number(),
                    showTimes: faker.date.future(),
                });
                const showRef = ref(db, "show/" + i);
                set(showRef, {
                    showID: i,
                    movieID: i,
                    showRoomID: i,
                    startTime: faker.date.past(),
                    endTime: faker.date.future(),
                });
                const movieRef = ref(db, "movie/" + i);
                set(movieRef, {
                    movieID: i,
                    runtime: faker.datatype.number(),
                    title: faker.lorem.words(),
                    rating: faker.datatype.float({ min: 0, max: 5 }),
                    genre: faker.lorem.word(),
                    trailer: faker.internet.url(),
                });
                const promotionRef = ref(db, "promotion/" + i);
                set(promotionRef, {
                    promoID: i,
                    discountAmount: faker.datatype.number({ min: 0, max: 100 }),
                    startdate: faker.date.past(),
                    expdate: faker.date.future(),
                    code: faker.random.alphaNumeric(10),
                });
                const userRef = ref(db, "user/" + i);
                set(userRef, {
                    userID: i,
                    firstName: faker.name.firstName(),
                    lastName: faker.name.lastName(),
                    email: faker.internet.email(),
                    password: faker.internet.password(),
                });
                const bookingRef = ref(db, "booking/" + i);
                set(bookingRef, {
                    bookingID: i,
                    userID: i,
                    numberOfSeats: faker.datatype.number(),
                    showTime: faker.date.future(),
                    promotionID: i,
                    price: faker.commerce.price(),
                    date: faker.date.future(),
                });
                const ticketRef = ref(db, "ticket/" + i);
                set(ticketRef, {
                    ticketID: i,
                    type: faker.random.arrayElement(["adult", "senior", "kid"]),
                    bookingID: i,
                    seat:
                        faker.random.alpha({ count: 1 }) +
                        faker.datatype.number({ min: 1, max: 10 }),
                });
            }
            resolve();
        } catch (error) {
            reject(error);
        }
    });
}
