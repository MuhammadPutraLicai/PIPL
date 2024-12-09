const express = require('express');
const {updateBookmark, createBookmarkList, deleteBookmark} = require('../src/controllers/bookmark-controller');
const bookmark = express.Router();

bookmark.post('/add', async (req, res)=>{
    const userBookmark = req.cookies.bookmark;
    const result = await updateBookmark( userBookmark, req.body.pemasokId);
    if (result == 1) {
        res.status(200);
        res.json({taskResult : 1, message : "Berhasil menambahkan pemasok ke dalam bookmarks"});
    } else {
        res.status(500);
        res.json({taskResult : 0, message : "Pemasok sudah ada di dalam bookmarks"});
    }
});

bookmark.get('/retrieve', async(req, res)=>{
    const userBookmark = req.cookies.bookmark;
    const bookmarkItems = await createBookmarkList(userBookmark);
    if (bookmarkItems) {//check if bookmarks is not null
        res.status(200);
        res.json(bookmarkItems);
    }else{
        res.status(200);
        res.json({});
    }
});

bookmark.delete('/delete', async(req, res)=>{
    const userBookmark = req.cookies.bookmark;
    const deletedPemasok = req.body.pemasokId;
    console.log(`deleting pemasok with id : ${deletedPemasok} from bookmarks`);
    await deleteBookmark(userBookmark, deletedPemasok);
    res.json({message : "ok"});
});

module.exports = bookmark;