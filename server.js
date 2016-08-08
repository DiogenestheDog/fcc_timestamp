var express = require('express');
var app = express();
var moment = require('moment');
var port = 3000;
// moment formats user is allowed
var momentFormats = ["MMMM DD, YYYY", "MMM D, YYYY", "MMM DD, YYYY", "MMMM DD, YYYY", "MMM Do, YYYY", "MMMM Do, YYYY"];

app.get('/*', function (req, res) {
  var timeIn = req.url.slice(1);
  if(/^\d{1,12}$/.test(timeIn)) {
    var tempus = moment.unix(+timeIn).format("MMMM D, YYYY");
    res.end(JSON.stringify({"unix" : timeIn, "natural": tempus }));
  }
  // remove commas and whitespace so moment.isValid() works properly
  else if(moment(timeIn.replace(/,(%20)+|,|(%20)+/g, "-")).isValid()){
    timeIn = timeIn.replace(/,(%20)+|,|(%20)+/g, "-");
    var tempus = moment(timeIn, momentFormats).format("MMMM D, YYYY");
    res.end(JSON.stringify({"unix" : moment(timeIn, momentFormats).format("X"),
                            "natural" : tempus}));
    }
  else {
    res.end("Not a valid date");
  }
});
 
app.listen(process.env.PORT || port);
console.log("Listening on port: " + port);

