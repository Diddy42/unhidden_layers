const express = require('express')
const fileupload = require('express-fileupload')
const fs = require('fs')
var path = require('path');
var sleep = require('system-sleep');
const app = new express()
const port = 3001

var cnt = 0;

app.use(
    express.json(),
    fileupload()
    );


app.post('/sendImage', (req, res) => {
    console.log('received send image')
    const fileName = cnt + '_' + req.files.myFile.name
    
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

    /*res.writeHead(200, {
      'Content-Type': 'application/json'
    })*/
    res.json({ unique_id : cnt })
  })

  cnt++;
})

app.get('/test', (req, res) => {
    console.log('test')
})


app.get('/features/:filename', (req, res) => {
    console.log('received request for features')
    const filepath = path.resolve('../../model/extract_output/' + req.params.filename)
    var sent = false;
    var i = 0;
    for(i = 0; i < 30; i++){
      try {
        if (fs.existsSync(filepath)) {
          res.sendFile(filepath)
          sent = true;
          i = 31;
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