require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

app.post('/login', (req, res) => {
    const sql = 'Select * FROM users WHERE email = ? AND password = ?';
    const values = [req.body.email, req.body.password];

    db.query(sql, values, (err, data) => {
        if (err) return res.json('Error!');
        if (data.length > 0) {
            return res.json('Login Successfull!');
        } else {
            return res.json('No record!');
        }
    })
});

app.listen(8081, () => {
    console.log('Listening...');
});
