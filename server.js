const path = require('path');
const express = require('express');
const app = express();

var cors = require('cors');
app.use(cors());


app.get('/api/hello', function(req, res) {
    res.send("This is a normal text response")
})

app.get('/api/user', function(req, res) {
    var json = [ {name: 'ram'}, {name: 'thiyaga'} ];
    res.send(json)
})

app.get('/api/user/:id', function(req, res) {
    var json = {name: 'user-'+req.params.id};
    res.send(json)
})



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