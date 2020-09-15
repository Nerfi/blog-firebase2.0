// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCZC3ZYFBHfN5Rnq7tajrkIn7nSf3G15YI",
  authDomain: "blog-firebase-20.firebaseapp.com",
  databaseURL: "https://blog-firebase-20.firebaseio.com",
  projectId: "blog-firebase-20",
  storageBucket: "blog-firebase-20.appspot.com",
  messagingSenderId: "598007828906",
  appId: "1:598007828906:web:8ddfcd485c1807f432dbd3",
  measurementId: "G-64PW7XWZET"
};

//initilalizing the app
firebase.initializeApp(firebaseConfig);

//exporting firebase
export default firebase;



console.log({firebase})
