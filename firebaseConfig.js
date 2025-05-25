import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBwlyqWYPz8794UoKEfGh0oBuaAHFhcJMI",
  authDomain: "student-affairs-app-8efdf.firebaseapp.com",
  projectId: "student-affairs-app-8efdf",
  storageBucket: "student-affairs-app-8efdf.firebasestorage.app",
  messagingSenderId: "433807134731",
  appId: "1:433807134731:web:0f63be24dc5f13d4e6b70e",
  measurementId: "G-LYHK96NWFL"
};

const app = initializeApp(firebaseConfig);

export default app;
