// This is my first attempt at putting all the successful scraping from each page into one application.
// I really don't know have how to call each of them in the correct order to accomplish what I want here

var request = require('request');
var cheerio = require('cheerio');

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

      console.log(url);
   });


//    each states catalog
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

      console.log(url);
   });
   



});
 


// ecah vendors page

var url = "https://www.weddingwire.com/biz/denali-north-events-homer/1ad991ac1f3a2e16.html"


request(url, function(err, resp, body){
    var $ = cheerio.load(body);
    var companyName =$('.h4 span.js-storefront-click-tracking');
    var companyNameText = companyName.text();
    // var state_url = $(elem).find("a.darkstrong").attr("href");

    var location= $('.testing-location-header a')
    var locationText= location.text();

    var telephone= $('.testing-phone-number .js-phone-replacer a')
    var telephoneText=telephone.text();

    var vendor={
        companyName:companyNameText,
        location:locationText,
        telephone:telephoneText,
    };




    console.log(vendor);

})
});
 

