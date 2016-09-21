#!/usr/bin/env node

// Slice from item two - the first two arguments are always 'node' and <filepath>
const userArgs = process.argv.slice(2)

if ( userArgs.length !== 3 ) {
  console.log('Error: Please run `cumberland <databaseUrl> <collection> <output-file>`')

  return
}

const dbUrl = userArgs[0]
const collection = userArgs[1]
const fileLocation = userArgs[2]
const { fill, chomp } = require('cumberland-audit')(dbUrl, collection)
const { MongoClient } = require('mongodb')
const { writeFile } = require('fs')

chomp({}, docs => {
  const data = docs
  writeFile(fileLocation, JSON.stringify(data, null, 2))
})
