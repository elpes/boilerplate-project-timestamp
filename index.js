// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
app.get("/api/:date?/", function(req, res){
  let {date} = req.params;
    date = date? new Date(date): new Date();
  
  let utcDate = date.toString().replace(date.toString().split('GMT')[1],"");
  utcDate = utcDate.split(" ");
  utcDate[0]=utcDate[0]+",";
  let temp = utcDate[1];
  utcDate[1]=utcDate[2];
  utcDate[2]=temp;
  utcDate= utcDate.join(" ");
  
  res.json({"unix":Date.parse(date), "utc":utcDate});
  
  
  
}); 


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
