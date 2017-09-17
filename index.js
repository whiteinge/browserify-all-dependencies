#!/usr/bin/env node
var fs = require('fs');
var browserify = require('browserify');

var package_json = require(`${process.cwd()}/package.json`);

Object.keys(package_json.dependencies).forEach(function(key) {
    var aliases = package_json.badepAliases || {};
    var alias = aliases[key] || key;

    console.log('Processing %s as %s', key, alias);

    var outFile = fs.createWriteStream(`${process.cwd()}/dist/${key}.js`);
    var b = browserify({require: key, standalone: alias});
    b.bundle().pipe(outFile);

    outFile.on('finish', () => console.log('Finished processing', key));
});
