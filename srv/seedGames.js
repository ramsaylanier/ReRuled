const cheerio = require('cheerio')
const request = require('request-promise')
const fs = require('fs')


module.exports = function () {
  let index = 0
  let stream = fs.createWriteStream('../seedtest.graphql')
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
            title: title
          }
          games.push(newGame)
        })
      })
    )
  }
  
  Promise.all(requests).then(r => {
    // const data = JSON.stringify(games)

    let template = `
      mutation createGames{
    `

    stream.write(template)

    games.forEach((game, index) => {
      console.log(game)
      const {title} = game
      const mutation = `
        cg${index}: createGame(data: {
          title: "${title}"
        }) {
          id
        }

      `
      const data = JSON.stringify(game)
      stream.write(mutation)
    })

    let endtemplate = `}`
    stream.write(endtemplate)
  })
}
