var request = require("request");

/* Private variables */

var _baseURL = "https://desktopapps.ryanair.com/en-ie/availability";
var _airportsURL = "https://api.ryanair.com/aggregate/3/common?embedded=airports";
var _db = null;
var _config = null;

var Ryanair = function (db, config) {
	_airportsTable = db.FRAirport;
	_flightsTable = db.FRFlight;
	_config = config;
};

/* Private methods */

var _storeAirport = function (airport) {

	var routes = [];
	for (var i = 0; i < airport.routes.length; i++) {
	 	var routeArr = airport.routes[i].split(":");
	 	if(routeArr[0] === "airport") {
	 		routes.push(routeArr[1]);
	 	}
	} 

	_airportsTable
 		.create({ 
 			iataCode: airport.iataCode, 
 			name: airport.name, 
 			seoName: airport.seoName,
 			coordinates: JSON.stringify(airport.coordinates),
 			base: airport.base,
 			countryCode: airport.countryCode,
			regionCode: airport.regionCode,
			routes: JSON.stringify(routes),
			categories: JSON.stringify(airport.categories)

 		})
		.then(function(result) {
			console.log("Added a new airport -->", result.iataCode);
		});
};


var _storeFligths = function (input) {
	var currency = input.currency;
	var trip = input.trips[0];
	var origin = trip.origin;
	var destination = trip.destination;
	var date = trip.dates[0].dateOut;
	var flights = trip.dates[0].flights;

	for (var i = 0; i < flights.length; i++) {
		var flight = flights[i];

		_flightsTable.create({
			"origin": origin,
			"destination": destination,
			"date": date,
			"flightNumber": flight.flightNumber,
			"departure": flight.time[0],
			"arrival": flight.time[1],
			"duration": flight.duration,
			"regularFareAmount": (flight.regularFare) ? flight.regularFare.fares[0].amount : null,
			"regularFareHasDiscount":(flight.regularFare) ? flight.regularFare.fares[0].hasDiscount : null,
			"regularFarePublishedFare":(flight.regularFare) ? flight.regularFare.fares[0].publishedFare : null,
			"businessFareAmount": (flight.businessFare) ? flight.businessFare.fares[0].amount : null,
			"businessFareHasDiscount": (flight.businessFare) ? flight.businessFare.fares[0].hasDiscount : null,
			"businessFarePublishedFare": (flight.businessFare) ? flight.businessFare.fares[0].publishedFare : null,
        	"currency": currency
		}).then(function(result) {
			console.log("Added a new flight", result.origin, result.destination);
		});
	}

};

/* Public methods */

Ryanair.prototype.initAirports = function () {
	request({url: _airportsURL}, function (error, response, body) {
	  	if (!error && response.statusCode === 200) {
	    	var airports = JSON.parse(body).airports;
	    	for (var i = 0; i < airports.length; i++) {
	    	 	_storeAirport(airports[i]); 	
	    	}
	  	} else {
	  		console.log("Ryanair:initAirports - something went wrong.");
	  		console.log(response);
	  	} 
	});

};

Ryanair.prototype.crowl = function(args) {

	var queryArgs = args;

	request({url: _baseURL, qs: queryArgs}, function (error, response, body) {
	  	if (!error && response.statusCode === 200) {
	    	_storeFligths(JSON.parse(body));
	  	} else {
	  		console.log("Ryanair:crowl - something went wrong.");
	  		console.log(response);
	  	} 
	});
	
};

module.exports = Ryanair;
 