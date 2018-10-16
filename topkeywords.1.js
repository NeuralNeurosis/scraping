// https://gist.github.com/elliotbonneville/1bf694b8c83f358e0404
// for some reason I can't push my vendors to each 

var request = require("request"),
	cheerio = require("cheerio"),
	url = "https://www.weddingwire.com/wedding-decor",
	corpus = {},
	totalResults = 0,
	resultsDownloaded = 0;

function callback(){
	resultsDownloaded++;
	
	if (resultsDownloaded !== totalResults) {
		return;
	}
	
	var vendors = [];

	// vendors.push(vendor)

	// finally, log the vendors 
	console.log(vendors);
}

request(url, function (error, response, body) {
	if (error) {
		console.log("1 Couldn’t get page because of error:"  + error);
		return;
	}
	
	// load the body of the page into Cheerio so we can traverse the DOM
	var $ = cheerio.load(body),
	
		links = $('div.state a.strong:nth-child(2)');

  links.each(function(i, link){
    //   var stateText=$(link).attr("title");
	  var url= $(link).attr("href");
	  
	  url = "https://weddingwire.com" + url;
      
      
		
		// this link counts as a result, so increment results
		totalResults++;
		
		// download that page
		request(url, function (error, response, body) {
			if (error) {
				console.log("2Couldn’t get page because of error:" + error);
				return;
			}

			var $state = cheerio.load(body);
			links = $('.hidden-xs div div div div div.thumbnail-overlay a.js-catalog-click');

             links.each(function(i, link){
			 var url= $state(link).attr("href");
			 url = "https://weddingwire.com" + url;
			


			 request(url, function (error, response, body) {
				if (error) {
					console.log("3Couldn’t get page because of error:" + error);
					return;
				}
			
			    var $vendor =cheerio.load(body);
			    
                companyName =$('#storefront-header-info div div div img.storefront-header-image').attr("alt");
                // var state_url = $(elem).find("a.darkstrong").attr("href");
         
                var location= $vendor('.testing-location-header a')
                var locationText= location.text();

                var telephone= $vendor('.testing-phone-number .js-phone-replacer a')
                var telephoneText=telephone.text();

                var vendor={
                    companyName:companyName,
                    location:locationText,
                    telephone:telephoneText,
				};
				// vendor.forEach(vendors.push(vendor))
			

				vendors.push(vendor)
				console.log(totalResults);
			// and when our request is completed, call the callback to wrap up!
			     callback();
		        });
		     });
	     });
	 });
});
