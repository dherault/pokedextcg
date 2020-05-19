const fs = require('fs')
const path =  require('path')
const papaparse = require('papaparse')
const request = require('request')
const { parse } = require('node-html-parser')

const inputFolder = path.join(__dirname, 'input')
const inputSetsfile = path.join(inputFolder, 'sets.json')
const outputFolder = path.join(__dirname, 'output')
const outputSetsFile = path.join(outputFolder, 'sets.json')
const outputCardsFile = path.join(outputFolder, 'cards.json')
const outputImagesPath = path.join(outputFolder, 'images')

downloadSets().then(() => console.log('Done'))

async function downloadSets() {
  const sets = JSON.parse(fs.readFileSync(inputSetsfile, 'utf-8'))
  const cards = []

  for (const set of sets) {
    console.log('set', set)
    const inputSetFile = path.join(inputFolder, set.inputFile)
    const inputCsvData = fs.readFileSync(inputSetFile, 'utf-8')
    const { data } = papaparse.parse(inputCsvData)

    data.shift();
    data.pop();

    const setCards = await downloadImages(data, cards)

    set.nCards = setCards.length
    cards.push(...setCards)
  }

  fs.writeFileSync(outputSetsFile, JSON.stringify(sets, null, 2), 'utf-8')
  fs.writeFileSync(outputCardsFile, JSON.stringify(cards, null, 2), 'utf-8')
}

async function downloadImages(dataArray) {
  const cards = []

  for (const [,, imageUrl, html] of dataArray) {
    if (!(imageUrl && html)) continue

    const imageFileName = imageUrl.split('/').pop()
    const outputImageFilePath = path.join(outputImagesPath, imageFileName)

    const parsedHtml = parse(html)

    const name = extract(parsedHtml, '.name')
    const hp = extract(parsedHtml, '.hp')
    const symbol = extract(parsedHtml, '.color', x => x[1])
    const number = extract(parsedHtml, '.number', x => parseInt(x))
    const rarity = extract(parsedHtml, '.rarity')
    const set = extract(parsedHtml, '.set', x => x.replace('&amp;', '&'))

    cards.push({
      imageFileName,
      name,
      hp,
      symbol,
      number,
      set,
      rarity,
    })

    // await downloadImage(imageUrl, outputImageFilePath)
  }

  cards.sort((a, b) => a.number < b.number ? -1 : 1)

  return cards
}

function downloadImage(url, filePath){
  return new Promise((resolve, reject) => {
    const stream = request(url).pipe(fs.createWriteStream(filePath))

    stream.on('close', resolve)
    stream.on('error', reject)
  })
}

function extract(parsedHtml, query, transformer = x => x) {
  const found = parsedHtml.querySelector(query)

  if (!found) return null

  const data = found.rawText || found.childNodes[0].rawText

  return transformer(data)
}
