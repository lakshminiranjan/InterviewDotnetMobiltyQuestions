import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDEQvprqJgz47am8WfWeXfeij1iKvjtJXo',
  authDomain: 'emitracker-4175b.firebaseapp.com',
  projectId: 'emitracker-4175b',
  storageBucket: 'emitracker-4175b.firebasestorage.app',
  messagingSenderId: '285478829086',
  appId: '1:285478829086:web:f39dd892dc277e4978420f',
  measurementId: 'G-Z88LDN2DLV'
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
