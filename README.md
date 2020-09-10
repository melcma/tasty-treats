A test application,

features:  
A form capturing name, email, subscribe boolean and message  
Frontend validation and server-side form validation  
Saving entries to file and reading from it  
A bot spam prevention

Frontend is static html files and backend is written in Node.js and Express server, it uses express-validator to validate forms on a backend  
Client and Server are in separated docker containers  

run "yarn dev" or "npm run dev" locally

App:  
http://www.adrianpiwowarczyk.com:8013/index  
http://www.adrianpiwowarczyk.com:8013/emails  

API:  
http://www.adrianpiwowarczyk.com:8014/api/customers (GET)  
http://www.adrianpiwowarczyk.com:8014/api/email (POST)  

Node.js, Express, express-validator, Docker, Ansible, HTML, CSS, JavaScript
