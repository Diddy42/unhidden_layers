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


app.get('/features', (req, res) => {
    console.log('received request for features')
    console.log(path.resolve('../../model/extract_output/l2_0.png'))
    res.sendFile(path.resolve('../../model/extract_output/l2_0.png'))
})


app.listen(port, () => {
    console.log('server is listening on ' + port)
})