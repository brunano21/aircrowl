"use strict";
module.exports = function(sequelize, DataTypes) {
    var FRFlight = sequelize.define("FRFlight", {
        origin: {
            type: DataTypes.STRING,
            allowNull: false
        },
        destination: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        flightNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        departure: {
            type: DataTypes.DATE,
            allowNull: false
        },
        arrival: {
            type: DataTypes.DATE,
            allowNull: false
        },
        duration: {
            type: DataTypes.STRING,
            allowNull: false
        },
        regularFareAmount: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        regularFareHasDiscount: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        regularFarePublishedFare: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        businessFareAmount: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        businessFareHasDiscount: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        businessFarePublishedFare: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        currency: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        
        updatedAt: false

    });

    return FRFlight;
};
