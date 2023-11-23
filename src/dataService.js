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

export const saveBookingData = (userId, bookingDetails, userData) => {
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

export const saveUserData = (userId, data) => {
  if (data && data?.paymentCard) {
    data.paymentCard = encryptData(data.paymentCard);
  }
  data.isAdmin = false;
  const database = getDatabase(app);
  const userRef = ref(database, "user/" + userId);
  return set(userRef, data);
};

// export const fetchUserData = (userId) => {
//     const database = getDatabase(app);
//     const userRef = ref(database, 'user/' + userId);
//     return get(userRef);
// };

export const fetchUserData = async (userId) => {
  const database = getDatabase(app);
  const userRef = ref(database, "user/" + userId);
  const snapshot = await get(userRef);
  console.log(snapshot.val(), "check");
  if (snapshot.exists()) {
    const userData = snapshot.val();
    if (userData && userData?.paymentCard && userData?.paymentCard != "") {
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

export function writeMovieData(title, trailerUrl, thumbnail, runningStatus) {
  return new Promise((resolve, reject) => {
    try {
      const db = getDatabase(app);
      const newMovieRef = push(ref(db, "movies"));
      set(newMovieRef, {
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

export function updateMovieData(
  movieId,
  title,
  trailerUrl,
  thumbnail,
  runningStatus
) {
  return new Promise((resolve, reject) => {
    try {
      const db = getDatabase(app);
      const reference = ref(db, "movies/" + movieId);
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
    const reference = ref(db, "movies");
    onValue(
      reference,
      (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        resolve(data ? data : {}); // if data is null or undefined, return an empty object
      },
      (error) => {
        reject(error);
      }
    );
  });
}
