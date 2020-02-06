#!/usr/bin/env node
'use strict'

const meow = require('meow')
const main = require('./src/main')
const { usage } = require('./src/messages')

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
