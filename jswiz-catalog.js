// tutorial 2 https://www.youtube.com/watch?v=JEnGFGckk8A&list=PLGquJ_T_JBMSfMO7yPR7kkZCJc8xQg0Gf&index=2

var express = require('express');
var path = require('path');
var app = express();
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var port = 8080;

var url = "https://www.weddingwire.com/c/az-arizona/lighting-decor/24-sca.html"
request(url, function(err, resp, body){
    var $ = cheerio.load(body);
  var vendorName= $('div.hidden-xs:nth-child(7) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > a:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)');
  var vendorNameText=vendorName.text();  

    // var vendorLink= $('.testing-vendor-name');
    // var vendorLinkUrl= vendorLink.text();


    console.log=('vendorNameText');
//     $(vendorLink).each(function(i,link){
//         console.log('www.weddingwire.com/' + $(vendorLink).attr('href'));
//     });
// 
});
app.listen(port);
console.log('server running on ' + port);
