var express = require("express");
var router = express.Router();
const db = require("../conf/database");
const multer =  require('multer');  //a middleware for handling multipart/form-data, primarily for uploading files
const sharp = require('sharp');     //this will help us resize images
const crypto = require('crypto');   //use this to change file names

//we should put the multer close to the function for using multer
//can be seen as a security vulnerability
var storage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null, "public/images/uploads");
    },
    filename: function(req,file,cb) {
        //this will split name of the filename and gets the file type for example, gets ".jpeg"
        let fileExt = file.mimetype.split("/")[1];
        //this will get 22 random bytes and converts to string in hex values
        let randomName = crypto.randomBytes(22).toString("hex");
        //call the callback function to set the filename
        cb(null,`${randomName}.${fileExt}`);
    }
});

//this uploader variable will help set some properties for the image being uploaded into the multer storage
var uploader = multer({storage: storage});

router.post('/createPost', uploader.single('image-path'), (req,res,next) => {
    // console.log(req.body);
    let fileUploadedPath = req.file.path;
    let fileAsThumbnail = `thumbnail-${req.file.filename}`;
    let destOfThumbnail = req.file.destination +"/" + fileAsThumbnail;
    let title = req.body.imagetitle;
    let description = req.body.imagedescription;
    let fk_userid = req.session.userID;
    sharp(fileUploadedPath)
        .resize(200,100)
        .toFile(destOfThumbnail)
        .then(() => {
            let baseSQL = 'INSERT INTO posts (title, description, photopath, thumbnailpath, created, fk_userid) VALUE (?,?,?,?,now(),?);';
            return db.execute(baseSQL,[title,description,fileUploadedPath,destOfThumbnail,fk_userid]);
        })
        .then(([results,fields]) => {
            if(results && results.affectedRows) {
                console.log('New post created.');
                // res.redirect('/');
                res.json({status: "OK",message:"Post was created.", redirect:"/"});
            } 
            else {
                //will only happen when results return nothing
                //res.send('Post was not created');
                console.log('Post was not created');
                res.json({status: "OK",message:"Post was not created.", redirect:"/postfailed"});
                // res.redirect('/postfailed');
            }
        })
        .catch((err) => {next(err)});

    console.log(req.file);
});
//posts/search/searchString
router.get('/search/:searchString', (req,res,next) => {
    let searchString = req.params.searchString;
    let baseSQL = 'SELECT p.id, p.title, p.description, p.thumbnailpath, u.username \
    FROM csc317db.posts p \
    JOIN csc317db.users u on p.fk_userid=u.id \
    WHERE title LIKE ?;';
    searchString = "%" + searchString + "%";
    db.query(baseSQL,[searchString])
    .then(([results, fields]) => {
        res.json(results);
    })
    .catch((err) => next(err));
})

router.get('/getMostRecent', (req,res,next) => {
    let baseSQL = "SELECT p.id, p.title, p.description, p.thumbnailpath, u.username \
    FROM csc317db.posts p \
    JOIN csc317db.users u on p.fk_userid=u.id \
    ORDER BY p.created DESC \
    LIMIT 9"
    db.query(baseSQL)
    .then(([results, fields]) => {
        res.json(results);
    })
    .catch((err) => next(err));
});

router.get('/getAllPosts', (req,res,next) => {
    let baseSQL = "SELECT p.id, p.title, p.description, p.thumbnailpath, u.username \
    FROM csc317db.posts p \
    JOIN csc317db.users u on p.fk_userid=u.id";
    db.query(baseSQL)
    .then(([results, fields]) => {
        res.json(results);
    })
    .catch((err) => next(err));
});

router.get('/postimage/:id', (req,res,next) => {
    res.sendFile('post.html', {root:'public/html'});
})

router.get('/getPostByID/:id', (req,res,next) => {
    let _id = req.params.id;
    let baseSQL = "SELECT p.id, p.title, p.description, p.photopath, p.created, u.username \
    FROM csc317db.posts p \
    JOIN csc317db.users u on p.fk_userid=u.id \
    WHERE p.id=?";
    db.query(baseSQL, _id)
    .then(([results, fields]) => {
        res.json(results[0]);
    })
    .catch((err) => next(err));
})

module.exports = router;