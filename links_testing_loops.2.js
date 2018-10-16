// testing iterating through multiple urls
// This was one of the tests trying to figure out how to just create a json object from the scraped data and write it to a file
// It was successful at creating the json object but not a successful write as i didn't use JSON.stringify

var async = require('async');
var express = require('express');
var path = require('path');
var app = express();
var writable= require('stream');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs-extra');

function getLinks(callback){

var url = "https://www.weddingwire.com/wedding-decor";
request(url, function(error, response, body){
    if (error){
        console.log("Couldn't get page because of error: "+ error);
        return;
    }
  
  $ = cheerio.load(body);
  var destination=fs.createWriteStream('./statelinks');
  
  links = $('div.state a.strong:nth-child(2)');
  
  links.each(function(i, link){
      var stateText=$(link).attr("title");
      var urlText= $(link).attr("href");
      var stateUrl={
          state:stateText,
          url:"www.weddingwire.com"+urlText,
      }
      
    });
    
    
    destination.write(links);
    console.log(links);

});
 

