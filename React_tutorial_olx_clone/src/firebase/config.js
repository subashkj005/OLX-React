// import firebase from 'firebase'
import {initializeApp} from 'firebase/app'

import 'firebase/auth' 
// import 'firebase/firebase'
import 'firebase/storage'
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';



const firebaseConfig = {
    apiKey: "AIzaSyCVdRTsrlesFqNbfoEGxTWEZ2WRNHRHxbU",
    authDomain: "demoproject-f9f6f.firebaseapp.com",
    projectId: "demoproject-f9f6f",
    storageBucket: "demoproject-f9f6f.appspot.com",
    messagingSenderId: "1079260487027",
    appId: "1:1079260487027:web:d9eafaa0f897ddad007906",
    measurementId: "G-ZJ2W49V66E"
  };

// export default firebase.initializeApp(firebaseConfig)
const firebase = initializeApp(firebaseConfig)
export const storage = getStorage(firebase);
export const firestore = getFirestore(firebase)
export default firebase
