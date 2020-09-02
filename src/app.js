const path = require('path')
const express = require('express')

const app = express()
  
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../views')

app.set('view engine', 'hbs')
app.set('views', viewsPath)

const port = process.env.PORT || 3000

app.use(express.static(publicDirPath))
 
app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port)