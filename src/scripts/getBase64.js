const fs = require("fs");

const file = fs.readFileSync("serviceAccountKey.json");
const encoded = Buffer.from(file).toString("base64");

console.log(encoded);