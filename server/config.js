const { body } = require('express-validator');

const emailValidator = [
    body('name')
    .not().isEmpty()
    .trim()
    .escape(),
    body('email')
    .isEmail()
    .normalizeEmail(),
    body('surname') // bot trap field
    .isEmpty()
]

const allowedDomains = [
    'http://localhost:5000',
    'adrianpiwowarczyk.com',
    'http://www.adrianpiwowarczyk.com',
    'http://www.adrianpiwowarczyk.com:8013',
    'http://www.adrianpiwowarczyk.com:8014'
];

module.exports = {
    emailValidator,
    allowedDomains,
}