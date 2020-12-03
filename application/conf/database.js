const mysql = require('mysql2');

//cannot reassign pool to something else
//but can change the data inside pool, for example, pool.id="aoishdaio"; works
//cannot do pool = { id: "asoidha"} after 'const pool' is already defined
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "webdatabase",
    database: "csc317db",
    connectionLimit: 50,
    //waitForConnection: true,
    debug: false //false by default, comes in handy when there are errors in statements, will dump a lot of info into console
});

pool.getConnection(function(err)
{
    if(err) throw err;
    console.log('Connected.');
});

const promisePool = pool.promise();
module.exports = promisePool;

//in terminal type in:
// curl -X GET localhost:3000/dbtest/getALLUsers
//will display an array of all the users information created in MySQL
//can also go into browser and type in:
//localhost:3000/dbtest/getALLUsers
//and it will display the same thing

//module.exports = pool;

//another way of logging into database as found on npmjs.com
//but this is a one-way connection
// var connection = mysql.createConnection(
//     {
//         host: "localhost",
//         user:"root",
//         password: "webdatabase",
//         connectionLimit: 50,
//         debug: false,
//     }
// );

// connection.connect(function(err) {
//     if (err) {
//       console.error('Error connecting: ' + err.stack);
//       return;
//     }
//     console.log('Connected.');
//   });