// src/sections/firebase.jsx
import { initializeApp } from "firebase/app";
import { getDatabase, ref as dbRef, set, onValue, remove, push } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBasJY3q_xJ4pmb3NY-hbVt4pRd0QLnvro",
  authDomain: "persianstories-c0d1d.firebaseapp.com",
  databaseURL: "https://persianstories-c0d1d-default-rtdb.firebaseio.com/",
  projectId: "persianstories-c0d1d",
  storageBucket: "persianstories-c0d1d.appspot.com",
  messagingSenderId: "636214961250",
  appId: "1:636214961250:web:19b7a83396d913edbe5d3b",
  measurementId: "G-SMXHCNWGD8"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);

// export با نام‌های مناسب — dbRef را بعنوان ref اکسپورت می‌کنیم تا کد فعلی‌ات بدون تغییر بماند
export {
  database,
  storage,
  dbRef as ref,
  set,
  onValue,
  remove,
  push,
  storageRef,
  uploadBytes,
  getDownloadURL
};
