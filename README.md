# spool-analytics

[![Gitter][gitter-image]][gitter-url]
[![NPM version][npm-image]][npm-url]
[![Build Status][ci-image]][ci-url]
[![Test Coverage][coverage-image]][coverage-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Follow @FabrixApp on Twitter][twitter-image]][twitter-url]

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

[npm-image]: https://img.shields.io/npm/v/@fabrix/spool-analytics.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@fabrix/spool-analytics
[ci-image]: https://img.shields.io/circleci/project/github/fabrix-app/spool-analytics/master.svg
[ci-url]: https://circleci.com/gh/fabrix-app/spool-analytics/tree/master
[daviddm-image]: http://img.shields.io/david/fabrix-app/spool-analytics.svg?style=flat-square
[daviddm-url]: https://david-dm.org/fabrix-app/spool-analytics
[gitter-image]: http://img.shields.io/badge/+%20GITTER-JOIN%20CHAT%20%E2%86%92-1DCE73.svg?style=flat-square
[gitter-url]: https://gitter.im/fabrix-app/fabrix
[twitter-image]: https://img.shields.io/twitter/follow/FabrixApp.svg?style=social
[twitter-url]: https://twitter.com/FabrixApp
[coverage-image]: https://img.shields.io/codeclimate/coverage/github/fabrix-app/spool-analytics.svg?style=flat-square
[coverage-url]: https://codeclimate.com/github/fabrix-app/spool-analytics/coverage
