// Soli Deo Gloria
const express = require("express");

const conn = require("./db/conn");
const Product = require("./models/Product");
const productsRoutes = require("./routes/productsRoutes");

const app = express();

app.use(express.json());

app.use("/", productsRoutes);

conn.sync()
    .then(() => {
        app.listen(4000, () => {
            console.log("Server is listening on port 4000");
        });
    })
    .catch((err) => {
        console.log(err);
    });
