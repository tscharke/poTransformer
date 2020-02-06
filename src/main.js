const json2PO = require('./json2PO')
const po2json = require('./po2Json')

module.exports = async cli => {
  const { input: inputFileName, output: outputFileName } = cli.flags

  switch (cli.input[0]) {
    case 'po':
      await json2PO(inputFileName, outputFileName).catch(console.error)
      break

    case 'json':
      await po2json(inputFileName, outputFileName).catch(console.error)
      break

    default:
      break
  }

  process.exit(0)
}
