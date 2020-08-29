const express = require('express')
const app = express()
const port = 8080
const cors = require('cors')
var path = require('path')

app.use(cors())

app.listen(port, () => {
    console.log('server is listening')
})


/*
how to send an image

app.get('/', (req, res) => {
    res.sendFile(path.resolve('../../model/extract_output/0.png'))
})
*/