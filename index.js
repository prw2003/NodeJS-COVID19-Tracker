    var https = require("https");
    var options = {
        "method": "GET",
        "hostname": "coronavirus-monitor.p.rapidapi.com",
        "port": null,
        "path": "/coronavirus/cases_by_country.php",
        "headers": {
            "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
            "x-rapidapi-key": "8ca5dbd881msh6ff46780657753bp16712ajsn7d89f4904385"
        }
    };

    var req = https.request(options, function (res) {
        var chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function () {
            var body = Buffer.concat(chunks);
            var obj = JSON.parse(body);
            var countries_stat = obj.countries_stat;
            var http = require('http');
            for(i = 0;i < countries_stat.length;i++){
                console.log("Loading " + countries_stat[i].country_name + " data already. ");
                console.log("Cases=" + countries_stat[i].cases + " Deaths=" + countries_stat[i].deaths + " Serious critical=" + countries_stat[i].serious_critical + " Total recovered=" + countries_stat[i].total_recovered);
            }
            http.createServer(function (req, res) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            for(i = 0;i < countries_stat.length;i++){
                res.write("Country Name: "+obj.countries_stat[i].country_name+" ");
                res.write("cases: "+obj.countries_stat[i].cases+" ");
                res.write("deaths: "+obj.countries_stat[i].deaths+" ");
                res.write("serious_critical: "+obj.countries_stat[i].serious_critical+" ");
                res.write("total_recovered: "+obj.countries_stat[i].total_recovered+"<br>");
            }
            res.end();
            }).listen(8080);
        });
    });
    req.end();
    console.log("starting...");
