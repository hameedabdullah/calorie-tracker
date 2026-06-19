const fs = require("fs");
const path = require("path");
const db = require("../db");

async function initializeDatabase() {

    try {

        const schema = fs.readFileSync(

            path.join(__dirname, "schema.sql"),

            "utf8"

        );

        await db.query(schema);

        console.log("Database initialized successfully.");

    } catch (error) {

        console.log(error);

    }

}

module.exports = initializeDatabase;