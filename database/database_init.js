const mysql = require('mysql2');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'welp',
})


connection.connect((err) => {
    err ? console.log(err) : console.log('connected to db');
});


module.exports = connection;