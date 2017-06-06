const got = require('request-promise')

const WIKI_ENDPOINT = 'https://en.wikipedia.org/w/api.php?';
const format = 'format=json';
const action = 'action=query';
const list = 'generator=random';
const rnLimit = 'grnlimit=10';
const namespace = 'grnnamespace=0';
const props = 'prop=revisions&rvprop=content'

const urlToRequest = `
  ${WIKI_ENDPOINT}${format}&${action}&${list}&${rnLimit}&${namespace}&${props}`;


const parseResponse = response => JSON.parse(response);

function getRandomBatch() {
  got(urlToRequest).then(response => handleWikiResponse(response));
}

function handleWikiResponse(response) {
  const randomPages = parseResponse(response).query.pages;
  const randomPagesArray = Object.keys(randomPages).map(key => randomPages[key]);
  console.log(randomPagesArray);
  // We have to handle this array and push it to a global obj i guess
  return randomPagesArray;
}
