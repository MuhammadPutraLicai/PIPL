const express = require('express');
const {updateBookmark, createBookmarkList} = require('../src/controllers/bookmark-controller');
const bookmark = express.Router();

bookmark.post('/add', async (req, res)=>{
    const userBookmark = req.cookies.bookmark;
    const result = await updateBookmark( userBookmark, req.body.pemasokId);
    if (result == 1) {
        res.status(200);
        res.json({taskResult : 1, message : "New Pemasok has been successfully addded to bookmarks"});
    } else {
        res.status(500);
        res.json({taskResult : 0, message : "This Pemasok is already exist in bookmarks"});
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

module.exports = bookmark;