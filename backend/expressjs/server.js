const express = require('express');
const path = require('path');
const mysql = require('mysql');
const body_parser = require('body-parser');
const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    port: '3308', // by default 3306
    user: 'root',
    password: 'password',
    database: 'nodejs'
});

db.connect();

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

app.get('/testdb', (request, response) => {

    console.log('testdb');

    let res = null;

    db.query(
        'SELECT 2 + 2 AS result',
        (error, results, fields) => {
            if (error) {
                res = 'An error occured!';
                response.send(res);
            } else {
                res = results[0].result;
                response.send(String(res));
            }
        }
    );
});

app.get('/contacts', (request, response) => {

    const statement = 'select * from contact';

    db.query(
        statement,
        (error, results, fields) => {
            if (error) {
                response.send('An error occured!');
                throw error;
            } else {
                console.log(results);

                let res = '';

                results.forEach(function (row, index) {
                    res += row.name + ' : ' + row.contactnumber + '<br/>';
                });

                response.send(res);
            }
        }
    );
});

app.get('/testinsert', (request, response) => {

    const newContact = {
        name: 'Kejriwal',
        email: 'muffler@gmail.com',
        contactnumber: '7291231239'
    };

    const statement = 'insert into contact set ?';

    db.query(
        statement,
        newContact,
        (error, results, fields) => {
            if (error) response.send('an error occured');
            else {
                console.log(results);
                response.send('successful!');
            }
        }
    );
});

// the server starts over here
app.listen(8094, (request, response) => {
    console.log('The server has started!');
});