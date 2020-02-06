#!/usr/bin/env node
'use strict'

const meow = require('meow')
const main = require('./main')
const { usage } = require('./messages')

const config = {
  flags: {
    input: {
      type: 'string',
      default: '',
      alias: 'i',
    },
    output: {
      type: 'string',
      default: '',
      alias: 'o',
    },
  },
}

const cli = meow(usage, config)

main(cli)
