var http = require("https");
var fs = require('fs');
var request = require("request");
var rp = require('request-promise');
var mysql = require('mysql');
var data = [];
var ps = [];

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "swordman141",
  database: "GEtest"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "SELECT * FROM Asset";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    data = result;
    getTemp();
  });
});

function getTemp(){
  for(var i = 0; i < data.length; i++){
    var options = { 
      method: 'GET',
      url: 'https://ic-event-service-sdhack.run.aws-usw02-pr.ice.predix.io/v2/assets/'+data[i].UID+'/events',
      qs: 
      { eventType: 'PRESSURE',
        startTime: '1510958357000',
        endTime: '1511180737185' },
      headers: 
      { 'Postman-Token': 'a79b1be0-592a-4b11-80ab-71887cd86723',
        'Cache-Control': 'no-cache',
        Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImxlZ2FjeS10b2tlbi1rZXkiLCJ0eXAiOiJKV1QifQ.eyJqdGkiOiI4M2I4MmM5YmMxZjk0MmYyYTMyYzkxZmM2M2JhNThiNiIsInN1YiI6InNkLmhhY2thdGhvbiIsInNjb3BlIjpbImllLWN1cnJlbnQuUFNELUlFLUlNQUdFLklFLUlNQUdFLkxJTUlURUQuREVWRUxPUCIsImllLWN1cnJlbnQuUFNELUlFLVRSQUZGSUMuSUUtVFJBRkZJQy5MSU1JVEVELkRFVkVMT1AiLCJpZS1jdXJyZW50LlNELUlFLVZJREVPLklFLVZJREVPLkxJTUlURUQuREVWRUxPUCIsInVhYS5yZXNvdXJjZSIsImllLWN1cnJlbnQuUFNELUlFLVBFREVTVFJJQU4uSUUtUEVERVNUUklBTi5MSU1JVEVELkRFVkVMT1AiLCJpZS1jdXJyZW50LlNELUlFLVBBUktJTkcuSUUtUEFSS0lORy5MSU1JVEVELkRFVkVMT1AiLCJpZS1jdXJyZW50LlNELUlFLUlNQUdFLklFLUlNQUdFLkxJTUlURUQuREVWRUxPUCIsImllLWN1cnJlbnQuUFNELUlFLVBBUktJTkcuSUUtUEFSS0lORy5MSU1JVEVELkRFVkVMT1AiLCJpZS1jdXJyZW50LlBTRC1JRS1WSURFTy5JRS1WSURFTy5MSU1JVEVELkRFVkVMT1AiLCJpZS1jdXJyZW50LlNELUlFLVRSQUZGSUMuSUUtVFJBRkZJQy5MSU1JVEVELkRFVkVMT1AiLCJpZS1jdXJyZW50LlNELUlFLUVOVklST05NRU5UQUwuSUUtRU5WSVJPTk1FTlRBTC5MSU1JVEVELkRFVkVMT1AiLCJpZS1jdXJyZW50LlBTRC1JRS1FTlZJUk9OTUVOVEFMLklFLUVOVklST05NRU5UQUwuTElNSVRFRC5ERVZFTE9QIiwiaWUtY3VycmVudC5TRC1JRS1QRURFU1RSSUFOLklFLVBFREVTVFJJQU4uTElNSVRFRC5ERVZFTE9QIl0sImNsaWVudF9pZCI6InNkLmhhY2thdGhvbiIsImNpZCI6InNkLmhhY2thdGhvbiIsImF6cCI6InNkLmhhY2thdGhvbiIsImdyYW50X3R5cGUiOiJjbGllbnRfY3JlZGVudGlhbHMiLCJyZXZfc2lnIjoiNWE0YzhlYyIsImlhdCI6MTUyNDE5NTI0NSwiZXhwIjoxNTI0ODAwMDQ1LCJpc3MiOiJodHRwczovLzYyNGVmZjAyLWRiYjEtNGM2Yy05MGJjLWZhODVhMjllNWZhOC5wcmVkaXgtdWFhLnJ1bi5hd3MtdXN3MDItcHIuaWNlLnByZWRpeC5pby9vYXV0aC90b2tlbiIsInppZCI6IjYyNGVmZjAyLWRiYjEtNGM2Yy05MGJjLWZhODVhMjllNWZhOCIsImF1ZCI6WyJpZS1jdXJyZW50LlNELUlFLUlNQUdFLklFLUlNQUdFLkxJTUlURUQiLCJpZS1jdXJyZW50LlBTRC1JRS1WSURFTy5JRS1WSURFTy5MSU1JVEVEIiwiaWUtY3VycmVudC5QU0QtSUUtVFJBRkZJQy5JRS1UUkFGRklDLkxJTUlURUQiLCJpZS1jdXJyZW50LlBTRC1JRS1QRURFU1RSSUFOLklFLVBFREVTVFJJQU4uTElNSVRFRCIsImllLWN1cnJlbnQuUFNELUlFLVBBUktJTkcuSUUtUEFSS0lORy5MSU1JVEVEIiwiaWUtY3VycmVudC5QU0QtSUUtRU5WSVJPTk1FTlRBTC5JRS1FTlZJUk9OTUVOVEFMLkxJTUlURUQiLCJpZS1jdXJyZW50LlNELUlFLVZJREVPLklFLVZJREVPLkxJTUlURUQiLCJpZS1jdXJyZW50LlNELUlFLVBBUktJTkcuSUUtUEFSS0lORy5MSU1JVEVEIiwiaWUtY3VycmVudC5TRC1JRS1UUkFGRklDLklFLVRSQUZGSUMuTElNSVRFRCIsImllLWN1cnJlbnQuUFNELUlFLUlNQUdFLklFLUlNQUdFLkxJTUlURUQiLCJ1YWEiLCJpZS1jdXJyZW50LlNELUlFLUVOVklST05NRU5UQUwuSUUtRU5WSVJPTk1FTlRBTC5MSU1JVEVEIiwiaWUtY3VycmVudC5TRC1JRS1QRURFU1RSSUFOLklFLVBFREVTVFJJQU4uTElNSVRFRCIsInNkLmhhY2thdGhvbiJdfQ.ufkSLhwchoqwUaQ2nUn_RrOu-ubvaycrbBDGEQCtjfn7zOTa2vgC-BSj8lGDI0iLyAwIhvVBXR0zl660Y5p0zFaSusvEqle746TWbRYqXVC5iBIskbIm_P6qfNsDsPh7d4aAZUADYbcy91SyLVZ0eTMy1LbPRWrD580nth3FSPBU5Ih2k77ZfWRtkA6uIXNnXXnLer6CLt5wRPrSOmYcWTM2453cQpEdYKS2rAVjfuwdaJhnIi4IjpfR34r7ooYlwHFr16Ffer2vNynr5fhij_DjTUHVz4Et_xk2diyg8i2W-0py0HVXEel_l50dbX_kwKyFtney1Pj2FTHi3Nj_Aw',
        'Predix-Zone-Id': 'SD-IE-ENVIRONMENTAL',
        'Content-Type': 'application/x-www-form-urlencoded' },
      json: true };

      ps.push(rp(options));
  }

  Promise.all(ps)
  .then(function (body){
    console.log(body.length);
    for(var i = 0; i < body.length; i++){
      for (var j = 0; j < body[i].content.length; j++){
        var id = body[i].content[j].assetUid;
        var timeStamp = body[i].content[j].timestamp;
        var pressure = JSON.stringify(body[i].content[j].measures);
        //console.log(body[i].content[j].assetUid);
        //var tempsql = "UPDATE Data SET (Timestamp, Temp) VALUES ('"+timeStamp+"','"+temp+") WHERE ID = '"+id+"'";
        var tempsql = "INSERT INTO Data (ID, Timestamp, PRESSURE) VALUES ('"+id+"','"+timeStamp+"','"+pressure+"') ON DUPLICATE KEY UPDATE Timestamp = '"+timeStamp+"', PRESSURE = '"+pressure+"'";
        con.query(tempsql, function(err, result){
          if (err) throw err;
        });
      }
    }
    con.end();
  })
  .catch(function (err){
     console.log ('Error:' + err);
     con.end();
  });

}

