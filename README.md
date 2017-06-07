
# random-wiki-batch

Get a specified number of random wiki articles. Returns a Promise consisting of an array of random articles from Wikipedia using the [MediaWiki API](https://www.mediawiki.org/wiki/API:Main_page) with their titles, pageid, and content.

The content appears under the `revisions` key of an article as raw wikitext. Check out [txtwiki.js](https://github.com/joaomsa/txtwiki.js) for parsing wikitext as plaintext.

## Install
```
$ npm install --save random-wiki-batch
```

## Usage
```js
const randomWikiBatch = require('random-wiki-batch');

// If no arguments passed, randomWikiBatch defaults to 10 random articles
const randomArticles = randomWikiBatch(3);

randomArticles.then(articles => console.log(articles));
// [ { pageid: 1442049,
//     ns: 0,
//     title: 'International Center of Photography',
//     revisions: [ [Object] ] },
//   { pageid: 51440676,
//     ns: 0,
//     title: 'Basti Azeem',
//     revisions: [ [Object] ] },
//   { pageid: 53745028,
//     ns: 0,
//     title: 'Gold Star Families Memorial and Park',
//     revisions: [ [Object] ] } ]
```

## License

MIT
