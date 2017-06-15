const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const nodemailer = require('nodemailer');
const stripe = require('stripe')(config.secretKey);
const session = require('express-session');
const massive = require('massive');
const moment = require('moment');
const app = express();

app.use(express.static(__dirname + './../public'));
app.use(bodyParser.json());

// massive({
//     host: 'localhost',
//     port: 5432,
//     database: 'personal_project'
// }).then(function(db) {
//     app.set('db', db);
// });

app.post('/api/test', (req, res, next) => {
    const { first, last, phone, email, date, time } = req.body;
    const info = {
        first,
        last,
        phone,
        email,
        date: moment(req.body.date).format('LL'),
        time
    }
    // const formattedDate = moment(date).format('LLLL')
    console.log(info);
})
app.post('/api/payment', (req, res, next) => {
    console.log(req.body);

    //convert amount to pennies
    const chargeAmt = req.body.amount;
    const amountArray = chargeAmt.toString().split('');
    const pennies = [];
    for (var i = 0; i < amountArray.length; i++) {
        if (amountArray[i] === ".") {
            if (typeof amountArray[i + 1] === "string") {
                pennies.push(amountArray[i + 1]);
            } else {
                pennies.push("0");
            }
            if (typeof amountArray[i + 2] === "string") {
                pennies.push(amountArray[i + 2]);
            } else {
                pennies.push("0");
            }
            break;
        } else {
            pennies.push(amountArray[i])
        }
    }
    const convertedAmt = parseInt(pennies.join(''));
    console.log("Pennies: ");
    console.log(convertedAmt);

    const charge = stripe.charges.create({
        amount: convertedAmt, // amount in cents, again
        currency: 'usd',
        source: req.body.payment.token,
        description: 'Test charge from grahms repo'
    }, (err, charge) => {
        console.log(res);
        res.sendStatus(200);
        // if (err && err.type === 'StripeCardError') {
        //   // The card has been declined
        // }
    });
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});