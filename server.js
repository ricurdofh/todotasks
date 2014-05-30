var express = require('express'),
		swig = require('swig'),
		cons = require('consolidate'),
		fs = require('fs');
		bodyParser = require('body-parser');
		uuid    = require('node-uuid');

var app = express(),
		env = "prod",
		bd = './base-data.json',
		baseData = fs.readFileSync(bd).toString(),
		server   = require('http').createServer(app),
		data = JSON.parse(baseData);

var home = function (req, res) {
	res.render('index',{
		posts : data,
		env   : env
	});
};

app.engine('.html', cons.swig);
app.set('view engine', 'html');
app.set('views', './app/views');

app.use(bodyParser());
app.use( express.static('./public') );

app.get('/tasks/', function(req, res){
	res.send(data);
});

app.get('/', home);

app.post('/tasks', function (req, res){
	req.body.id = uuid.v1();
	data.push(req.body);
	fs.writeFile(bd, JSON.stringify(data));
	res.send(200, {status:"Ok", id: req.body.id});
});
app.put('/tasks/:id', function (req, res){
	for (var task in data){
		if (data[task].id === req.params.id)
			data[task].status = data[task].status != req.body.status ? req.body.status : data[task].status;
	}
	fs.writeFile(bd, JSON.stringify(data));
	res.send(200, {status:"Ok", id: req.params.id});
});
app.delete('/tasks/:id', function (req, res){
	for (var task in data){
		if (data[task].id === req.params.id){
			delete data[task];
		}
	}
	var dat = JSON.stringify(data).replace(",null", "");
	data = JSON.parse(dat);
	fs.writeFile(bd, dat);
	res.send(200, {status:"Ok", id: req.params.id});
});

app.listen(3000);

