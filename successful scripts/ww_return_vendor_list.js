// I am attempting to link the request in vendor_by_state to teh function in jswiz-webscraping.js which searchs the individuals vendor page for the final data.
// VENDOR LIST Links from each state
// LAYOUT OF SITE CHANGED THIS SCRIPT IS NO LONGER NECESSARY
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs-extra');
// var Q = require('q');


// List of vendors in a specific state

function getLinks(callback){
var url = "https://www.weddingwire.com/c/al-alabama/lighting-decor/24-sca.html";
request(url, function(error, response, body){
  if (error){
    callback(new Error('upload failed:', error),null);
  }
  var linksList=[];
  
  $ = cheerio.load(body);

//   css selector for the a href 
  links = $('div.hidden-xs div div div div.thumbnail-overlay a.js-catalog-click');

  links.each(function(i, link){
      var urlText= $(link).attr("href");

      linksList.push("https://www.weddingwire.com"+ urlText);

      
   });
   
   callback(null, linksList);
});
}
getLinks(function(err,links){
    if(err) return console.log(err);
    // this is where we open the stream and write the JSON file
    fs.writeFile('./vendors-al-page-1.json', JSON.stringify(links, null, 4), (err)=>{
        if (err) {
            console.error(err);
            return;
        };
        console.log("File Has been Created");

    });
    console.log(links);

});


