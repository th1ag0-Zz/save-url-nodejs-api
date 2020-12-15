const http = require('http')
const URL = require('url')
const fs = require('fs')
const data = require('./urls.json')
const path = require('path')

function writeFile(cb) {
  fs.writeFile(
    path.join(__dirname, 'urls.json'),
    JSON.stringify(data, null, 2),
    err => {
      if (err) throw err

      cb(JSON.stringify({message: "ok"}))
    }
  )
}

http.createServer((req, res) => {

  res.writeHead(200, {
    'Access-Control-Allow-Origin': '*'
  })

  /* teste */

  // const form = require('../public/scripts')
  
  

  /* */

  const { name, url, del } = URL.parse(req.url, true).query
  
  if (!name || !url)
    return res.end(JSON.stringify(data))

  if (del) {
    data.urls = data.urls.filter( item => String(item.url) !== String(url) )
    
    return writeFile((message) => {
      res.end(message)
    })
  }

  data.urls.push({ name, url})

  return writeFile( message => res.end(message) )

}).listen(5000, () => {console.log('Api is running')})