var http = require('http');
var url = require('url');

var server = http.createServer(function(req, res) {
  var page = url.parse(req.url).pathname;
  console.log(page);
  if(page == '/accueil'){
  	res.writeHead(200);
  	res.end('accueil !');
	}
  if(page == '/test'){
  	res.writeHead(200);
  	res.end('test ok !');
	}
  else{
  	res.writeHead(404);
  	res.end('Not Found !');
	}


});
server.listen(9090);
