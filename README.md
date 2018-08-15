# spool-analytics

[![NPM version][npm-image]][npm-url]
[![Build status][ci-image]][ci-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Code Climate][codeclimate-image]][codeclimate-url]

Analytics for Fabrix Apps.

## Install

```sh
$ npm install --save @fabrix/spool-analytics
```

## Configure

```js
// config/main.js
import { AnalyticsSpool } from '@fabrix/spool-analytics'
export const main = {
  spools: [
    // ... other spools
    AnalyticsSpool
  ]
}
```

[npm-image]: https://img.shields.io/npm/v/spool-proxy-analytics.svg?style=flat-square
[npm-url]: https://npmjs.org/package/spool-proxy-analytics
[ci-image]: https://img.shields.io/circleci/project/github/CaliStyle/spool-proxy-analytics/master.svg
[ci-url]: https://circleci.com/gh/CaliStyle/spool-proxy-analytics/tree/master
[daviddm-image]: http://img.shields.io/david//spool-proxy-analytics.svg?style=flat-square
[daviddm-url]: https://david-dm.org/CaliStyle/spool-proxy-analytics
[codeclimate-image]: https://img.shields.io/codeclimate/github/CaliStyle/spool-proxy-analytics.svg?style=flat-square
[codeclimate-url]: https://codeclimate.com/github/CaliStyle/spool-proxy-analytics

