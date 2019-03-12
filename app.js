var express = require('express');
var log4js = require('log4js');

var app = express();

if (process.env.VCAP_APPLICATION) {
    log4js.configure({
        appenders: { out: { type: 'stdout', layout: { type: 'basic' } } },
        categories: { default: { appenders: ['out'], level: process.env.LOGLEVEL || 'info' } }
    });
}

var logger = log4js.getLogger();
logger.level = process.env.LOGLEVEL || 'error';

let data = [
    {
        name: "red",
        value: "#f00"
    },
    {
        name: "green",
        value: "#0f0"
    },
    {
        name: "blue",
        value: "#00f"
    },
    {
        name: "cyan",
        value: "#0ff"
    },
    {
        name: "magenta",
        value: "#f0f"
    },
    {
        name: "yellow",
        value: "#ff0"
    },
    {
        name: "black",
        value: "#000"
    }
]

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/api/v1/colors', function (req, res) {
    logger.trace('/api/v1/colors - GET')
    res.send(data);
});

app.listen(process.env.PORT || 3000);