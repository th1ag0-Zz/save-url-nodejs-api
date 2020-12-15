const http = require('http')
const path = require('path')
const fs = require('fs')

http.createServer((req, res) => {

  const file = req.url === '/' ? 'index.html' : req.url
  const filePath = path.join(__dirname, 'public', file)
  const extensionFile = path.extname(filePath)

  const allowedFilesTypes = ['.html', '.css', '.js']
  const allowed = allowedFilesTypes.find(item => item == extensionFile)

  if (!allowed) return

  fs.readFile(
    filePath,
    (err, content) => {
      if (err) throw err

      res.end(content)
    }
  )

}).listen(3000, () => {console.log('server is running')})