var Profile = require("./profile.js");
var renderer= require("./renderer.js");
var querystring=require("querystring");
var commonHeaders={'Content-type':'text/html'};



//2. Handle HTTP reoutr GET / and POST i.e Home
function home(request, response){
//if url == "/" && GET
  
  if(request.url==="/"){
    if(request.method.toLowerCase()==="get"){
  
        //show search
        response.writeHead(200, commonHeaders);
        renderer.view("header", {}, response);
        renderer.view("search", {}, response);
        renderer.view("footer", {}, response);
        response.end();
    }else{
        //if url=="/" && POST
          //get the post data from body
          request.on("data", function(postBody){
          //console.log(postBody.toString());  
          //extract the username
          var query=querystring.parse(postBody.toString());
            //redirect to /:username
          response.writeHead(303, {"Location":"/"+query.username});  
          response.end();
                
         });
          
          
    }
  }

  

}

//3. Handle HTTP route GET  /: username i.e. /chalkers
function user(request, response){
  //if url =="/..."
  var username=request.url.replace("/", "");
  if(username.length>0){
    response.writeHead(200, commonHeaders);
    renderer.view("header", {}, response);
    
    //get json from Treehouse
    var studentProfile = new Profile(username);
    
  /**
  * When the JSON body is fully recieved the 
  * the "end" event is triggered and the full body
  * is given to the handler or callback
  **/
    studentProfile.on("end", function(profileJSON){
    //show profile
      
      
      //store the values which we need
      var values ={
        avatarUrl: profileJSON.gravatar_url,
        username: profileJSON.profile_name,
        badges: profileJSON.badges.length,
        jsPoints:profileJSON.points.JavaScript
      }
      //simple response
      renderer.view("profile", values, response);
      renderer.view("footer", {}, response);
      response.end();
    });
    //on error
    studentProfile.on("error", function(error){
      //show error
      renderer.view("error", {errorMessage:error.message}, response);
      renderer.view("search", {}, response);
      renderer.view("footer", {}, response);
      response.end();
    });
    
  }
}


module.exports.home=home;
module.exports.user=user;