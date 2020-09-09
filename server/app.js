const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const { validationResult } = require('express-validator');

const emailsPath = (`${path.resolve(__dirname, '../data/emails.csv')}`);
const { emailExists, loadEmailsFromFile, saveEmailToFile, formValuesToCsv, csvToJson } = require('./helpers');
const { emailValidator, allowedDomains } = require('./config');

app.use(bodyParser.urlencoded({ extended: true }),);
app.use(express.json());

app.get('/api/customers', (req, res) => {
    if (allowedDomains.includes(req.headers.origin)) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    }
    
    loadEmailsFromFile(emailsPath).then((data) => {
        res.send(csvToJson(data));
     })
});

app.post('/api/email', emailValidator, (req, res) => {
    const errors = validationResult(req);
    const emailData = req.body;
    const { email } = emailData;

    if (allowedDomains.includes(req.headers.origin)) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    }

    if (errors.array().find(error => error.param === 'name')) {
        return res.status(400).json({
            code: 'name',
            msg: 'Invalid name'
        });
    }

    if (errors.array().find(error => error.param === 'email')) {
        return res.status(400).json({
            code: 'email',
            msg: 'Invalid email'
        });
    }

    if (errors.array().find(error => error.param === 'surname')) {
        return res.status(400).json({
            code: 'bot',
            msg: 'Bot captured'
        });
    }

    loadEmailsFromFile(emailsPath).then(data => {
        if (emailExists(data, email)) {
            return res.status(400).json({
                code: 'in-use',
                msg: 'Email is already in our database'
            });
        }

        saveEmailToFile(formValuesToCsv(emailData), emailsPath);

        return res.json({
            code: 'ok',
            msg: 'Email has been saved'
        });
    })
    .catch(err => {
        res.status(400).json({
            code: 'unknown',
            msg: 'Unknown error occurred'
        });
    });
})

module.exports = app;
