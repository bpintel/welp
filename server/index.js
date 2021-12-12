const express = require('express');
const PORT = process.env.PORT || 3001;
//make app an instance of the express library
const app = express();
//node mod to use paths
const path = require('path');
const dbUtils = require('../database/helpers.js');

//middleware example
// const myLogger = (req, res, next) => {
//    console.log(`${req.method} received at endpoint ${req.baseUrl} `);
//    next();
// }
//use example
// app.use('/', myLogger);

//test route to test server
// app.get('/api', (req, res) =>{
//     // console.log('I saw a request here')
//     res.send('Success!');
// })

//automatically parse json
app.use(express.json());

//looks for a static webpage
//use pathname to dynamically join our directory with our index.html file 
//remember this!!!!!
app.use(express.static(path.join(__dirname, '../client/public')));

//get route for all choices
app.get('/app/main/:id', (req, res) =>{
    // console.log("request received"
    dbUtils.getAll((err, results)=> {
        err ? res.send(err) : res.send(results)
    })
    // res.send('Should return all choices from DB');
})

//get route to return a specific restaurant
// app.get('/app/main/:id', (req, res) =>{
//     // res.send('Should return specific restaurants from  DB');
//     var { id } = req.params;
//     dbUtils.addOne(id, (err, results) => {
//         err ? res.send(err) : res.send(results)
//     })
// })

//post to add a restaurant in the body
app.post('/app/main', (req, res) =>{
    console.log(req.body);
    // res.send('Should post choices to DB');
    // res.send('Should return specific restaurants from  DB');
    dbUtils.addOne(req.body, (err, results) => {
        err ? res.send(err) : res.send(results)
    })
})

//delete routes for deleting specific restaurant, or all
app.delete('/app/main', (req,res) => {
    // res.send('Should delete hella stuff');
    // console.log(req.body);
    dbUtils.deleteOne(req.body, (err, results)=> {
        err ? res.send(err) : res.send(results)
    })
})

//listen for requests!
app.listen(PORT, (err) => {
    console.log(err ? err : `listening on ${PORT}`)
})