const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
  
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../views')

app.set('view engine', 'hbs')
app.set('views', viewsPath)

const port = process.env.PORT || 3000

app.use(express.static(publicDirPath))

app.use(bodyParser.urlencoded({extended: true}))

app.get('/help', (req, res) => {
  res.send('help page')
})

app.get('/', (req, res) => {
  res.render('index', {result: undefined})
})

app.post('/', (req, res) => {
  const text = req.body.text
  const key = Number(req.body.key)

  console.log(req.body)

  if(req.body.encrypt) {
    let encryptedText = ''
  
    for(let i = 0; i < text.length ; i++) {
      encryptedText = encryptedText + String.fromCharCode(text.charCodeAt(i) + key);
    }
  
    res.render('index', {result: encryptedText})
  } else {
    let decryptedText = ''

    for(let i = 0; i < text.length; i++) {
      decryptedText = decryptedText + String.fromCharCode(text.charCodeAt(i) - key);
    }

    res.render('index', {result: decryptedText})
  }
})

app.listen(port)