const express = require("express");
const app = express();
const cors = require("cors");

const bcrypt = require("bcrypt");
const clevel = 10;

const mysql = require("mysql");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "lrsys"
})

app.use(express.json());
app.use(cors());

app.post("/api/v1/register", (req, res) => {
    let login = req.body.email;
    let password = req.body.password;

    if(login == null || !login.includes("@") || login.startsWith("@") || typeof login !== "string") return res.sendStatus(400); // Bad Request.
    if(password == null || password.length <= 6 || typeof password !== "string") return res.sendStatus(400); // Bad Request.

    db.query("SELECT * FROM users WHERE email = ?", [login], (err, result) => {
        if (err) return res.sendStatus(500); // Internal Server Error.
        if (result.length > 0) return res.send({message: "Email já cadastrado."});

        bcrypt.hash(password, clevel, (err, encrypted) => {

            if (err) return res.sendStatus(500); // Internal Server Error.

            db.query("INSERT INTO users (email, password) VALUE (?,?)", [login, encrypted], (err, response) => {
                if(err) return res.sendStatus(500); // Internal Server Error.
    
                res.send({message: "Usuário cadastrado com sucesso."})
            })

        })

    })

});

app.post("/api/v1/login", (req, res) => {
    let login = req.body.email;
    let password = req.body.password;

    if(login == null || !login.includes("@") || login.startsWith("@") || typeof login !== "string") return res.sendStatus(400); // Bad Request.
    if(password == null || password.length <= 6 || typeof password !== "string") return res.sendStatus(400); // Bad Request.

    db.query("SELECT * FROM users WHERE email = ?", [login], (err, result) => {
        if (err) return res.sendStatus(500); // Internal Server Error.
        if (result.length <= 0) return res.send({message: "Usuário ou senha incorretos."}); // email não cadastrado

        bcrypt.compare(password, result[0].password, (err, response) => {
            if (err) return res.sendStatus(500); // Internal Server Error.
            if(response) return res.send({message: "Usuário logado com sucesso."})
            res.send({message: "Usuário ou senha incorretos."}); // senha não condiz com a database
        })

    })

})

port = process.env.PORT || 3001
app.listen(port, () => console.log(`Listening on port ${port}...`))