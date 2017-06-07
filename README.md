
# random-wiki-batch

Get a bunch of random wiki articles. Returns a Promise consisting of an array of random articles from Wikipedia using the Wiki

## Install
```
$ npm install --save random-wiki-batch
```


## Usage
```js
const randomWikiBatch = require('random-wiki-batch');

// If no argument is passed, returns 10 random articles
randomWikiBatch(10).then(articles => console.log(articles))
```

## Tips

### User Agent

It's a good idea to set the `'user-agent'` header so the provider can more easily see how their resource is used. By default, it's the URL to this repo.

```js
const got = require('got');
const pkg = require('./package.json');

got('todomvc.com', {
	headers: {
		'user-agent': `my-module/${pkg.version} (https://github.com/username/my-module)`
	}
});
```

### 304 Responses

Bear in mind, if you send an `if-modified-since` header and receive a `304 Not Modified` response, the body will be empty. It's your responsibility to cache and retrieve the body contents.



## License

MIT
