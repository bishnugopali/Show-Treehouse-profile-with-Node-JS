var router=require("./router.js");

//problem:we need a simple way to look at a user's badge count & JS point from a web browser
//solution:use Node.js to perform the profile look ups and server our template via HTTP


//1. Create a web server
const http = require('http');

const server = http.createServer((request, response) => {
  router.home(request, response);
  router.user(request, response);
});
server.listen(8000);
console.log('Server running at http://<workspace-url>');


//2. Handle HTTP route GET/ and POST / i.e. Home -> see router.js for solution
//if url=="/" && GET
  //show search page
//if url=="/" && POST
  //redirect to /:username


//3. Handle HTTP route GET /:username i.e /bishnugopali2 ->see router.js for solution
//if url== "/...."
  //get json from Treehouse
  //on "end"
    //show profile
//on "error"
  //show error


//4. Function that handles the reading of files and merge in value -->renderer.js
  //read from file and get a string
  //merge values in to string

