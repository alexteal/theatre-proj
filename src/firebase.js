import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, sendEmailVerification, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { signOut, sendPasswordResetEmail } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId:process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId:process.env.REACT_APP_APP_ID,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
};

export const register = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const sendVerificationEmail = (user) => {
  return sendEmailVerification(user);
};

export const sendResetEmail = (email) => {
  return sendPasswordResetEmail(auth, email);
};

export const updateUserPassword = (newPassword) => {
  const user = auth.currentUser;  // Get the current logged-in user
  return updatePassword(user, newPassword);
};

export const reauthenticateUser = (currentPassword) => {
  const user = auth.currentUser;
  const credential = EmailAuthProvider.credential(user.email, currentPassword);
  return reauthenticateWithCredential(user, credential);
};

export const signOutUser = () => {
  return signOut(auth);
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
export { app };