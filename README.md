
[![Build Status][travis-icon]][travis]
[![Has news alert?][img]][travis-log]

# has-news-alert

If any items in the RSS feeds are less than `alertOnLessThan` old,
exit with a non-zero value ... leading to a `red` Travis-CI badge.

```
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
© Nick Freear, 19-June-2019.


[configuration]: https://github.com/nfreear/has-news-alert/blob/master/package.json#L38-L46 "package.json: x-hasNewsAlertConfig"
[travis]: https://travis-ci.org/nfreear/has-news-alert "Travis-CI build status"
[travis-icon]: https://travis-ci.org/nfreear/has-news-alert.svg?branch=master
[travis-log]: https://travis-ci.org/nfreear/has-news-alert#0-1114 "FAILURE === 'Has news alerts'"
[img]: https://img.shields.io/badge/dynamic/xml.svg?label=has-news-alert&url=https%3A//api.travis-ci.org/repos/nfreear/has-news-alert.xml&query=//Project/%40lastBuildStatus&colorB=%23800080
[days]: https://img.shields.io/badge/dynamic/json.svg?label=has-news-alert&url=https://raw.githubusercontent.com/nfreear/has-news-alert/master/package.json&query=$..alertOnLessThan&_colorB=
