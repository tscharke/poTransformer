/*
  See 👉 https://www.gnu.org/software/gettext/manual/html_node/PO-Files.html

  PO-File-Format:
    white-space
    #  translator-comments
    #. extracted-comments
    #: reference…
    #, flag…
    #| msgid previous-untranslated-string
    msgid untranslated-string
    msgstr translated-string
 */
const ora = require('ora')
const spinner = ora('Converting JSON to PO')
const fs = require('fs')
const DELIMITER = '\n'
const { name, version } = require('../package.json')
const flatData = data => data.reduce((s, e) => s.concat(e).concat(DELIMITER), '')
const createTargetEntry = (name, value, reference = value) =>
  [`#. ${name}`, `#: ${reference}`, `#| ${value}`, `msgid "${name}"`, `msgstr "${value}"`, ''].join(DELIMITER)

const generateEntriesForObject = (entry, source) =>
  flatData(
    Object.entries(source).map(([key, value]) => {
      if (typeof value === 'string') {
        return createTargetEntry(`${entry}.${key}`, value, `${entry}.${key}`)
      }

      return generateEntriesForObject(`${entry}.${key}`, value)
    }),
  )

const generateEntries = source =>
  Object.keys(source)
    .reduce((result, entry) => {
      const entrySource = source[entry]
      if (typeof entrySource === 'string') {
        return result.concat(createTargetEntry(entry, entrySource))
      }

      return result.concat(generateEntriesForObject(entry, entrySource))
    }, [])
    .join(DELIMITER)

const createPOHeader = (version, currentDate) =>
  [
    'msgid ""',
    'msgstr ""',
    `"Project-Id-Version: ${version}"`,
    '"Report-Msgid-Bugs-To:"',
    `"POT-Creation-Date: ${currentDate.toISOString()}"`,
    `"PO-Revision-Date: ${currentDate.toISOString()}"`,
    '"MIME-Version: 1.0"',
    '"Content-Type: text/plain; charset=UTF-8"',
    '"Content-Transfer-Encoding: 8bit"',
    `"X-Generator: ${name} ${version}"`,
    '',
  ].join(DELIMITER)

module.exports = async (inputFileName, outputFileName) => {
  try {
    spinner.start()
    const source = JSON.parse(fs.readFileSync(inputFileName, 'utf8'))
    const data = flatData([createPOHeader(version, new Date()), generateEntries(source)])
    fs.writeFileSync(outputFileName, data, 'utf8')
    spinner.succeed('Converted JSON to PO')
  } catch (error) {
    console.error(error)
    spinner.fail('Failed to convert JSON to PO')
  }
}
