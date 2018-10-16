// Multiple tests here.
// Created a callback function that iterated through a list of links and returned each one as a json like object and then put them in an array
// Next in the callback I figured out how to export that JSON data into a file using fs stream. This was faciltated by the module fs-extra
// and the use of JSON.stringify.  
// This was the final successful code
// Acquires all the links to each INDIVIDUAL STATE
// LAYOUT OF SITE CHANGED HAD TO CHANGE THE CALLOUT FOR urlText variable
// This is Now Successful

var async = require('async');
var express = require('express');
var path = require('path');
var app = express();
var writable= require('stream');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs-extra');
var events = require('events');

function getLinks(callback){

var url = "https://www.weddingwire.com/lighting-decor";
request(url, function(error, response, body){
  if (error){
    callback(new Error('upload failed:', error),null);
  }
  var linksList=[];
  
  $ = cheerio.load(body);
  
  links = $('div.directory-item-content a.item-title');

  links.each(function(i, link){
    
      var urlText= $(link).attr("href");
   
      linksList.push(urlText);
      
   });
   
   callback(null, linksList);
});
}
getLinks(function(err,links){
    if(err) return console.log(err);
    // this is where we open the stream and write the JSON file
    fs.writeFile('./statelinks.json', JSON.stringify(links, null, 4), (err)=>{
        if (err) {
            console.error(err);
            return;
        };
        console.log("File Has been Created");

    });
    console.log(links);
});
 



