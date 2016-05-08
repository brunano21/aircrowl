
/*var schedule = require("node-schedule");
var rule = new schedule.RecurrenceRule();
rule.second = 1;*/

var moment = require("moment");
var models = require("./models");
var winston = require('winston');


var Ryanair = require('./brokers/fr.js');
var ryanair = new Ryanair(models, {name: "Ryanair", logger: winston });

//models.sequelize.sync({force: true});
//ryanair.initAirports();


var brokers = [];
brokers.push(ryanair);

var dateFormat = "YYYY-MM-DD";
var timeWindow = "5"; // days 
var timeWindowType = "days"
var startDay = moment();
var endDay = moment().add(timeWindow, timeWindowType);


function crowl() {
	startDay = moment();
	while(endDay.isAfter(startDay, "day")) {
		
		// let's start from tomorrow
		startDay.add(1, "days");
		
		winston.info("Checking date: " + startDay.format(dateFormat));
		
		var args = {
			date: startDay.format(dateFormat)
		};

		for (var i = 0; i < brokers.length; i++) {
			brokers[i].crowl(args)
		}
			
	}
};

crowl();
