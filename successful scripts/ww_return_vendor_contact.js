// tutorial 2 https://www.youtube.com/watch?v=JEnGFGckk8A&list=PLGquJ_T_JBMSfMO7yPR7kkZCJc8xQg0Gf&index=2
// This is my first succsessful attempt at getting the final data I needed from one individual page. Now I need to link this app with the vendor_by_state app 
// so that this app is called everytime as it goes through each url in the Array.




var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs-extra');


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

    fs.writeFile('./vendor_contact_info.json', JSON.stringify(vendor, null, 4), (err)=>{
        if (err) {
            console.error(err);
            return;
        };
        console.log("File Has been Created");

    });


    console.log(vendor);

})




