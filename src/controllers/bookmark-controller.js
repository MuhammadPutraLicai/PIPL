const {Bookmark} = require('../models/bookmark-model');
const {CardPemasok} = require('../models/pemasok-model');

async function updateBookmark(userBookmark, selectedPemasokId) {
    const bookmarkId = userBookmark;//ambil id bookmark dari user
    const newBookmark = new Bookmark();
    let bookmarkContent = await newBookmark.retrieveBookmark(bookmarkId);
    if (bookmarkContent) {//true if bookmark content is not null
        //console.log("current bookmark content ", bookmarkContent);
        if(bookmarkContent.includes(selectedPemasokId)){//check if selected pemasok already on bookmarks
            return 0;
        }
        bookmarkContent.push(selectedPemasokId);
    }else{
        bookmarkContent = [selectedPemasokId];
    }
    await newBookmark.updateBookmark(bookmarkContent, bookmarkId);
    return 1;
}

async function createBookmarkList(userBookmark){
    let result = {};
    const bookmarkId = userBookmark;//ambil id bookmark dari user

    const newBookmark = new Bookmark();
    let bookmarkContent = await newBookmark.retrieveBookmark(bookmarkId);//retrive bookmark data
    if (bookmarkContent) {//true if bookmark content is not null
        const pemasok = new CardPemasok();
        for (const idPemasok of bookmarkContent) {
            let cardData = await pemasok.getCardPemasok(idPemasok);
            result[idPemasok] = cardData;
        }
        return result;
    }else{
        result = null;
        return result;
    }
}
module.exports = {updateBookmark, createBookmarkList};

//createBookmarkList("7mscjzLMhlIqm3V1J6UC").then(result =>{console.log(result)});