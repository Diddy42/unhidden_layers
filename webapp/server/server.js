const express = require('express')
const app = express()
const port = 3001
//const cors = require('cors')
var path = require('path')

//app.use(cors())

app.post('/sendImage', (req, res) => {
    console.log('received send image')
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