const http = require("http");
const url = require("url");
const port = 3000;
// 1st And 2nd Question
const userObject = [
  {
    username: "shivamsaxena",
    password: "pass",
    firstname: "shivam",
    lastname: "saxena",
  },
  {
    username: "fenilamliwala",
    password: "pass1",
    firstname: "fenil",
    lastname: "amliwala",
  },
  {
    username: "namansharma",
    password: "pass2",
    firstname: "naman",
    lastname: "sharma",
  },
  { username: "abcxyz", password: "pass3", firstname: "abc", lastname: "xyz" },
  { username: "abcstu", password: "pass4", firstname: "pqr", lastname: "stu" },
];

const studentObject = [
  { name: "shivam", branchName: "mca" },
  { name: "fenil", branchName: "btech" },
  { name: "naman", branchName: "bca" },
  { name: "abc", branchName: "mca" },
  { name: "pqr", branchName: "btech" },
];

const server = http.createServer((req, res) => {
  console.log("req method ", req.method);
  console.log("req url ", req.url);

  console.log("req query ", req.query);

  const queryObject = url.parse(req.url, true).query;
  console.log("queryObject  ", queryObject);

  if (req.method !== "GET") {
    // res.end(`{error: "${http.STATUS_CODES[405]}"}`)
    //The Filter is Done On the basis of branch Name
    if (req.url === "/students?" + Object.keys(queryObject)[0]) {
      const queryStud = Object.keys(queryObject)[0];
      const studentData = studentObject.filter(
        (data) => data.branchName === queryStud
      );

      res.end(JSON.stringify(studentData));
    }
  } else {
    if (req.url === "/") {
      res.end(
        `<h1>User Data : </h1><br/>
            ` + JSON.stringify(userObject)
      );
    }
    if (req.url === "/search?" + Object.keys(queryObject)[0]) {
      //check in username if queryParam matches
      const query = Object.keys(queryObject)[0];
      const newList = userObject.filter(
        (arr) => arr.username.search(query) !== -1
      );
      if (newList.length > 0) {
        res.end(`<h1>Matched Data : </h1><br/>` + JSON.stringify(newList));
      }
      res.end(`<h1>Matched Data : </h1><br/>None`);
    }
    if (req.url === "/students") {
      res.end(JSON.stringify(studentObject));
    }
  }
  //   res.end(`{error: "${http.STATUS_CODES[404]}"}`);
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
