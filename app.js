'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;
const path = require('path');
const favicon = require('serve-favicon');
const app = express();
const rates = require('./lib/eu-rates');
const Vat = require('./lib/vat');
const actions = ['add','remove','amount'];


app.disable('x-powered-by');

app.set('view engine', 'ejs');
app.set('env', 'development');


app.use(favicon(path.join(__dirname, 'favicon.png')));

app.use('/public', express.static(path.join(__dirname, '/public'), {
    maxAge: 0,
    dotfiles: 'ignore',
    etag: false
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res) => {
   res.render('index', {rates: rates});
});

app.post('/calculate', (req, res) => {
    let action = req.body.action;
    let value = parseInt(req.body.value, 10);
    let amount = Number(req.body.amount);

    if(actions.indexOf(action) !== -1) {
        let vatInstance = new Vat(value);
        let output = vatInstance[action](amount);
        res.json({vat: output});
    } else {
      res.sendStatus(403);
    }

});



if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
    });
}

app.use((err, req, res, next) => {
    res.status(err.status || 500);
});

app.listen(port);
