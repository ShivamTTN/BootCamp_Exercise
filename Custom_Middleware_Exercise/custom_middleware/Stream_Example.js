const http = require("http");
const fs = require("fs");
//Stream And Pipe Example
const server = http.createServer((req, res) => {
  const read_stream = fs.createReadStream("./index.txt");
  const write_stream = fs.createWriteStream("./data.txt");
  read_stream.pipe(write_stream);
  //   const display_stream = fs.createReadStream("./data.txt");
  //   display_stream.pipe(res);
  res.end();
});
server.listen(3000, () => {
  console.log("Listning ...........");
});
