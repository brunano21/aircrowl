"use strict";
module.exports = function(sequelize, DataTypes) {
    var FRAirport = sequelize.define("FRAirport", {
        iataCode: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        seoName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        coordinates: {
            type: DataTypes.STRING,
            allowNull: false
        },
        base: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        countryCode: {
            type: DataTypes.STRING,
            allowNull: false
        },
        regionCode: {
            type: DataTypes.STRING,
            allowNull: false
        },
        routes: {
            type: DataTypes.STRING,
            allowNull: false
        },
        categories: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        

    });

    return FRAirport;
};
