const express = require('express');

const app = express();


app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
app.use(express.static('ui-js'));
app.use(express.static('images'));

module.exports = app;

