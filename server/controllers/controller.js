module.exports = {
    getPatients: (req, res, next) => {
        req.app.get('db').getAllPatients().then((resp) => {
            res.send(resp);
        })
    },
    getPayments: (req, res, next) => {
        req.app.get('db').getAllPayments().then((resp) => {
            res.send(resp);
        })
    },
    getTotal: (req, res, next) => {
        req.app.get('db').getTotalBalance().then((resp) => {
            res.send(resp);
        })
    },
    addPatient: (req, res, next) => {
        let patient = [
            req.body.patientid,
            req.body.first,
            req.body.last,
            req.body.address,
            req.body.city,
            req.body.state,
            req.body.zip,
            req.body.balance                                                                        
        ]
        req.app.get('db').addPatient(patient).then((resp) => {
            res.status(200).send(resp);
        })
    },
    addPayment: (req, res, next) => {
        let payment = [
            req.body.firstname,
            req.body.lastname,
            req.body.patientid,
            req.body.payment
        ];
        req.app.get('db').addPayment(payment).then((resp) => {
            res.status(200).send(resp);
        })
    }
    
}