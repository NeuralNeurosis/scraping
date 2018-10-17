var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs-extra');

var baseURI ="https://www.weddingwire.com/lighting-decor?page=43"

var baseUriArray =["https://www.weddingwire.com/lighting-decor?page=43",
"https://www.weddingwire.com/lighting-decor?page=44",
"https://www.weddingwire.com/lighting-decor?page=45",
"https://www.weddingwire.com/lighting-decor?page=46",
"https://www.weddingwire.com/lighting-decor?page=47",
"https://www.weddingwire.com/lighting-decor?page=48",
"https://www.weddingwire.com/lighting-decor?page=49",
"https://www.weddingwire.com/lighting-decor?page=50",
"https://www.weddingwire.com/lighting-decor?page=51",
"https://www.weddingwire.com/lighting-decor?page=52",
"https://www.weddingwire.com/lighting-decor?page=53",
"https://www.weddingwire.com/lighting-decor?page=54",
"https://www.weddingwire.com/lighting-decor?page=55",
"https://www.weddingwire.com/lighting-decor?page=56",
"https://www.weddingwire.com/lighting-decor?page=57",
"https://www.weddingwire.com/lighting-decor?page=58",
"https://www.weddingwire.com/lighting-decor?page=59",
"https://www.weddingwire.com/lighting-decor?page=60",
"https://www.weddingwire.com/lighting-decor?page=61",
"https://www.weddingwire.com/lighting-decor?page=62",
"https://www.weddingwire.com/lighting-decor?page=63",
"https://www.weddingwire.com/lighting-decor?page=64",
"https://www.weddingwire.com/lighting-decor?page=65",
"https://www.weddingwire.com/lighting-decor?page=66",
"https://www.weddingwire.com/lighting-decor?page=67",
"https://www.weddingwire.com/lighting-decor?page=68",
"https://www.weddingwire.com/lighting-decor?page=69",
"https://www.weddingwire.com/lighting-decor?page=70",
"https://www.weddingwire.com/lighting-decor?page=71",
"https://www.weddingwire.com/lighting-decor?page=72",
"https://www.weddingwire.com/lighting-decor?page=73",
"https://www.weddingwire.com/lighting-decor?page=74",
"https://www.weddingwire.com/lighting-decor?page=75",
"https://www.weddingwire.com/lighting-decor?page=76",
"https://www.weddingwire.com/lighting-decor?page=77",
"https://www.weddingwire.com/lighting-decor?page=78",
"https://www.weddingwire.com/lighting-decor?page=79",
"https://www.weddingwire.com/lighting-decor?page=80",
"https://www.weddingwire.com/lighting-decor?page=81",
"https://www.weddingwire.com/lighting-decor?page=82",
"https://www.weddingwire.com/lighting-decor?page=86",
"https://www.weddingwire.com/lighting-decor?page=83",
"https://www.weddingwire.com/lighting-decor?page=84",
"https://www.weddingwire.com/lighting-decor?page=85",
"https://www.weddingwire.com/lighting-decor?page=87",
"https://www.weddingwire.com/lighting-decor?page=88",
"https://www.weddingwire.com/lighting-decor?page=89",
"https://www.weddingwire.com/lighting-decor?page=90",
"https://www.weddingwire.com/lighting-decor?page=91",
"https://www.weddingwire.com/lighting-decor?page=92",
"https://www.weddingwire.com/lighting-decor?page=93",
"https://www.weddingwire.com/lighting-decor?page=94",
"https://www.weddingwire.com/lighting-decor?page=95",
"https://www.weddingwire.com/lighting-decor?page=96",
"https://www.weddingwire.com/lighting-decor?page=97",
"https://www.weddingwire.com/lighting-decor?page=98",
"https://www.weddingwire.com/lighting-decor?page=99",
"https://www.weddingwire.com/lighting-decor?page=100",
"https://www.weddingwire.com/lighting-decor?page=101"
]

getVendorContactAsync()
.then(function(data){
    fs.writeFile('./returned data/promises/vendorcontact44-101.json', JSON.stringify(data, null, 4), (err)=>{
        if (err) {
            console.error(err);
            return;
        };
        console.log("File Has been Created");

    });
    console.log(data);
})
.catch(function(err){
    console.log(err);
});


function getVendorEndPointsAsync(){
     new Promise(function(resolve, reject){
        
        
        var promises = baseUriArray.map(function (ends){
        
            return new Promise(function (resolve, reject){

        request(ends, function(error, response, body){

            if (!error){
 
                var $ = cheerio.load(body);
 
                var storage =[];
                links = $('div.directory-item-content a.item-title');
                 links.each(function(i, link){
                      var urlText= $(link).attr("href");
                      storage.push(urlText);
                  });
                var storageUrl = storage;
             resolve(storageUrl);
            }else{
                reject('SHITTTTTTT ');
            }
      });
    });
});
return Promise.all(promises);

})
.then(function (data1){
    console.log(data1);
})
.catch(function (err){
    return Promise.reject(err);
});

}

function getVendorContactAsync(){
    return getVendorEndPointsAsync().then(function (endpoints){
        
        var promises = endpoints.map(function (endpoint){
            
            return new Promise(function (resolve, reject){

                request(endpoint, function(error, response, body){
                    if(!error) {
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
                        url:endpoint,
                        companyName:companyNameText1,
                        location:locationText1,
                        telephone:telephoneText1
                        };
                        resolve(ven);
    
    
                        // console.log(ven);
                        } else {
    
                            console.log("We've encountered an error: " + error);
                        }
                   });
                });
            });
        return Promise.all(promises);
        })
        .then(function(data){
            return data;
        })
        .catch(function(err){
            return Promise.reject(err);
        });
    }
    



    
