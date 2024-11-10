const { initializeApp, deleteApp } = require("firebase/app");
const { doc, setDoc, getDoc, collection, 
        query, where, terminate, addDoc,
        getDocs, getFirestore, limit } = require("firebase/firestore"); 
const fireBaseConfig = require("./config.js");
// Initialize Firebase
const app = initializeApp(fireBaseConfig);
const db = getFirestore(app);

//mengambil semua dokumen
async function getAllData(collectionName){
    const q = query(collection(db, collectionName), limit(15));
    const querySnapShot = await getDocs(q);
    const dokumentList = [];
    //masukkan data dari database ke array
    querySnapShot.forEach((doc) => {
        dokumentList.push({
            id : doc.id,
            data : doc.data()
        });
    });
    return dokumentList;
}

//mengambil dokumen berdasarkan id
async function getDataById(collectionName, docId) {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    console.log(docSnap.id);
    console.log(docSnap.data());
}

//menambahkan dokumen dengan id random
async function addData() {
    const docRef = await addDoc(collection(db, "pemasok"),{
        nama_perusahaan: "Industri Jaya Makmur",
        jenis_perusahaan: "Manufaktur",
        jenis_produk: "Produk Elektronik, Komponen Otomotif",
        tahun_didirikan: 1995,
        owner: "Sri Hartati",
        nomor_telepon: "",
        email: "sri@industri.co.id",
        password: "", 
        link_logo: "https://industri.co.id/logo.png",
        link_website: "https://industri.co.id",
        deskripsi: "Perusahaan manufaktur terkemuka yang memproduksi berbagai produk elektronik berkualitas tinggi.",
        alamat: "Kawasan Industri Jababeka, Cikarang, Jawa Barat, Indonesia"
    });

    console.log("Document written with ID: ", docRef.id);
}

module.exports = {
    getAllData,
    getDataById
};