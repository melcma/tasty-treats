const fs = require('fs');

function isProduction() {
    return process.env.NODE_ENV === "production";
}

function emailExists(data, email) {
    return data.includes(email);
}

function loadEmailsFromFile(file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) return reject(err);

            resolve(data.toString());
        })
    })
}

function saveEmailToFile(data, file) {
    fs.writeFile(file, data, { flag: 'a' }, err => {
        if (err) throw err;
    })
}

function csvToJson(data) {
    return data
        .toString()
        .split('\n')
        .map(line => line.split(','));
}

function formValuesToCsv(data) {
    const { name, email, subscribe = 'No', message } = data;
    return `${name}, ${email}, ${subscribe}, "${message}"\n`;
}

module.exports = {
    emailExists,
    loadEmailsFromFile,
    saveEmailToFile,
    formValuesToCsv,
    csvToJson,
    isProduction,
}