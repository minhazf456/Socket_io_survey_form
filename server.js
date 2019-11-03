/// loading express module
const express = require('express');
const app = express();
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + "/static")); // Set static folder for html and css files.
app.set('view engine', 'ejs'); // Set ejs views engine
app.set('views', __dirname + '/views'); // Set location for ejs views
app.use(express.static(__dirname + "/static")); // Allows us to use the static files
const server = app.listen(1337);
const io = require('socket.io')(server);
app.get('/', function (req, res) { //This is our index page, just rendering the template with the form
    res.render("index")
})
/// Listen to connection event from the client side

io.sockets.on('connection', function(socket){
    // server listen to post_form event 
    socket.on("post_form", function(data){
        // generate random number
        var random_number= Math.floor((Math.random() * 1000) + 1);
        /// now server will emit the data to the client side
        socket.emit('update_message', {response :data});
        socket.emit('random_number', {response: random_number});
    })
})