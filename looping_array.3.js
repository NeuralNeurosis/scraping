// using callbacks instead of promises give me the data just like all the other attempts. It still won't save outside teh function though
// Looping over each vendors links to get their contact info upon further reading callbacks dont seem to be the best method for writing this. 
// It seems that promises or async libraries are the standard method.
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs-extra');
var async = require('async');



var urls = [
    "https://www.weddingwire.com/biz/platinum-ent-dj-event-lighting-mirror-photo-booth-rental-birmingham/ee91f5ff81e8f72c.html",
    "https://www.weddingwire.com/biz/beths-uppercase-living-chelsea/945a98f34aec48c0.html",
    "https://www.weddingwire.com/biz/kdb-rustic-vintage-creations-alabaster/0f315462e8240191.html",
    "https://www.weddingwire.com/biz/jamm-entertainment-services-inc-birmingham/99d6539234bc18dd.html",
    "https://www.weddingwire.com/biz/dreams-by-k-crawford-all-inclusive-events-llc-tuscaloosa/0ddd229db7f77b7d.html",
    "https://www.weddingwire.com/biz/led-orange-huntsville/29204f4bb491b9a2.html",
    "https://www.weddingwire.com/biz/your-perfect-party-huntsville/2dddd4d190a4893a.html",
    "https://www.weddingwire.com/biz/on-site-productions-birmingham/dfc32bc8fb5582bb.html",
    "https://www.weddingwire.com/biz/stage-party-event-lighting-and-dj-tallassee/611aa822a3372af9.html",
    "https://www.weddingwire.com/biz/party-starter-entertainment-birmingham/e87a625f3f809d48.html",
    "https://www.weddingwire.com/biz/metropolitan-disc-jockey-service-owens-cross-roads/f225f6b1c52e2a84.html",
    "https://www.weddingwire.com/biz/creative-events-party-rentals-prattville/fe2bf15263ef47ab.html",
    "https://www.weddingwire.com/biz/design-productions-llc-birmingham/2159639a1c24da18.html"
];

urls.forEach(getLinks)
function getLinks(callback){

    request(url, (error, response, body)=>{
        if (error){
            console.log("This didn't work: ", error);
            return cb();
        }
        var vendors=[]
        var $ = cheerio.load(body);
        var companyName =$('.h4 span.js-storefront-click-tracking');
        var companyNameText = companyName.text();
            
        var location= $('.testing-location-header a')
        var locationText= location.text();
        var telephone= $('.testing-phone-number .js-phone-replacer a')
        var telephoneText=telephone.text();
            
         var vendor={
            url:url,
            companyName:companyNameText,
            location:locationText,
            telephone:telephoneText
                }
        vendors.push(vendor)

        

      });
   
   callback(null, vendor);
}

getLinks(function(err,links){
    if(err) return console.log(err);
    // this is where we open the stream and write the JSON file
    // fs.writeFile('./statelinks.json', JSON.stringify(links, null, 4), (err)=>{
    //     if (err) {
    //         console.error(err);
    //         return;
    //     };
    //     console.log("File Has been Created");

    console.log(vendor);
});



