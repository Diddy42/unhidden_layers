const express = require('express')
const fileupload = require('express-fileupload')
const fs = require('fs')
var path = require('path');
var sleep = require('system-sleep');
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
    res.json({ unique_id : cnt })
    cnt++;
  })
})

app.get('/test', (req, res) => {
    console.log('test')
})


app.get('/features/:filename', (req, res) => {
    console.log('received request for features, filename: ' + req.params.filename)
    const filepath = path.resolve('../../model/extract_output/' + req.params.filename)
    var sent = false;
    var i = 0;
    for(i = 0; i < 60; i++){
      try {
        if (fs.existsSync(filepath)) {
          res.sendFile(filepath)
          res.on('finish', function() {
	      try {
			fs.unlinkSync(filepath)
          	console.log('deleted ' + filepath)
	      } catch(e) {
			console.log("error removing ", filepath); 
	      }
	 	 });
          sent = true;
          i = 61;
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
