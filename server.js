var http = require('http');
var fs = require('fs');
var port = 8000;
console.log("Server running at http://localhost:" + port);
var index1 = fs.readFileSync(__dirname + '/public/index1.html');
var index2 = fs.readFileSync(__dirname + '/public/index2.html');
var server = http.createServer(handler);
    server.listen(port);
var redis  = require("redis");
var client = redis.createClient();
var item="";

function handler(req,res){
  if (req.method === 'POST') {
    var body = '';
    req.on('data', function (dataChunk) {
        body += dataChunk;
    });
    req.on('end', function () {
        var entries = body.split('&');
        var deets = entries.map(splitByEquals);
        client.incr('userCount', function(err, userCount){
          var id = userCount;
          client.HSET('user:' + id, "name", deets[0][1], redis.print);
          client.HSET('user:' + id, "surname", deets[1][1], redis.print);
          client.HSET('user:' + id, "email", deets[2][1],redis.print);
        });
    });
  } else if (req.method === 'GET') {
    res.writeHead(200, {"Content-Type": "text/html"});
    client.get('userCount', function(err, reply){
      res.write(index1);
      var userCount = reply;
      for (var i = 1; i <= userCount; i++){
        var count = 1;
        count ++;
        client.HGETALL('user:'+i, function (err,reply){
          res.write('<li>' + reply.name + ', ' + reply.surname + ', ' + reply.email.replace(/%40/, '@') + '</li>');
          if (count === userCount) {
            res.end(index2);
          }
        });
      }
    });
  }
}

function splitByEquals(arg){
  return arg.split("=");
}
