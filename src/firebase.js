import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyCceKt88r8P58PREoqwzfhI4hyVjMrAfTc',
  authDomain: 'hotel-181f9.firebaseapp.com',
  projectId: 'hotel-181f9',
  storageBucket: 'hotel-181f9.appspot.com',
  messagingSenderId: '257323621832',
  appId: '1:257323621832:web:6b9ce91603d1ba9c2234fd',
  databaseURL: 'https://hotel-181f9-default-rtdb.europe-west1.firebasedatabase.app/',
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

export const storage = getStorage(app);
