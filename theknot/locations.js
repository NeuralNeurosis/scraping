var cheerio = require('cheerio');
var fs =require('fs');

$ = cheerio.load(fs.readFileSync('locations.html'));

var locations = $('.item--b98c9');
locations.map(function(i, link){
    var cities = link.text();
    var modified = cities + " blue";

    console.log(modified);
 });

// console.log(modified);




// console.log("hello" + cities + " ;");


