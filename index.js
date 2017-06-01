const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const config = require('./.config')
const app = express();
/**
 * Middleware
 */
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(session({
    secret: 'config.secret',
    resave: false,
    saveUninitialized: false
}));
/**
 * Endpoints
 */
app.post('/api/cart', function(req, res) {
    const newProduct = req.body;
    if (!req.session.cart) {
        req.session.cart = [];
    }
    req.session.cart.push(newProduct);

    return res.status(200).send('OK');
});

app.get('/api/cart', function(req, res) {
    return res.status(200).send(req.session.cart)
})

app.listen(3000, function() {
    console.log('Listening on port 3000 yo')
});