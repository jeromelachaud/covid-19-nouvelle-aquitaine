const downloadFile = require('./download-file')
const express = require('express')
const data = require('./db.json')
const path = require('path')
const server = express()
const schedule = require('node-schedule')

server.use(express.static(path.join(__dirname, '/public')))
server.set('view engine', 'pug')
server.set('views', path.join(__dirname, './views'))

server.get('/', (req, res) => {
  try {
    res.render('index', {
      title: 'COVID-19 en Nouvelle-Aquitaine',
    })
  } catch (err) {
    console.log('err', err)
    res.status(500).send({ error: err })
  }
})
server.get('/data', (req, res) =>
  res.json(
    data
      .filter(item => item.source !== undefined)
      .filter(item => item.nom !== 'Nouvelle-Aquitaine')
      .filter(item => item.source.nom === 'ARS Nouvelle-Aquitaine')
  )
)

const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
  schedule.scheduleJob('0 3 * * * *', function() {
    downloadFile(
      'https://raw.githubusercontent.com/opencovid19-fr/data/master/dist/chiffres-cles.json'
    )
  })
})
