// tutorial 2 https://www.youtube.com/watch?v=JEnGFGckk8A&list=PLGquJ_T_JBMSfMO7yPR7kkZCJc8xQg0Gf&index=2
// This is my first succsessful attempt at getting the final data I needed from one individual page. Now I need to link this app with the vendor_by_state app 
// so that this app is called everytime as it goes through each url in the Array.




var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs-extra');


var url = "https://www.weddingwire.com/biz/alobars-lighting-and-sound-saint-louis/ab48cd073159cfba.html"


request(url, function(err, resp, body){
    var $ = cheerio.load(body);
                var companyName =$('.storefrontHeader__title');
                var companyNameText = companyName.text();
                var companyNameText1 = companyNameText.replace(/\s+/g, ' ').trim(); 
                
                var location= $('.storefrontHeaderOnepage__address');
                var locationText= location.text();
                var locationText1 = locationText.replace(/\s+/g, ' ').trim(); 
                
                var telephone= $('.storefrontAdresses__content > span:nth-child(6)');
                var telephoneText=telephone.text();
                var telephoneText1=telephoneText.replace(/\s+/g, ' ').trim();;
                
    // fs.writeFile('./vendor_contact_info.json', JSON.stringify(vendor, null, 4), (err)=>{
    //     if (err) {
    //         console.error(err);
    //         return;
    //     };
    //     console.log("File Has been Created");

    // });
    var ven={
        companyName:companyNameText1,
        location:locationText1,
        telephone:telephoneText1
    };

    console.log(ven);

})

