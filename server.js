const express = require('express');
const app = express();


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



app.listen(5000, function() {
    console.log("Server listening on port 5000")
});