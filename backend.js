var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function (request, response) {
    var q = url.parse(request.url, true);
    var filename = "." + q.pathname;

    // Grabs the list with nested dictionary from query
    var obj = q.query;

    // Displays the html for the webpages.
    fs.readFile(filename, function(err, data) {
        if (err) {
            response.writeHead(404, {'Content-Type': 'text/html'});
            return response.end("404 Not Found");
        }
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data);
        return response.end();
    });

    // Checks to make sure that the user is on the home page and has some form of a query
    if ((filename === "./index.html") && (Object.keys(q.query).length !== 0)) {
        // Starts by grabbing the original data used for merging.
        fs.readFile('./json/users.json', 'utf8', function readFileCallback(err, data){
            if (err){
                console.log(err);
            } else {
                // Takes the old data and turns it into an object for merging.
                var oldData = JSON.parse(data);
                // Adds the new data to complete the merging.
                oldData.push(obj);
                // Turns the new table into json objects
                var functionStringified = JSON.stringify(oldData);
                // Writes the data into the json file, overriting the json.
                fs.writeFile('./json/users.json', functionStringified, 'utf8',  function(err) {
                    if (err) throw err;
                    console.log('complete');
                }); // write it back
            }});
    }
}).listen(8080);