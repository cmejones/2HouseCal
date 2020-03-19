import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth' ;
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDDUrUfrulaiZ0FZZkmmoosdBZNfQSdA2Y",
  authDomain: "housecal-4ff38.firebaseapp.com",
  databaseURL: "https://housecal-4ff38.firebaseio.com",
  projectId: "housecal-4ff38",
  storageBucket: "housecal-4ff38.appspot.com",
  messagingSenderId: "1058569249700",
  appId: "1:1058569249700:web:68494df9ecf9627af75731",
  measurementId: "G-V551NWGR8T"
};

// save user info in firestore database
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = baseDb.doc(`users/${userAuth.uid}`);
  
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { firstName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        firstName, 
        email, 
        createdAt, 
        ...additionalData
      })

    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;

};

//export const myFirebase = firebase.initializeApp(firebaseConfig);
export const myFirebase = firebase.initializeApp(firebaseConfig);
const baseDb = myFirebase.firestore();
export const db = baseDb;

export const auth = firebase.auth();
export const storage = firebase.storage(); 


// const provider = new firebase.auth.GoogleAuthProvider();
// provider.setCustomParameters({ prompt: 'select_account' });

// export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;