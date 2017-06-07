const got = require('got');

function getRandomPagesArray(json) {
  const pages = json.query.pages;
  const randomPagesArray = Object.keys(pages).map(key => pages[key]);
  return randomPagesArray;
}

function randomWikiBatch(numOfPagesWanted = 10) {
  const WIKI_ENDPOINT = 'https://en.wikipedia.org/w/api.php?';
  const format = 'format=json';
  const action = 'action=query';
  const list = 'generator=random';
  const namespace = 'grnnamespace=0';
  const props = 'prop=revisions&rvprop=content'
  const rnLimit = num => `grnlimit=${num}`;
  const urlToRequest = rnLimit => (`
    ${WIKI_ENDPOINT}${format}&${action}&${list}&${rnLimit}&${namespace}&${props}
  `);
  // Can only make max of 10 requests at a time
  const requestsToMake = Math.floor(numOfPagesWanted / 10);
  const numOfPagesOnLastRequest = numOfPagesWanted % 10;
  let wikiPromises = Array(requestsToMake).fill(10);
  if (numOfPagesOnLastRequest !== 0) {
    wikiPromises.push(numOfPagesOnLastRequest);
  }
  wikiPromises = wikiPromises.map(pagesToRequest => {
    const numOfArticlesToRequest = rnLimit(pagesToRequest);
    const url = urlToRequest(numOfArticlesToRequest);
    return Promise.resolve(got(url))
      .then(response => JSON.parse(response.body))
      .then(getRandomPagesArray);
  });
  return Promise.all(wikiPromises)
    .then(articleBatch => [].concat.apply([], articleBatch));
}

module.exports = randomWikiBatch;
