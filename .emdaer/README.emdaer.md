# <!--emdaer-p
  - '@emdaer/plugin-value-from-package'
  - value: name
--> · <!--emdaer-p
  - '@emdaer/plugin-shields'
  - shields:
      - alt: 'Travis'
        image: 'travis/chasingmaxwell/middytohof.svg?branch=master'
        link: 'https://travis-ci.org/chasingmaxwell/middytohof'
      - alt: 'Documented with emdaer'
        image: 'badge/📓-documented%20with%20emdaer-F06632.svg'
        link: 'https://github.com/emdaer/emdaer'
        style: 'flat-square'
      -->

Convert [Middy](https://github.com/middyjs/middy) middleware plugins to higher-order functions returning lambda handlers.

## Why?

Middy facilitates a middleware pattern very similar to express but for lambda handlers. It encapsulates common functionality into individual plugins separate from the primary business logic of your lambda's handler.

Middytohof is for those who want to benefit from the plugins written for the Middy community, but prefer a functional approach over the middleware pattern when it comes to decorating lambda handlers.

Here's a quick comparison to give you an idea of the difference:

### Middleware pattern with Middy

```JavaScript
const { middleware1, middleware2 } = require('middy/middlewares');
const middy = require('middy');

// This contains your primary business logic.
const myHandler = (event, context, callback) => {
  callback(null, { iAm: 'a response' });
};

module.exports = {
  myHandler: middy(myHandler)
    .use(middleware1())
    .use(middleware2()),
};
```

### Functional pattern with Middy plugins through middytohof

```JavaScript
const { compose } = require('ramda');
const { middleware1, middleware2 } = require('middy/middlewares');
const middytohof = require('middytohof');

// This contains your primary business logic.
const myHandler = (event, context, callback) => {
  callback(null, { iAm: 'a response' });
};

module.exports = {
  // Without ramda.
  myHandler: middytohof(middleware1())(
    middytohof(middleware2())(
      myHandler
    )
  ),
  // With ramda.
  myHandlerWithRamda: compose(
    middytohof(middleware1()),
    middytoHof(middleware2())
  )(myHandler),
};
```

Either pattern is perfectly reasonable. Now you have the option to choose while keeping the excellent plugins created for the Middy community! :tada:

## Installation

`yarn add middytohof`

 OR

`npm i --save middytohof`

## Contributors

<!--emdaer-p
  - '@emdaer/plugin-contributors-details-github'
-->

## License

<!--emdaer-p
  - '@emdaer/plugin-license-reference'
-->
