const express = require('express')
const fileupload = require('express-fileupload')
const app = new express()
const port = 3001

app.use(
    express.json(),
    fileupload()
    );


app.post('/sendImage', (req, res) => {
    console.log('received send image')
    const fileName = req.files.myFile.name
  const path = __dirname + '/images/' + fileName

  req.files.myFile.mv(path, (error) => {
    if (error) {
      console.error(error)
      res.writeHead(500, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify({ status: 'error', message: error }))
      return
    }

    res.writeHead(200, {
      'Content-Type': 'application/json'
    })
    res.end(JSON.stringify({ status: 'success', path: '/img/houses/' + fileName }))
  })
})

app.get('/test', (req, res) => {
    console.log('test')
})

app.listen(port, () => {
    console.log('server is listening on ' + port)
})


/*
how to send an image

app.get('/', (req, res) => {
    res.sendFile(path.resolve('../../model/extract_output/0.png'))
})
*/