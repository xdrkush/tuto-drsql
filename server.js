/*
 * Server.js
 ******************************/
const
    express = require('express'),
    app = express(),
    mysql = require('mysql'),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 4000;

require('dotenv').config()

// Mysql
db = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) console.error('error connecting: ' + err.stack);
    console.log('connected as id ' + db.threadId);
});

// Body Parser qui nous permet de parser des data d'une req a une autre
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// Router
const ROUTER = require('./controllers/router')
app.use(ROUTER)

// Lancement de l'application
app.listen(port, () => {
    console.log("le serveur tourne sur le port: " + port);
});