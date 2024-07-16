const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const port = process.env.PORT || 9000;

const app = express();
app.use(cors());
app.use(express.json());

const con = mysql.createConnection({
    host: "sql12.freesqldatabase.com",
    user: "sql12720200",
    password: "GjiWFRJDNP",
    database: "sql12720200",
    port: 3306
});

con.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL:", err);
        return;
    }
    console.log("Connected to MySQL");
});

app.post("/save", (req, res) => {
    let data = [req.body.name, req.body.feedback];
    let sql = "INSERT INTO student (name, feedback) VALUES (?, ?)";
    con.query(sql, data, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

app.listen(port, () => { console.log("Server ready @ " + port); });
