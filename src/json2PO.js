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
const { version } = require('../package.json')
const flatData = data => data.reduce((s, e) => s.concat(e).concat(DELIMITER), '')
const createTargetEntry = (name, value) =>
  [`#. ${name}`, `#: ${value}`, `#| ${value}`, `msgid "${name}"`, `msgstr "${value}"`, ''].join(DELIMITER)

const generateEntries = source =>
  Object.keys(source)
    .reduce((result, entry) => {
      return result.concat(createTargetEntry(entry, source[entry]))
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
    '"X-Generator: vandermeer PO-Generator 0.0.1"',
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
