import CryptoJS from "crypto-js";
import {
  remove,
  getDatabase,
  ref,
  set,
  onValue,
  get,
  update,
  push,
} from "firebase/database";
import { app } from "./firebase";
const secretKey = "my-secret-key";

const encryptData = (message) => {
  const encrypted = CryptoJS.AES.encrypt(message, secretKey).toString();
  return encrypted;
};

const decryptData = (encryptedMessage) => {
  const decrypted = CryptoJS.AES.decrypt(encryptedMessage, secretKey);
  return decrypted.toString(CryptoJS.enc.Utf8);
};

export const saveBookingDataOLD = (userId, bookingDetails, userData) => {
  if (userData && userData?.paymentCard) {
    userData.paymentCard = encryptData(userData.paymentCard);
  }
  const bookingData = {
    ...bookingDetails,
    userData: userData,
  };
  const database = getDatabase(app);
  const bookingRef = ref(database, "booking/" + userId);
  return set(bookingRef, bookingData);
};

export const updateMovieShowtimeData = async (movieId, selectedShowtime, selectedSeats, userId) => {
  const database = getDatabase(app);
  const movieRef = ref(database, `active-movies/${movieId}/showtimes/${selectedShowtime}`);

  const movieSnapshot = await get(movieRef);
  let showtimeData = movieSnapshot.exists() ? movieSnapshot.val() : { totalPeople: 0, seats: {} };

  // Update existing showtime data
  showtimeData.totalPeople += selectedSeats.length;
  selectedSeats.forEach(seat => {
    showtimeData.seats[seat] = userId; // Or any other identifier
  });

  // Update movie showtime data in Firebase
  await set(movieRef, showtimeData);
};


// we're storing the entire booking object into the user's tree so that we
// can recover all of the booking data from each user.
export const saveBookingData = (userId, bookingDetails, userData) => {
  if (userData && userData?.paymentCard) {
    userData.paymentCard = encryptData(userData.paymentCard);
  }
  const bookingId = Date.now();
  const bookingData = {
    bookingDetails,
  };
  const database = getDatabase(app);
  const bookingRef = ref(database, "user/" + userId + "/booking/" + bookingId);
  const paymentCardRef = ref(database, "user/" + userId + "/paymentCard");

  return Promise.all([
    set(bookingRef, bookingData),
    set(paymentCardRef, userData.paymentCard),
  ]);
};

export const saveUserData = (userId, data) => {
  if (data && data?.paymentCard) {
    data.paymentCard = encryptData(data.paymentCard);
  }
  data.isAdmin = false;
  const database = getDatabase(app);
  const userRef = ref(database, "user/" + userId);
  return set(userRef, data);
};

export function getShowtimes(movieId) {
  return new Promise((resolve, reject) => {
    const db = getDatabase(app);
    const showtimesRef = ref(db, `movies/${movieId}/showtimes`);
    onValue(
      showtimesRef,
      (snapshot) => {
        const data = snapshot.val();
        resolve(data ? data : []); // Return an empty array if data is null or undefined
      },
      (error) => {
        reject(error);
      }
    );
  });
}

// export const fetchUserData = (userId) => {
//     const database = getDatabase(app);
//     const userRef = ref(database, 'user/' + userId);
//     return get(userRef);
// };
export const fetchAllUserData = async () => {
  const database = getDatabase(app);
  const userRef = ref(database, "user/");
  try {
    const snapshot = await get(userRef);
    const data = snapshot.val();
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const fetchUserData = async (userId) => {
  const database = getDatabase(app);
  const userRef = ref(database, "user/" + userId);
  const snapshot = await get(userRef);
  console.log(snapshot.val(), "check");
  if (snapshot.exists()) {
    const userData = snapshot.val();
    if (userData && userData?.paymentCard && userData?.paymentCard !== "") {
      userData.paymentCard = decryptData(userData.paymentCard);
    }
    return userData;
  }
  return null;
};

export const updateUserData = (userId, data) => {
  if (data && data?.paymentCard) {
    data.paymentCard = encryptData(data.paymentCard);
  }
  const database = getDatabase(app);
  const userRef = ref(database, "user/" + userId);
  return set(userRef, data);
};

export function writeMovieData(movieData) {
  return new Promise((resolve, reject) => {
    try {
      const db = getDatabase(app);
      const newMovieRef = push(ref(db, "movies"));
      set(newMovieRef, movieData)
        .then(() => resolve())
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
}

export function updateMovieData(movieId, movieData) {
  return new Promise((resolve, reject) => {
    try {
      const db = getDatabase(app);
      const reference = ref(db, "movies/" + movieId);
      set(reference, movieData)
        .then(() => resolve())
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
}

export function deleteMovieData(movieId) {
  return new Promise((resolve, reject) => {
    try {
      const db = getDatabase(app);
      const reference = ref(db, "movies/" + movieId);
      remove(reference)
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
    const moviesRef = ref(db, "movies");
    onValue(
      moviesRef,
      (snapshot) => {
        const movies = [];
        snapshot.forEach((childSnapshot) => {
          movies.push({
            id: childSnapshot.key, // Include the Firebase unique key as 'id'
            ...childSnapshot.val(),
          });
        });
        resolve(movies);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

export const fetchAllBookings = () => {
  return new Promise((resolve, reject) => {
    const db = getDatabase(app);
    const bookingsRef = ref(db, "booking");
    onValue(
      bookingsRef,
      (snapshot) => {
        const allBookings = [];
        console.log("Snapshot from Firebase:", snapshot.val()); // Log the raw snapshot from Firebase

        snapshot.forEach((childSnapshot) => {
          const bookingId = childSnapshot.key;
          const bookingData = childSnapshot.val();
          console.log(`Booking ID: ${bookingId}`, bookingData); // Log each booking ID and its data

          allBookings.push({ bookingId, ...bookingData });
        });

        console.log("All bookings:", allBookings); // Log the final array of all bookings
        resolve(allBookings);
      },
      (error) => {
        console.error("Error fetching bookings:", error); // Log any errors
        reject(error);
      }
    );
  });
};

export function setPromoData(promoId, promoVal, userEmail) {
  return new Promise((resolve, reject) => {
    try {
      const db = getDatabase();
      const reference = ref(db, "promos/" + promoId);
      set(reference, { promoVal: promoVal, userEmail: userEmail })
        .then(() => resolve())
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
}
export function updatePromoData(promoId, promoVal, userEmail) {
  return new Promise((resolve, reject) => {
    try {
      const db = getDatabase();
      const reference = ref(db, "promos/" + promoId);
      update(reference, { promoVal: promoVal, userEmail: userEmail })
        .then(() => resolve())
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
}
export function getPromoData(promoId) {
  return new Promise((resolve, reject) => {
    try {
      const db = getDatabase();
      const reference = ref(db, "promos/" + promoId);
      get(reference)
        .then((snapshot) => {
          if (snapshot.exists()) {
            resolve(snapshot.val());
          } else {
            resolve(null);
          }
        })
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
}
export function deletePromoData(promoId) {
  return new Promise((resolve, reject) => {
    try {
      const db = getDatabase();
      const reference = ref(db, "promos/" + promoId);
      remove(reference)
        .then(() => resolve())
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
}
