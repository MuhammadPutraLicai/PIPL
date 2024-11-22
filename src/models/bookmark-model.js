const {addDataBookmarks, getDataById} = require('../../configs/db')

class Bookmark{
    async retrieveBookmark(bookmarkId){
        const bookmarkData = await getDataById("bookmarks", bookmarkId);
        return bookmarkData.data.daftar_pemasok;
    }  

    async updateBookmark(bookmarkData, bookmarkId){
        await addDataBookmarks(bookmarkData, bookmarkId);
        return 1;
    }
}

module.exports= {Bookmark};

//below code only for testing purpose
/*const coba = new Bookmark();
coba.retrieveBookmark("YjMQYbiy8FfRDs6SD97W").then((result)=>{
    console.log(result);
});*/