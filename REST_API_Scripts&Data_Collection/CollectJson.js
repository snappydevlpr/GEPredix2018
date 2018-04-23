var mysql = require('mysql');
var fs = require('fs');

 var finalJson = {
     "type": "FeatureCollection",
     "features": [

     ]
 };

 var Datapoint = [];

var con = mysql.createConnection({
    host: "diamond.ecs.fullerton.edu",
    user: "root",
    password: "password",
    database: "GEdata",
    port: 3389
  });
  
Collect();

function Collect(){
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "SELECT Asset.UID, Asset.Location, Data.Timestamp, Data.Temp, Data.Pressure, Data.Humidity FROM Asset, Data WHERE Asset.UID = Data.ID";
        con.query(sql, function (err, result, fields) {
          for(var i = 0; i < result.length; i++){
            finalJson.features.push({
              "type": result[i].UID,
              "geometry": {"type": "Point", "coordinates": result[i].Location},
              "properties": {
                "Timestamp": result[i].Timestamp,
                "Temp": JSON.parse(result[i].Temp),
                "Pressure": JSON.parse(result[i].Pressure),
                "Humidity": JSON.parse(result[i].Humidity)
                }
            });
            //console.log(finalJson);
            fs.writeFileSync('mapping.geojson', JSON.stringify(finalJson));
          }
          con.end();
        });
      });
}
