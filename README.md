# browserify-all-dependencies

Run `browserify --standalone` for every lib in a `package.json` `dependencies`
object and generate an `index.html` file with `<script>` links to each one.

## Usage

```js
// In an existing project:
npm install browserify-all-dependencies
./node_modules/.bin/badeps
```

## Configuration

An `badepAliases` object in `package.json` may be added to change the export
name that Browserify will use for the library. Otherwise the name of the
library will be used verbatim.

For example:

```json
  "badepAliases": {
    "rx": "Rx4",
    "rx-dom": "Rx4",
    "rxjs": "Rx5",
    "ramda": "R",
    "partial.lenses": "L",
    "lodash": "_"
  }
```
