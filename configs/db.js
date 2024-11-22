const { initializeApp, deleteApp } = require("firebase/app");
const { doc, setDoc, getDoc, collection, 
        query, where, terminate, addDoc,
        getDocs, getFirestore, limit, updateDoc } = require("firebase/firestore"); 
const fs = require('fs');
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
    const result = {};
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    //console.log(docSnap.id);
    //console.log(docSnap.data());
    if (docSnap.exists()) {
        result.id = docSnap.id;
        result.data = docSnap.data();
        console.log(`found dokument in collection ${collectionName} with id : ${docId}`);
        return result;
    }else{
        console.error(`You're trying to read a document in ${collectionName},
         but document with id : ${docId} doesn't exist`);
        return 0; 
    }
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
    fs.mkdir(`./uploads/${docRef.id}`, (err)=>{
        if (err) {
            console.log('Failed to create directory for new pemasok');
            console.error(err);
            return;
        }
        console.log('successfully creating new directory for new pemasok');
    });
    return docRef.id;
}

//menambahkan dokumen baru ke collection customer
async function addDataCustomer(customerData){
    const docRef = await addDoc(collection(db, "customer"), customerData);//customerData is js object
    console.log("New customer document has been created with ID :", docRef.id);
    return docRef.id;
}

//menambahkan dokumen baru dan update dokumen ke collection bookmark
async function addDataBookmarks(bookmarks = null, docId = null){
    if(bookmarks){
        const docRef = await setDoc(doc(db, "bookmarks", docId), { daftar_pemasok : bookmarks});
        console.log(`bookmarks with id : ${docId} has been updated`);
        return 1;
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

//mengambil dokumen pada collection berdasarkan query
async function getDataByEmailPassword(email, password, coll){
    const docRef = collection(db, coll);
    const q = query(docRef, where("email", "==", email), where("password", "==", password));
    let result = {};

    const querySnapShot = await getDocs(q);

    if (querySnapShot.empty) {//check if document doesn't exist after searching
        console.log(`No document found with email ${email} in ${coll} collection`);
        result = null;
        return result;
    }
    querySnapShot.forEach((doc)=>{
        //console.log(doc.id, "=>", doc.data());
        result['id'] = doc.id;
        result['data'] = doc.data();
    });
    console.log(`found document with email : ${email}`);
    return result;
}

module.exports = {
    getAllData,
    getDataById,
    addDataPemasok,
    addDataCustomer,
    addDataBookmarks,
    addDataDaftarProduk,
    getDataByEmailPassword
};

/*below code is for testing purpose
getDataById("pemasok", "1").then((result)=>{
    console.log(result);
});*/