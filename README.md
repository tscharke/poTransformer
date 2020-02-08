📚Transforms JSON-files to PO-Files ↔️ PO-Files to JSON-files

## Motivation

In some projects, I use [react-intl](https://github.com/formatjs/react-intl) to internationalize them and support multi-languages. React-intl supports flatted objects as JSON-files divided into separated named-files like `en_US.json` or `de_DE.json`.

Most of my clients use [POEdit](https://poedit.net) to manage multi-languages in their projects. And most translations agency known and used this tool too.

For these reasons I need something to transform flatted objects as JSON-files to PO-Files to open with POEdit - so this tool/repository was born.

## Features

- Transforms an existing JSON-File to a PO-File
- Transforms an existing PO-File to a JSON-File

## Usage

Transforms an existing JSON-File to a PO-File

```bash
$ npx po-transformer po --input examples/testData.json --output examples/testData.po

# Optional
$ cat examples/testData.po
…
#. firstEntry
#: First Entry
#| First Entry
msgid "firstEntry"
msgstr "First Entry"
…
```

Transforms an existing PO-File to a JSON-File

```bash
$ npx po-transformer json --input examples/testData.po --output examples/testData.json

# Optional
$ cat examples/testData.json
{
  …
  "firstEntry": "First Entry",
  "firstEntry.item1": "First Entry - 1. Item",
  "firstEntry.item2": "First Entry - 2. Item",
  …
}
```

Displays the usage

```bash
$ npx po-transformer --help
```

## Known Bugs

The current situation of this project is, that it works for my workflow and situations only. It's a very raw and straightforward implementation tailored exactly to what I need.

## License

[MIT License](LICENSE)
