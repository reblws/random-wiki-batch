const got = require('got');

const DEFAULTS = {
  language: 'en',
  pagesWanted: 10,
}

function getRandomPagesArray(json) {
  const pages = json.query.pages;
  const randomPagesArray = Object.keys(pages).map(key => pages[key]);
  return randomPagesArray;
}

function makeRequestURL(pagesWanted, options) {
  const WIKI_ENDPOINT = 'https://en.wikipedia.org/w/api.php?';
  const format = 'format=json';
  const action = 'action=query';
  const list = 'generator=random';
  const namespace = 'grnnamespace=0';
  const props = 'prop=revisions&rvprop=content'
  const rnLimit = `grnlimit=${pagesWanted}`;
  const urlToRequest = `
    ${WIKI_ENDPOINT}${format}&${action}&${list}&${rnLimit}&${namespace}&${props}
  `;

  return urlToRequest;
}

function fillDefaultOptions(userOptions) {
  const userOptionKeys = Object.keys(userOptions);
  if (userOptionKeys.length === 0)
    return DEFAULTS;

  const fillDefaults = (allOptions, option) => {
    const newOption = {};
    newOption[option] = DEFAULTS[option];
    return Object.assign({}, allOptions, newOption);
  };

  return Object.keys(DEFAULTS)
    .filter(option => !userOptionKeys.includes(option))
    .reduce(fillDefaults, userOptionKeys);
}

function getRequests(numOfPagesWanted) {
  return {
    totalRequests: Math.floor(numOfPagesWanted / 10),
    pagesOnLastRequest: numOfPagesWanted % 10,
  };
}

function requestPromise(pagesToRequest) {
  const url = makeRequestURL(pagesToRequest, options);
  return Promise.resolve(got(url))
    .then(response => JSON.parse(response.body))
    .then(getRandomPagesArray);
}


function randomWikiBatch(numOfPagesWanted = 10, userOptions = {}) {
  // Can only make max of 10 requests at a time
  const options = fillDefaultOptions(userOptions);
  const { totalRequests, pagesOnLastRequest } = getRequests(numOfPagesWanted);

  let wikiPromises = Array(totalRequests).fill(10);
  if (numOfPagesOnLastRequest !== 0) {
    wikiPromises.push(numOfPagesOnLastRequest);
  }
  wikiPromises = wikiPromises.map(requestPromise);
  return Promise.all(wikiPromises)
    .then(articleBatch => [].concat.apply([], articleBatch));
}


module.exports = randomWikiBatch;
