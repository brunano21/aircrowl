var request = require("request");


var baseURL = "https://desktopapps.ryanair.com/en-ie/availability";

exports.run = function(args) {

	var queryArgs = args;

	request({url: url, qs: queryArgs}, function (error, response, body) {
	  	if (!error && response.statusCode == 200) {
	    	var result = processJSON(JSON.parse(body));
	  		console.log(require('util').inspect(result, true, 10, true))
	  	} 
	});
	
};


var processJSON = function (input) {
	var output = [];
	var trips = input.trips[0];
	var date = trips.dates[0];
	var dateOut = date.dateOut;
	output.push(dateOut);
	var flights = date.flights;
	for (var i = 0; i < flights.length; i++) {
		var flight = flights[i];
		var thisFlight = {
			'departureDate': flight.time[0],
			'arrivalDate': flight.time[1],
			'regularFares': (flight.regularFare) ? flight.regularFare.fares : [],
			'businessFare': (flight.businessFare) ? flight.businessFare.fares: [],
		};
		output.push(JSON.stringify(thisFlight));
	}

	return output;
}

