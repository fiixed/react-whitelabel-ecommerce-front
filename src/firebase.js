// import * as firebase from "firebase/app"; // old way, wont work anymore
import env from "react-dotenv";
import firebase from "firebase/app";
import "firebase/auth";
// firebase config
const firebaseConfig = {
    apiKey: env.API_KEY,
    authDomain: env.AUTH_DOMAIN,
    projectId: env.PROJECT_ID,
    storageBucket: env.STORAGE_BUCKET,
    messagingSenderId: env.MESSAGE_SENDER_ID,
    appId: env.APP_ID,
    measurementId: env.MEASUREMENT_ID
};
// initialize firebase app
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
// export
// export default firebase;
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();