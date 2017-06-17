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

    console.log('Done processing', key);
    outFile.on('finish', () => console.log('really finished'));
});

var scriptTags = Object.keys(package_json.dependencies).map(function(key) {
    return `<script src="${key}.js"></script>`;
});

var indexContent = `
<html>
${scriptTags.join('\n')}
</html>
`;

fs.writeFile(`${process.cwd()}/dist/index.html`, indexContent,
    err => console.log('Done.'));
