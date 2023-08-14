import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


export const Context = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyD4zBHaza7XweHe-ijnRsLaYfIWkmB_JuA",
  authDomain: "messenger-5d17b.firebaseapp.com",
  projectId: "messenger-5d17b",
  storageBucket: "messenger-5d17b.appspot.com",
  messagingSenderId: "121543697154",
  appId: "1:121543697154:web:320e60e758f315f78dd81b",
  measurementId: "G-JXYZN1H33X"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Context.Provider value={{
      auth,
      firestore,
    }}><App /></Context.Provider>
  </React.StrictMode>
);
