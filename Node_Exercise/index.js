//Sync Way

// var fs = require('fs');
// var contents = fs.readFileSync('./hello.txt','utf8'); 
// console.log(contents);
// console.log("Hello Node\n");


//Async Way

// var fs = require('fs');
// var contents = fs.readFile('./hello.txt','utf8', function(err,contents){
//    console.log(contents);
// });
// console.log("Hello Node\n");


var NumSquare = require('./module');
NumSquare.getSquare(5);