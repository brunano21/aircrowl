
/*var schedule = require("node-schedule");
var rule = new schedule.RecurrenceRule();
rule.second = 1;*/

var moment = require("moment");
var models = require("./models");

models.sequelize.sync({force: true});

var Ryanair = require('./brokers/fr.js');
var ryanair = new Ryanair(models, {name: "ryanair"});
ryanair.initAirports();


var brokers = [];
brokers.push(ryanair);

var dateFormat = "YYYY-MM-DD";
var timeWindow = "30"; // days 
var timeWindowType = "days"
var startDay = moment();
var endDay = moment().add(timeWindow, timeWindowType);


function crowl() {
	startDay = moment();
	while(endDay.isAfter(startDay, "day")) {
		
		// let's start from tomorrow
		startDay.add(1, "days");
		
		console.log("Checking date: " + startDay.format(dateFormat));
		
		var args = {
			DateOut: startDay.format(dateFormat),
			Destination: "LGW",
			Origin: "DUB",
			RoundTrip: "false"
		};

		for (var i = 0; i < brokers.length; i++) {
			brokers[i].crowl(args)
		}
			
	}
};

crowl();
