var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs-extra');

var urls = [
    "https://www.weddingwire.com/biz/alobars-lighting-and-sound-saint-louis/ab48cd073159cfba.html",
    "https://www.weddingwire.com/biz/vivid-events-brookfield/00210c5f91f42dc0.html",
    "https://www.weddingwire.com/biz/cv-linens-austin/4818f98e267c8c6c.html",
    "https://www.weddingwire.com/biz/linens-and-more-florida-key-largo/287e6f9209b48c11.html",
    "https://www.weddingwire.com/biz/fabrication-events-fl-inc-cocoa-beach/cf1168bffd307a24.html",
    "https://www.weddingwire.com/biz/mystic-lites-mesa/a9af1dda03ca3676.html",
    "https://www.weddingwire.com/biz/event-lighting-draping-decor-anaheim/6a1b5e9e5222a2cf.html",
    "https://www.weddingwire.com/biz/arizona-uplighting-bistro-string-lighting-up-lighting-monogram-paper-lanterns-phoenix/314443dbd1d63b7e.html",
    "https://www.weddingwire.com/biz/inspirations-floral-event-design-arroyo-grande/4bf54b1f88b959e3.html",
    "https://www.weddingwire.com/biz/burlap-to-bling-everything-in-between-houston/e8e2311730d87b48.html",
    "https://www.weddingwire.com/biz/mrit-event-technologies-richardson-new-orleans/68db2e0a55add271.html",
    "https://www.weddingwire.com/biz/mugwump-productions-jacksonville/1924c2b483e96ad2.html",
    "https://www.weddingwire.com/biz/dream-design-productions/bfde706adfc3d4fc.html",
    "https://www.weddingwire.com/biz/lumen-lighting-lindon/9b0ed2da00d1dcee.html",
    "https://www.weddingwire.com/biz/divine-celebrations-stockbridge/4dc8d8a03b5e967a.html",
    "https://www.weddingwire.com/biz/enigma-fireworks-alpharetta/a04c8b391c21372a.html",
    "https://www.weddingwire.com/biz/got-light-san-francisco/e9bed6ac7027daa3.html",
    "https://www.weddingwire.com/biz/spark-creative-events-goleta/56e3056b668b7cd2.html",
    "https://www.weddingwire.com/biz/huqa-live-washington/11d09b545cd5095f.html",
    "https://www.weddingwire.com/biz/bearfly-designs-llc-new-lebanon/3878a0e7224dbc96.html"
]

var requests = urls.map(processUrl);

var vendor =[];
function processUrl(url){
    
    request(url,function(error, response, body){
        if(!error){
                var $ = cheerio.load(body);
                var companyName =$('.storefrontHeader__title');
                var companyNameText = companyName.text();
                var companyNameText1 = companyNameText.replace(/\s+/g, ' ').trim(); 
                
                var location= $('.storefrontHeaderOnepage__address');
                var locationText= location.text();
                var locationText1 = locationText.replace(/\s+/g, ' ').trim(); 
                
                var telephone= $('.storefrontAdresses__content span.app-phone-replace');
                var telephoneText=telephone.text();
                var telephoneText1=telephoneText.replace(/\s+/g, ' ').trim();;
                
    
    var ven={
        companyName:companyNameText1,
        location:locationText1,
        telephone:telephoneText1
    };


                vendor.ven= ven;
                console.log(ven);

            } else {
                (error)
                console.log("We've encountered an error: " + error);
            }   
        });
}

Promise.all(requests)
.then()
.catch(console.log("Caught some Errors like an STD and just can't get rid of them.")); // Error: Whoops!
    
