const ora = require('ora')
const spinner = ora('Converting PO to JSON')
const fs = require('fs')
const extractKey = line => {
  return line.split(' ')[1].replace(/\"/g, '')
}
const extractValue = line => {
  const value = line.replace('msgstr "', '')
  return value.substr(0, value.length - 1)
}
const filterByKeyAndValue = lines => {
  return lines.reduce((result, line) => {
    if (line.startsWith('msgid') || line.startsWith('msgstr')) {
      return result.concat(line)
    }
    return result
  }, [])
}
const reduceToKeyValues = lines => {
  let key, value

  return lines.reduce((result, line) => {
    if (line.startsWith('msgid')) {
      key = extractKey(line)
    }
    if (line.startsWith('msgstr')) {
      value = extractValue(line)
      return key
        ? result.concat({
            key,
            value,
          })
        : result
    }
    return result
  }, [])
}
const convertToString = keyValueList => {
  return JSON.stringify(
    keyValueList.reduce((obj, keyValuePair) => {
      return {
        ...obj,
        [keyValuePair.key]: keyValuePair.value,
      }
    }, {}),
  )
}

const transformPOLinesToString = rawData => {
  const filteredKeyValueLines = filterByKeyAndValue(rawData)
  return () => {
    const keyValueList = reduceToKeyValues(filteredKeyValueLines)

    return () => {
      return convertToString(keyValueList)
    }
  }
}

module.exports = async (inputFileName, outputFileName) => {
  try {
    spinner.start()
    const rawData = fs.readFileSync(inputFileName, 'utf8').split('\n')
    const data = transformPOLinesToString(rawData)()()
    fs.writeFileSync(outputFileName, data, 'utf8')

    spinner.succeed('Converted PO to JSON')
  } catch (error) {
    console.error(error)
    spinner.fail('Failed to convert PO to JSON')
  }
}
