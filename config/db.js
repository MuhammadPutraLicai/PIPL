const { initializeApp } = require("firebase/app");
const { doc, setDoc, getDoc, getFirestore } = require("firebase/firestore"); 
const fireBaseConfig = require("./config.js");
// Initialize Firebase
const app = initializeApp(fireBaseConfig);
const db = getFirestore(app);

const docRef = doc(db, "pemasok", "1");
async function getData() {
    const docSnap = await getDoc(docRef);
    return docSnap;
}

getData().then((value)=>{console.log(value.data())});