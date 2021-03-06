const express = require('express')
const fileupload = require('express-fileupload')
const fs = require('fs')
var path = require('path');
var sleep = require('system-sleep');

function base64_encode(file) {
  var bitmap = fs.readFileSync(file);
  return new Buffer.from(bitmap).toString('base64');
}

const app = new express()
const port = 3001

var cnt = 0;

fs.readdir(path.resolve('../../model/extract_output/'), function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    files.forEach(function (file) {
    	//console.log(path.resolve('../../model/extract_output/') + '/' + file)
        fs.unlinkSync(path.resolve('../../model/extract_output/') + '/' + file)
    });
});

app.use(
    express.json(),
    fileupload()
    );


app.post('/sendImage', (req, res) => {
    console.log('received send image')
    var ext = req.files.myFile.name.substr(req.files.myFile.name.lastIndexOf('.') + 1);
    const fileName = cnt + '.' + ext
    
    const fpath = path.resolve('../../model/unprocessed/' + fileName)

    req.files.myFile.mv(fpath, (error) => {
      if (error) {
        console.error(error)
        res.writeHead(500, {
          'Content-Type': 'application/json'
        })
        res.end(JSON.stringify({ status: 'error', message: error }))
        return
      }

    console.log('saved file with unique id ' + cnt)
    res.json({ 
    	unique_id : cnt, 
    	load_gif : base64_encode(path.resolve('images/loading2.gif'))
     })
    cnt++;
  })
})

/*
function timeout_rec(c, req, res) {
	console.log(c + ' waiting for model to finish for id: ' + req.params.unique_id);
	c = c + 1;
	
	var done = false;
	finished = fs.readFileSync(path.resolve('../../model/finished.txt')).toString()
	if(finished.split("\n").includes(req.params.unique_id.toString())){
		done = true;
		console.log('model finished for id: ' + req.params.unique_id)
		
		const layers = [1, 4, 12, 19, 30, 44, 57, 119, 152];
		
		var json = {
			layers_features : [],
			inference : ''
		};
		
		var i;
		for (i = 0; i < layers.length; i++){
			console.log('layer ' + layers[i])
			json.layers_features.push({
				layer_number : layers[i],
				features_b64 : [
					base64_encode(path.resolve('../../model/extract_output/' + req.params.unique_id + '_l' + layers[i] + '_0.png')),
					base64_encode(path.resolve('../../model/extract_output/' + req.params.unique_id + '_l' + layers[i] + '_1.png')),
					base64_encode(path.resolve('../../model/extract_output/' + req.params.unique_id + '_l' + layers[i] + '_2.png'))
				]
			});
		}
		
		json.inference = 'inferenceeeee'
		
		console.log(json)

		res.json(json)
	}
	
	console.log('calling the next timeout')
	
	if(!done){
		console.log('calling the next timeout')
		res.setTimeout(2000, (c) => { timeout_rec(c, req, res); }, c);
	}
}
*/

app.get('/jsonresults/:unique_id', (req, res) => {
  console.log('received get jsonresults for ' + req.params.unique_id)
  
  /*var c = 0;
  res.setTimeout(2000, (c) => { timeout_rec(c, req, res); });*/

	
  var done_waiting = false;
  var found = false;
  var i = 0;
  var finished;
  
  for(i = 0; i < 60 && !done_waiting; i++){
    console.log('done one loop of waiting for model ' + req.params.unique_id)
    finished = fs.readFileSync(path.resolve('../../model/finished.txt')).toString()
    if(finished.split("\n").includes(req.params.unique_id.toString())){
      done_waiting = true;
      found = true;
    }

    sleep(2000)
  }
  
  console.log('done waiting, found: ' + found)

  if(found){
    console.log('model finished for id: ' + req.params.unique_id)
		
		const layers = [1, 12, 30, 57, 119, 152];
		
		var json = {
			layers_features : [],
			inference : ''
		};
		
		var i;
		for (i = 0; i < layers.length; i++){
			console.log('layer ' + layers[i])
			json.layers_features.push({
				layer_number : layers[i],
				features_b64 : [
					base64_encode(path.resolve('../../model/extract_output/' + req.params.unique_id + '_l' + layers[i] + '_0.png')),
					base64_encode(path.resolve('../../model/extract_output/' + req.params.unique_id + '_l' + layers[i] + '_1.png')),
					base64_encode(path.resolve('../../model/extract_output/' + req.params.unique_id + '_l' + layers[i] + '_2.png'))
				]
			});
			
			fs.unlinkSync(path.resolve('../../model/extract_output/' + req.params.unique_id + '_l' + layers[i] + '_0.png'))
			fs.unlinkSync(path.resolve('../../model/extract_output/' + req.params.unique_id + '_l' + layers[i] + '_1.png'))
			fs.unlinkSync(path.resolve('../../model/extract_output/' + req.params.unique_id + '_l' + layers[i] + '_2.png'))
		}
		
		json.inference = fs.readFileSync(path.resolve('../../model/extract_output/' + req.params.unique_id + '.txt')).toString()
		fs.unlinkSync(path.resolve('../../model/extract_output/' + req.params.unique_id + '.txt'))

		res.json(json)
  }
  else{
    res.writeHead(500, {
      'Content-Type': 'application/json'
    })
    res.end(JSON.stringify({ status: 'error', message: 'error in finding features' }))
  }
  
})

app.get('/inference/:unique_id', (req, res) => {
    console.log('received get inference for ' + req.params.unique_id)
    const fileName = req.params.unique_id + '.txt'
    
    const filepath = path.resolve('../../model/extract_output/' + fileName)
    
    var sent = false;
    var i = 0;
    for(i = 0; i < 60 && !sent; i++){
      try {
        if (fs.existsSync(filepath)) {
          const inference = fs.readFileSync(filepath);
		  console.log('sending inference: ' + inference.toString())
    	  res.json({ inference : inference.toString() })
          res.on('finish', function() {
	      try {
			fs.unlinkSync(filepath)
          	console.log('deleted ' + filepath)
	      } catch(e) {
			console.log("error removing ", filepath); 
	      }
	 	 });
          sent = true;
        }
      }catch(err) {

      }
      sleep(1000);
    }

    if(!sent){
      console.log('server.js - get /features/:filename - file not found')
      res.status(404)
      res.end()
    }
})

app.get('/test', (req, res) => {
    console.log('test')
})


app.get('/features/:filename', (req, res) => {
    console.log('received request for features, filename: ' + req.params.filename)
    const filepath = path.resolve('../../model/extract_output/' + req.params.filename)
    var sent = false;
    var i = 0;
    for(i = 0; i < 60 && !sent; i++){
    	console.log('trying to find ' + req.params.filename + '...')
      try {
        if (fs.existsSync(filepath)) {
          res.sendFile(filepath)
          res.on('finish', function() {
          	sent = true;
	      try {
			fs.unlinkSync(filepath)
          	console.log('deleted ' + filepath)
	      } catch(e) {
			console.log("error removing ", filepath); 
	      }
	 	 });
        
        }
      }catch(err) {

      }
      sleep(1000);
    }

    if(!sent){
      console.log('server.js - get /features/:filename - file not found')
      res.status(404)
      res.end()
    }
})


app.listen(port, () => {
    console.log('server is listening on ' + port)
})
