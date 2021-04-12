const http = require("http");
const fs = require("fs");
const url = require("url");
// 3rd Question
const renderPage = (filename, req, res) => {
  fs.readFile(`./${filename}`, (err, file) => {
    res.write(file);
    res.end(``);
  });
};

const server = http.createServer((req, res) => {
  // console.log('inside create')
  const queryObject = url.parse(req.url, true);
  console.log("queryobject", queryObject);
  req.url = queryObject.pathname;
  switch (req.url) {
    case "/home":
    case "/about":
    case "/contact-us":
      renderPage("index.html", req, res);
      break;
    case "/index.css":
      //   res.end();
      renderPage("index.css", req, res);
      break;
    default:
      res.end(`Wrong Link`);
      break;
  }
});

server.listen(4000, () => {
  console.log("http://127.0.0.1:4000");
});
