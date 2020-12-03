const express = require('express'); //need this to create the router in the express module
const router = express.Router();  //allows us to find get and post routes
const bcrypt = require('bcrypt');
const db = require('../conf/database');

// const errorPrint = require('../')

router.get('/getAllUsers', (req, res, next) => {
    //res.send('getting all posts');
    //db.query or db.execute will run a query but if we run .execute, it will be faster since its cached; up to us to use
    db.query('SELECT * from users;', (err, results, fields) => {
        if (err) {
            next(err);
        }
        console.log(results);
        res.send(results);
    })
        .catch((err) => {
            next(err);
        })
});

router.get('/getAllPosts', (req, res, next) => {
    //the SELECT statement in here is changed from users to posts
    db.query('SELECT * from posts;', (err, results, fields) => {
        if (err) {
            next(err);
        }
        console.log(results);
        res.send(results);
    })
        .catch((err) => {
            next(err);
        })
});

router.post('/createUser', (req, res, next) => {
    console.log(req.body);
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let confirmpassword = req.body.confirmpassword;
    // let ageCheck = req.body.agecheck;
    // let rulesCheck = req.body.rulecheck;
    // let baseSQL = 'INSERT INTO users (username, password, email, created) VALUES (?, ?, ?, now())';

    //this will need to be implemented in front end
    if (((password == confirmpassword)) /*&& (agecheck && rulesCheck == 'on')*/) {
        //this will check if username already exists, if not then will redirect back to registration page
        db.execute("SELECT * FROM users WHERE username=?;", [username])
            .then(([results, fields]) => {
                if (results && results.length == 0) {
                    return db.execute("SELECT * FROM users WHERE email=?;", [email]);
                }
                else {
                    console.log("Registration failed, username already exists.");
                    res.redirect('/registrationfailed');
                }
            })
            //this will then check if email already exists.
            .then(([results, fields]) => {
                if (results && results.length == 0) {
                    //this line will encrypt the password typed in and returns it to the next .then() function
                    return bcrypt.hash(password, 10);
                }
                else {
                    console.log("Registration failed, email already exists.");
                    res.redirect('/registrationfailed');
                }
            })
            //when all conditions are met this will post the data of each user created into the database
            .then((hashedPassword) => {
                let baseSQL = 'INSERT INTO users (username, password, email, created) VALUES (?, ?, ?, now())';
                return db.execute(baseSQL, [username, hashedPassword, email]);
            })
            //after it posts to the database it will then redirect to a page based on the condition
            .then(([results, fields]) => {
                if (results && results.affectedRows) {
                    console.log("Registration Sucessful.");
                    res.redirect('/registrationsucess');
                }
                else {
                    console.log("User could not be created.");
                    res.redirect('/registrationfailed');
                }
            })
            //this statement will catch any unhandled errors.
            .catch((err) => {
                next(err);
            })
    }
    //will need to fix this later in front end javascript
    else {
        console.log("Password does not match or age and rule check not checked.");
        res.redirect('/registrationfailed');
    }

})

router.post('/validatelogin', (req, res, next) => {
    //console.log(req.body);
    let username = req.body.loginusername;
    let password = req.body.loginpassword;
    let userID;
    //let baseSQL = `SELECT * FROM users WHERE username="${username}" AND password="${password}"`;

    db.execute("SELECT id,password FROM users WHERE username=?", [username])

        .then(([results, fields]) => {
            if (results && results.length == 1) {
                //saves the entered password into hPassword
                let hPassword = results[0].password;
                userID = results[0].id;
                //this line will convert hPassword into actual password and compare with the 1st argument
                //returns true or false
                return bcrypt.compare(password, hPassword);
            } else {
                console.log("Login Failed, username or password is invalid.1");
                res.redirect('/loginfailed');
            }
        })
        .then((passwordMatches) => {
            if (passwordMatches) {
                console.log("Login Successful.");
                //create session object
                req.session.username = username;
                req.session.userID = userID;
                console.log(req.session);
                res.redirect('/loginsucess');
            } else {
                console.log("Login Failed, username or password is invalid.2");
                res.redirect('/loginfailed');
                
            }
        })
        .catch((err) => {
            next(err);
        })
})

router.post('/logout', (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            console.log("Failed to destroy session");
            next(err);
        }
        else {
            console.log("Session was destroyed");
            res.clearCookie('csid');
            res.redirect('/logout');
        }
    })
});
//search posts by title
router.post('/search', (req, res, next) => {
    let searchphrase = req.body.search;
    //console.log(searchphrase);
    let baseSQL = `SELECT * FROM posts WHERE title="${searchphrase}"`;
    db.promise().query(baseSQL, (err, result, fields) => {
        if (err) throw err;
        // console.log('asdaasd');
        //res.send(result);
        //redirect to searchresults.html 
    })
        .catch((err) => {
            next(err);
        })
})
module.exports = router; //going to expose "pool" into database class


