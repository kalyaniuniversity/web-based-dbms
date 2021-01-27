const express = require('express');
const path = require('path');
const body_parser = require('body-parser');
const app = express();

app.use(body_parser.json());
app.use(body_parser.urlencoded({
    extended: false
}));

app.set('view engine', 'ejs');
app.set('views', path.join(
    __dirname + '/template'
));

app.get('/', (request, response) => {
    console.log('the root URL is called');
    response.sendFile(
        path.join(
            __dirname + '/template/index.html'
        )
    );
});

app.get('/home', (request, response) => {
    response.sendFile(
        path.join(
            __dirname + '/template/home.html'
        )
    );
});

app.get('/hello', (request, response) => {
    response.send('Hello, World!');
});

app.get('/style/:filename', (request, response) => {
    const filename = request.params.filename;
    response.sendFile(
        path.join(
            __dirname + '/style/' + filename
        )
    );
});

app.get('script/:filename', (request, response) => {
    const filename = request.params.filename;
    response.sendFile(
        path.join(
            __dirname + '/script/' + filename
        )
    );
});

app.get('/user/:id', (request, response) => {
    const id = request.params.id;
    response.send('Hello, user -> ' + id + '!');
});

app.get('/company/:name/:type', (request, response) => {
    const name = request.params.name;
    const type = request.params.type;
    response.send('name -> ' + name + ' | type -> ' + type);
});

app.get('/contact', (request, response) => {
    response.sendFile(
        path.join(
            __dirname + '/template/contact.html'
        )
    );
});

app.post('/post/contact', (request, response) => {

    const firstname = request.body.firstname;
    const lastname = request.body.lastname;

    response.render('dynamic-contact', {
        firstname: firstname,
        lastname: lastname
    });
});

// the server starts over here
app.listen(8094, (request, response) => {
    console.log('The server has started!');
});