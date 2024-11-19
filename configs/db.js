const { initializeApp, deleteApp } = require("firebase/app");
const { doc, setDoc, getDoc, collection, 
        query, where, terminate, addDoc,
        getDocs, getFirestore, limit, updateDoc } = require("firebase/firestore"); 
const fireBaseConfig = require("./config.js");
// Initialize Firebase
const app = initializeApp(fireBaseConfig);
const db = getFirestore(app);

//mengambil semua dokumen pada koleksi tertentu
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

//mengambil dokumen berdasarkan id dokumen
async function getDataById(collectionName, docId) {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    console.log(docSnap.id);
    console.log(docSnap.data());
}

//menambahkan dokumen baru dengan id random(dibuat oleh firebase)
//menambah dokumen baru ke colletion pemasok
async function addDataPemasok(pemasokData) {
    /*const docRef = await addDoc(collection(db, "pemasok"),{
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
    });*/
    const docRef = await addDoc(collection(db, "pemasok"), pemasokData);
    console.log("New pemasok document has been created with ID :", docRef.id);

}

//menambahkan dokumen baru ke collection customer
async function addDataCustomer(customerData){
    const docRef = await addDoc(collection(db, "customer"), customerData);//customerData is js object
    console.log("New customer document has been created with ID :", docRef.id);
}

//menambahkan dokumen baru dan update dokumen ke collection bookmark
async function addDataBookmarks(bookmarks = null, docId = null){
    if(bookmarks){
        const docRef = await setDoc(doc(db, "bookmarks", docId), { daftar_pemasok : bookmarks});
        console.log(`bookmarks with id : ${docId} has been updated`);
    }else{
        const docRef = await addDoc(collection(db, "bookmarks"),{ daftar_pemasok : null});
        console.log("New bookmark document has been written with ID :", docRef.id);
        return docRef.id; //return the bookmark document's id that has been created
    }
}

//menambahkan dokumen baru dan update dokumen ke collection daftar_produk
async function addDataDaftarProduk(daftarProduk = null, docId = null){
    if(daftarProduk){
        const docRef = await setDoc(doc(db, "daftar_produk", docId), { produk : daftarProduk});
        console.log(`daftar_produk with id : ${docId} has been updated`);
    }else{
        const docRef = await addDoc(collection(db, "daftar_produk"),{ produk : null});
        console.log("New daftar_produk document has been written with ID :", docRef.id);
        return docRef.id; //return the bookmark document's id that has been created
    }
}

module.exports = {
    getAllData,
    getDataById,
    addDataPemasok,
    addDataCustomer,
    addDataBookmarks,
    addDataDaftarProduk
};