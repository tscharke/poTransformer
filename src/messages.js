module.exports = {
  usage: `
  Usage
    $ poTrans [po | json]

    po                               Transfers JSON to PO
    json                             Transfers PO to JSON

    Options
      --help                         Display this message
      --input                        Path and name to the input file
      --output                       Path and name of the output file

    Examples
      Convert an existing JSON-File to a PO-File
      $ poTransformer po --input examples/testData.json --output examples/testData.po

      Convert an existing PO-File to a JSON-File
      $ poTransformer json --input examples/testData.po --output examples/testData.json
  `,
}
