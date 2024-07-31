// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
// import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
getReactNativePersistence;

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyBuBNn1Q830bfAoM5lUtBr4tHhsi3d1C-g',
    authDomain: 'wallpaperapp-3feeb.firebaseapp.com',
    projectId: 'wallpaperapp-3feeb',
    storageBucket: 'wallpaperapp-3feeb.appspot.com',
    messagingSenderId: '778992881738',
    appId: '1:778992881738:web:4487c218dedca75f6556b3',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service

// this is for the authicatioin of the user
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
export default db;

// key points of the firebase
//
