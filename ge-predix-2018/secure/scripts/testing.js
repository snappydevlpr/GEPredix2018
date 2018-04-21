window.onload = testing;
function testing(){
var https = require('https');
var moment = require('moment');
var fs = require('fs');

var req = https.request({
    host: 'diamond.ecs.fullerton.edu',
    port: 80,
    method: 'GET',
    rejectUnauthorized: false,
    requestCert: true,
    agent: false
}, function(res){

    var body = [];
    res.on('data', function(data){
        body.push(data);
    });

    res.on('end', function(){
        //console.log(JSON.parse(body.join('')));
        var dataToParse = JSON.parse(body.join(''));
        fs.writeFileSync('testing.json', JSON.stringify(dataToParse));
        for (var i = 0; i < dataToParse.length; i++){
            var coords = JSON.stringify(dataToParse[i].Location);
            var d = new Date(parseInt(dataToParse[i].Timestamp));
            var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
            var nd = new Date(utc + (3600000*(-8)));
            var time = nd.toLocaleString();
            var temp = JSON.stringify(dataToParse[i].Temp);
            var humidity = JSON.stringify(dataToParse[i].Humidity);
            var pressure = JSON.stringify(dataToParse[i].Pressure);
            myFunction( coords,  time,  temp,  humidity,  pressure);

        }
    });

});
req.end();

req.on('error', function(err){
    console.log(err);
});

}

async function myFunction(var coords, var time, var temp, var humidity, var pressure) {
        var row = document.getElementById("myData");
        var x   = row.insertCell(0);
        // insert cell
        x.innerHTML = pressure;

        var row = document.getElementById("myData");
        var x   = row.insertCell(0);
        // insert cell
        x.innerHTML = humidity;

        var row = document.getElementById("myData");
        var x   = row.insertCell(0);
        // insert cell
        x.innerHTML = temp;

        var row = document.getElementById("myData");
        var x   = row.insertCell(0);
        // insert cell
        x.innerHTML = time;

        var row = document.getElementById("myData");
        var x   = row.insertCell(0);
        // insert cell
        x.innerHTML = coords;
}
