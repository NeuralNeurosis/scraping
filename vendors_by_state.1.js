// tutorial 2 https://www.youtube.com/watch?v=JEnGFGckk8A&list=PLGquJ_T_JBMSfMO7yPR7kkZCJc8xQg0Gf&index=2

var cheerio = require('cheerio');
var fs = require('fs-extra');
var request = require('request');
var firebase = require('firebase').initializeApp({
  serviceAccount:"./ww-vendors-03b87c67e2de.json",
  databaseURL:"https://weddingwire-scrape.firebaseio.com/"
})
var url = "https://www.weddingwire.com/c/al-alabama/lighting-decor/24-sca.html";
request(url, function(error, response, body){
  if (error){
      console.log("Couldn't get page because of error: "+ error);
      return;
  }

  
  $ = cheerio.load(body);

//   var companyName =$('div.state a:nth-child(2)');
//   var companyNameText = companyName.text();
  links = $('div.thumbnail-overlay a.js-catalog-click');

  links.each(function(i, link){
      var url= $(link).attr("href");

      var endpoint={
        url:url,

      }
      console.log(endpoint);
      console.log(url);
   });
   



});
