require('dotenv').config();
const nodemailer = require('nodemailer');
const moment = require('moment');




module.exports = {
    sendEmail: (req, res) => {
        const {first, last, phone, email, date, time} = req.body
        let newdate = moment(date).format('LL')
        const message = `${first} ${last} has requested an apppointment on ${newdate} at ${time}. Contact at ${phone} or ${email}`

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: true,
            auth: {
                user: process.env.emailuser,
                pass: process.env.emailpass
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: `"Appointment Request" <${process.env.fromemail}>`, // sender address
            to: process.env.toemail, // list of receivers
            subject: 'Requested Appointment', // Subject line
            text: message, // plain text body
            // html: `<b>${ req.body.body }</b>` // html body
        };


        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error)
                res.send(error)
            }
            // console.log('Message %s send: %s', info.messageId, info.response);
            res.status(200).send(info);
        });

    },
    sendMessage: (req, res) => {
        const {name, email, phone, comments, checkbox} = req.body
        

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: true,
            auth: {
                user: process.env.emailuser,
                pass: process.env.emailpass
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: `${name} <${email}>`, // sender address
            to: process.env.toemail, // list of receivers
            subject: 'Contact us', // Subject line
            text: comments, // plain text body
            // html: `<b>${ req.body.body }</b>` // html body
        };


        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error)
                res.send(error)
            }
            // console.log('Message %s send: %s', info.messageId, info.response);
            res.status(200).send(info);
        });

    }
}