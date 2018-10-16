var express = require('express');
var path = require('path');
var app = express();
var request = require('request');
var cheerio = require('cheerio');
var scrape2csv = require('scrape2csv');
var fs = require('fs');
var port = 8080;

//let's scrape a very cool website
var url_to_scrape = "https://www.weddingwire.com/c/az-arizona/lighting-decor/24-sca.html";

var jquery_selector = "div.state";

//each article of the page will go through this
var handler = function($, elem, index){
	var vendor_state= $(elem).find("a.dark strong").text();
	var state_url = $(elem).find("a.dark strong").attr("href");

	//returning a new row for the csv
	return [index,vendor_state,"http://www.weddingwire.com"+state_url];
}

//optional CSV header
var header = ["#", "Title of the article", "URL"];

scrape2csv.scrape("/echojs.csv", url_to_scrape, jquery_selector, handler, header);