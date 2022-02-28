import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "put your apiKey here",
  authDomain: "put your authDomain here",
  projectId: "put your projectId here",
  storageBucket: "put your storageBucket here",
  messagingSenderId: "put your messagingSenderId here",
  appId: "put your appId here",
};
const app = initializeApp(firebaseConfig);

export default app;
