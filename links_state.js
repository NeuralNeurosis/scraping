var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs-extra');


var destination=fs.createWriteStream('./links_state_catalog')
var url = "https://www.weddingwire.com/wedding-decor";
request(url, function(error, response, body){
  if (error){
      console.log("Couldn't get page because of error: "+ error);
      return;
  }

  
  $ = cheerio.load(body);

//   var companyName =$('div.state a:nth-child(2)');
//   var companyNameText = companyName.text();
  links = $('div.state a.strong:nth-child(2)');

  links.each(function(i, link){
      var url= $(link).attr("href");

      destination.write("www.weddingwire.com" + url + ", ")
      console.log(url);
   });



});
 

