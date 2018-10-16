// This is the first test of creating an array of the data that I was scraping


var async = require('async');
var express = require('express');
var path = require('path');
var app = express();
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

function getLinks(callback){
var url = "https://www.weddingwire.com/wedding-decor";
request(url, function(error, response, body){
  if (error){
    callback(new Error('upload failed:', error),null);
  }
  var linksList=[];
  $ = cheerio.load(body);

  links = $('div.state a.strong:nth-child(2)');

  links.each(function(i, link){
      var stateText=$(link).attr("title");
      var urlText= $(link).attr("href");
      var stateUrl={
          state:stateText,
          url:urlText,
      }
      linksList.push(stateUrl);
   });
   callback(null, linksList);
});
}
getLinks(function(err,links){
    if(err) return console.log(err);
    console.log("www.weddingwire.com" + links);
});

 

