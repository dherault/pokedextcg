const fs = require('fs')
const path =  require('path')
const papaparse = require('papaparse')
const request = require('request')
const { parse } = require('node-html-parser')

const inputFolder = path.join(__dirname, 'input')
const outputFolder = path.join(__dirname, 'output')

const inputFileName = 'swordandshield.csv'
const inputFilePath = path.join(inputFolder, inputFileName)

const outputFilePath = path.join(outputFolder, 'swordandshield.json')
const outputImagesPath = path.join(outputFolder, 'images')

const inputCsvData = fs.readFileSync(inputFilePath, 'utf-8')

const { data } = papaparse.parse(inputCsvData)

data.shift();

downloadImages(data).then(() => console.log('Done.'))

async function downloadImages(dataArray) {
  const outputData = []

  for (const [,, imageUrl, html] of dataArray) {
    // console.log('imageUrl', imageUrl, html)

    if (!(imageUrl && html)) continue

    const imageFileName = imageUrl.split('/').pop()
    const outputImageFilePath = path.join(outputImagesPath, imageFileName)

    const parsedHtml = parse(html)

    const name = extract(parsedHtml, '.name')
    const hp = extract(parsedHtml, '.hp')
    const symbol = extract(parsedHtml, '.color')
    const stage = extract(parsedHtml, '.stage', x => x.toLowerCase())
    const attack1 = extract(parsedHtml, 'p:nth-of-type(2)')

    console.log('attack1', attack1)
    outputData.push({
      imageFileName,
      name,
      hp,
      symbol,
      stage,
    })

    // await downloadImage(imageUrl, outputImageFilePath)
  }

  // console.log(outputData)
  fs.writeFileSync(outputFilePath, JSON.stringify(outputData, null, 2), 'utf-8')
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
