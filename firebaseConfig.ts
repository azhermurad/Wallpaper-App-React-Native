// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

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
export const auth = getAuth(app);
