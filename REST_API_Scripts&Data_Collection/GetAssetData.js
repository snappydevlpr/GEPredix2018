var http = require("https");
var fs = require('fs');
var request = require("request");
var assetIdArray = {content:[]};
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "diamond.ecs.fullerton.edu",
  user: "admin",
  password: "GEadminUser",
  database: "GEdata",
  port: 80
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "DELETE FROM Asset";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Number of records deleted: " + result.affectedRows);
  });
  var datasql = "DELETE FROM Data";
  con.query(datasql, function(err, result){
    if (err) throw err;
  });
});

getAssetId();

function getAssetId(){
  var options = { method: 'GET',
  url: 'https://ic-metadata-service-sdhack.run.aws-usw02-pr.ice.predix.io/v2/metadata/assets/search',
  qs: 
   { bbox: '32.715675:-117.161230,30.708498:-117.151681',
     q: 'assetType:ENV_SENSOR' },
  headers: 
   { 'Postman-Token': '3d2453a2-f6e3-4eab-8e78-9e05a6742562',
     'Cache-Control': 'no-cache',
     'Predix-Zone-Id': 'SD-IE-ENVIRONMENTAL',
     Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImxlZ2FjeS10b2tlbi1rZXkiLCJ0eXAiOiJKV1QifQ.eyJqdGkiOiI4M2I4MmM5YmMxZjk0MmYyYTMyYzkxZmM2M2JhNThiNiIsInN1YiI6InNkLmhhY2thdGhvbiIsInNjb3BlIjpbImllLWN1cnJlbnQuUFNELUlFLUlNQUdFLklFLUlNQUdFLkxJTUlURUQuREVWRUxPUCIsImllLWN1cnJlbnQuUFNELUlFLVRSQUZGSUMuSUUtVFJBRkZJQy5MSU1JVEVELkRFVkVMT1AiLCJpZS1jdXJyZW50LlNELUlFLVZJREVPLklFLVZJREVPLkxJTUlURUQuREVWRUxPUCIsInVhYS5yZXNvdXJjZSIsImllLWN1cnJlbnQuUFNELUlFLVBFREVTVFJJQU4uSUUtUEVERVNUUklBTi5MSU1JVEVELkRFVkVMT1AiLCJpZS1jdXJyZW50LlNELUlFLVBBUktJTkcuSUUtUEFSS0lORy5MSU1JVEVELkRFVkVMT1AiLCJpZS1jdXJyZW50LlNELUlFLUlNQUdFLklFLUlNQUdFLkxJTUlURUQuREVWRUxPUCIsImllLWN1cnJlbnQuUFNELUlFLVBBUktJTkcuSUUtUEFSS0lORy5MSU1JVEVELkRFVkVMT1AiLCJpZS1jdXJyZW50LlBTRC1JRS1WSURFTy5JRS1WSURFTy5MSU1JVEVELkRFVkVMT1AiLCJpZS1jdXJyZW50LlNELUlFLVRSQUZGSUMuSUUtVFJBRkZJQy5MSU1JVEVELkRFVkVMT1AiLCJpZS1jdXJyZW50LlNELUlFLUVOVklST05NRU5UQUwuSUUtRU5WSVJPTk1FTlRBTC5MSU1JVEVELkRFVkVMT1AiLCJpZS1jdXJyZW50LlBTRC1JRS1FTlZJUk9OTUVOVEFMLklFLUVOVklST05NRU5UQUwuTElNSVRFRC5ERVZFTE9QIiwiaWUtY3VycmVudC5TRC1JRS1QRURFU1RSSUFOLklFLVBFREVTVFJJQU4uTElNSVRFRC5ERVZFTE9QIl0sImNsaWVudF9pZCI6InNkLmhhY2thdGhvbiIsImNpZCI6InNkLmhhY2thdGhvbiIsImF6cCI6InNkLmhhY2thdGhvbiIsImdyYW50X3R5cGUiOiJjbGllbnRfY3JlZGVudGlhbHMiLCJyZXZfc2lnIjoiNWE0YzhlYyIsImlhdCI6MTUyNDE5NTI0NSwiZXhwIjoxNTI0ODAwMDQ1LCJpc3MiOiJodHRwczovLzYyNGVmZjAyLWRiYjEtNGM2Yy05MGJjLWZhODVhMjllNWZhOC5wcmVkaXgtdWFhLnJ1bi5hd3MtdXN3MDItcHIuaWNlLnByZWRpeC5pby9vYXV0aC90b2tlbiIsInppZCI6IjYyNGVmZjAyLWRiYjEtNGM2Yy05MGJjLWZhODVhMjllNWZhOCIsImF1ZCI6WyJpZS1jdXJyZW50LlNELUlFLUlNQUdFLklFLUlNQUdFLkxJTUlURUQiLCJpZS1jdXJyZW50LlBTRC1JRS1WSURFTy5JRS1WSURFTy5MSU1JVEVEIiwiaWUtY3VycmVudC5QU0QtSUUtVFJBRkZJQy5JRS1UUkFGRklDLkxJTUlURUQiLCJpZS1jdXJyZW50LlBTRC1JRS1QRURFU1RSSUFOLklFLVBFREVTVFJJQU4uTElNSVRFRCIsImllLWN1cnJlbnQuUFNELUlFLVBBUktJTkcuSUUtUEFSS0lORy5MSU1JVEVEIiwiaWUtY3VycmVudC5QU0QtSUUtRU5WSVJPTk1FTlRBTC5JRS1FTlZJUk9OTUVOVEFMLkxJTUlURUQiLCJpZS1jdXJyZW50LlNELUlFLVZJREVPLklFLVZJREVPLkxJTUlURUQiLCJpZS1jdXJyZW50LlNELUlFLVBBUktJTkcuSUUtUEFSS0lORy5MSU1JVEVEIiwiaWUtY3VycmVudC5TRC1JRS1UUkFGRklDLklFLVRSQUZGSUMuTElNSVRFRCIsImllLWN1cnJlbnQuUFNELUlFLUlNQUdFLklFLUlNQUdFLkxJTUlURUQiLCJ1YWEiLCJpZS1jdXJyZW50LlNELUlFLUVOVklST05NRU5UQUwuSUUtRU5WSVJPTk1FTlRBTC5MSU1JVEVEIiwiaWUtY3VycmVudC5TRC1JRS1QRURFU1RSSUFOLklFLVBFREVTVFJJQU4uTElNSVRFRCIsInNkLmhhY2thdGhvbiJdfQ.ufkSLhwchoqwUaQ2nUn_RrOu-ubvaycrbBDGEQCtjfn7zOTa2vgC-BSj8lGDI0iLyAwIhvVBXR0zl660Y5p0zFaSusvEqle746TWbRYqXVC5iBIskbIm_P6qfNsDsPh7d4aAZUADYbcy91SyLVZ0eTMy1LbPRWrD580nth3FSPBU5Ih2k77ZfWRtkA6uIXNnXXnLer6CLt5wRPrSOmYcWTM2453cQpEdYKS2rAVjfuwdaJhnIi4IjpfR34r7ooYlwHFr16Ffer2vNynr5fhij_DjTUHVz4Et_xk2diyg8i2W-0py0HVXEel_l50dbX_kwKyFtney1Pj2FTHi3Nj_Aw',
     'Content-Type': 'application/x-www-form-urlencoded' },
  form: false };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    var assetId = JSON.parse(body);
    console.log(assetId);
    for (var i = 0; i < assetId.content.length; i++) {
      var id = assetId.content[i].assetUid;
      var coords = assetId.content[i].coordinates;
      var sql = "INSERT INTO Asset (UID, Location) VALUES ('"+id+"','"+coords+"')";
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
        });      
    }
    con.end();
  });
}
