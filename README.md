
[![HitCount](http://hits.dwyl.io/nfreear/gaad-widget.svg)](http://hits.dwyl.io/nfreear/gaad-widget)

[![Build Status][travis-icon]][travis]
[![Has news alert?][img]][travis-log]

# has-news-alert

If any news items in the RSS feeds are less than `alertOnLessThan` (hours/days/..) old,
exit with a non-zero value ... leading to a `red` Travis-CI badge.

```js
    'FAILURE' === 'Has news alert(s)'
```

## Usage

```sh
npm install
npm test
npm run has-news-alert
```

## [Configuration][]

```json
{
  "x-hasNewsAlertConfig": {
    "alertOnLessThan": "3 days",
    "runOnTravisCI": true,
    "feedUrls": [
      "http://www.open.ac.uk/blogs/CALRG/?feed=rss2",
      "http://www.headstar.com/eablive/?feed=rss2",
      "https://nick.freear.org.uk/feed.xml"
    ]
  }
}
```

---
License: [MIT][].


[MIT]: https://nfreear.mit-license.org/2018 "© Nick Freear, 19-June-2019 | License: MIT."
[configuration]: https://github.com/nfreear/has-news-alert/blob/master/package.json#L38-L46 "package.json: x-hasNewsAlertConfig"
[travis]: https://travis-ci.org/nfreear/has-news-alert "Travis-CI build status"
[travis-icon]: https://travis-ci.org/nfreear/has-news-alert.svg?branch=master
[travis-log]: https://travis-ci.org/nfreear/has-news-alert#0-824 "'FAILURE' === 'Has news alert(s)'"
[img]: https://img.shields.io/badge/dynamic/xml.svg?label=has-news-alert&url=https%3A//api.travis-ci.org/repos/nfreear/has-news-alert.xml&query=//Project/%40lastBuildStatus&colorB=%23800080
[days]: https://img.shields.io/badge/dynamic/json.svg?label=has-news-alert&url=https://raw.githubusercontent.com/nfreear/has-news-alert/master/package.json&query=$..alertOnLessThan&_colorB=

[End]: //.
