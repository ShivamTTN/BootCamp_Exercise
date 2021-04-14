
//Buffer Example
let buf;
const fs = require("fs");
fs.readFile("./index.txt", "utf-8", (err, data) => {
  buf = Buffer.from(data);
  console.log("Buffer data", buf);
  console.log("Buffer Length", buf.length);
  console.log("Readable form of Buffer data", buf.toString());
  console.log(buf.toJSON());
  console.log(buf.slice());
});
