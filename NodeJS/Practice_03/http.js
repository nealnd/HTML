
const http = require('http')

const fs = require('fs')

const path = require('path')


const server = http.createServer()

server.on('request', (req, res) => {

    const url = req.url
    console.log(url)

    let fpath = ''
    if (url === '/') {
        fpath = path.join(__dirname, '/clock/index.html')
    } else {

        fpath = path.join(__dirname, '/clock', url)
    }


    fs.readFile(fpath, 'utf8', (err, dataStr) => {

        if (err) return res.end('404 Not found.')

        res.end(dataStr)
    })
})

server.listen(80, () => {
    console.log('server running at http://127.0.0.1')

})

