const cheerio = require('cheerio')
const request = require('request-promise')
const fs = require('fs')

let index = 0
let stream = fs.createWriteStream('./data/nodes/01.json')
const requests = []
const games = []

while (index < 10) {
  index++

  const options = {
    uri: `https://boardgamegeek.com/browse/boardgame/page/${index}`,
    transform: function (body) {
      return cheerio.load(body)
    }
  }

  requests.push(
    request(options).then( $ => {
      const scrapedGames = $('.collection_objectname').find('a')
      scrapedGames.each((i, game) => {
        const title = $(game).text()
        let newGame = {
          _typeName: 'Game',
          updatedAt: new Date(),
          createdAt: new Date(),
          id: i * index,
          title: title
        }
        games.push(newGame)
      })
    })
  )
}

Promise.all(requests).then(r => {
  const data = JSON.stringify(games)
  stream.write(data)
})
