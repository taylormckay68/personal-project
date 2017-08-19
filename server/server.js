require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const stripe = require('stripe')(process.env.secretKey);
const session = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0')
const massive = require('massive');
const moment = require('moment');
const mailController = require('./controllers/mailController');
const mainController = require('./controllers/controller')
const app = express();


app.use(bodyParser.json());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.sessionSecret
}))
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + './../public'));

massive(process.env.connectionString).then(function (db) {
    app.set('db', db);
    console.log('DB set');
});

passport.use(new Auth0Strategy({
        domain: process.env.auth0domain,
        clientID: process.env.auth0clientID,
        clientSecret: process.env.auth0clientSecret,
        callbackURL: '/auth/callback'
    },
    function (accessToken, refreshToken, extraParams, profile, done) {
        // //Find user in database
        var db = app.get('db');
        // // console.log(db.functions);
        // done(null, profile)

        db.getUserByAuthId([profile.id]).then((response) => {
            user = response[0];
            if (!user && profile.id === process.env.auth0authorized1) {
                console.log('CREATING USER');
                db.createUserByAuth([profile.displayName, profile.id]).then((user) => {
                    return done(null, user)
                })
            } else if(user && profile.id === process.env.auth0authorized1){
                console.log('FOUND USER', user);
                return done(null, user);
            } else {
                return done(null, user);
            }
        })
    }
));

//THIS IS INVOKED ONE TIME TO SET THINGS UP
passport.serializeUser(function (userA, done) {
    console.log('serializing', userA);
    var userB = userA;
    //Things you might do here :
    //Serialize just the id, get other information to add to session, 
    done(null, userB); //PUTS 'USER' ON THE SESSION
});

//USER COMES FROM SESSION - THIS IS INVOKED FOR EVERY ENDPOINT
passport.deserializeUser(function (userB, done) {
    var userC = userB;
    //Things you might do here :
    // Query the database with the user id, get other information to put on req.user
    done(null, userC); //PUTS 'USER' ON REQ.USER
});

app.get('/auth', passport.authenticate('auth0'));

app.get('/auth/callback',
    passport.authenticate('auth0', {
        successRedirect: '/#/admin',
        failureRedirect: '/#/home'
    }),
    function (req, res) {
        res.status(200).send(req.user);
    })

app.get('/auth/me', function (req, res) {
    if (!req.user) return res.sendStatus(404);
    //THIS IS WHATEVER VALUE WE GOT FROM userC variable above.
    res.status(200).send(req.user);
})

app.get('/auth/logout', function (req, res) {
    req.logout();
    res.redirect('/#/home');
})


app.get('/api/getPatients', mainController.getPatients);

app.get('/api/getPayments', mainController.getPayments);

app.get('/api/getTotal', mainController.getTotal);

app.post('/api/addPatient', mainController.addPatient);

app.post('/api/addPayment', mainController.addPayment)

app.post('/api/sendrequest', mailController.sendEmail)

app.post('/api/sendMessage', mailController.sendMessage);


app.post('/api/payment', (req, res, next) => {

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

    const charge = stripe.charges.create({
        amount: convertedAmt, // amount in cents, again
        currency: 'usd',
        source: req.body.payment.token,
        description: 'Test charge from grahms repo'
    }, (err, charge) => {
        res.sendStatus(200);
        // if (err && err.type === 'StripeCardError') {
        //   // The card has been declined
        // }
    });
});

app.listen(process.env.PORT || 3001, () => {
    console.log(`Listening of port ${process.env.PORT || 3001}`);
});