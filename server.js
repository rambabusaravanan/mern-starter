const path = require('path');
const express = require('express');
const app = express();

const mongo = require('mongoskin');
const db = mongo.db(process.env.MONGOURL || "mongodb://localhost:27017/test", { native_parser: true });
console.log('DB URL', process.env.MONGOURL || "mongodb://localhost:27017/test")

/* API CONTROLLERS */

var cors = require('cors');
app.use(cors());

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/hello', function(req, res) {
    res.send("This is a normal text response")
})

app.get('/api/user', function(req, res) {
    // using simple callback
    getUsers((users) => {
        res.send(users)
    })
})

app.get('/api/user/:id', function(req, res) {
    // using simple promise
    getUserById(req.params.id).then((users) => {
        res.send(users)
    })
})

app.post('/api/user', function(req, res) {
    console.log(req.body)
    createUser(req.body, () => {
        res.sendStatus(201);
    })
})

app.get('/api/search', function(req, res) {
    console.log(req.query)
    if(req.query.name)
        getUsersByName(req.query.name, (users) => {         // using callback
            res.send(users)
        })
    else if (req.query.age)
        getUsersByAge(req.query.age).then((users) => {      // using promise
            res.send(users)
        })
})


/* DATABASE SERVICE */

db.bind('user')

function getUsers(callback) {   // using callback
    db.user.find().toArray(function(err, users) {
        callback(users)
    });
}

function getUserById(id) {      // using promise
    return new Promise((resolve, reject) => {
        db.user.findById(id, function(err, users) {
            if(err) reject(err)
            resolve(users)
        })
    });
}

function createUser(data, callback) {      // using callback
    db.user.save(data, function() {
        callback()
    });
}

function getUsersByName(name, callback) {   // using callback
    db.user.find({name: name}).toArray(function(err, users) {
        callback(users)
    });
}

function getUsersByAge(age) {               // using promise
    return new Promise((resolve, reject) => {
        db.user.find({age: parseInt(age)}).toArray(function(err, users) {
            if(err) reject(err)
            resolve(users)
        })
    });
}


/* SERVE REACT PAGES */

// Serve static assets
app.use(express.static(path.resolve(__dirname, 'build')));

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});



/* START SERVER */

app.listen(5000, function() {
    console.log("Server listening on port 5000")
});