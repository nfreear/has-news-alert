#!/usr/bin/env node

/*!
  has-news-alert.js

  If any items in the RSS feeds are less than `alertOnLessThan` old, exit with a non-zero value.

  "FAIL" === "Has news alerts" (!)

  © Nick Freear, 19-June-2019.
*/

const Parser = require('rss-parser');
/* const Date = */ require('datejs'); // Modifies the Date object ! (https://github.com/abritinthebay/datejs/blob/master/index.js#L18)
const requestPromise = require('request-promise');
// const request = require('request');
const PKG = require('./package.json');
const OPT = PKG[ 'x-hasNewsAlertConfig' ];
const URLS = OPT.feedUrls;
// https://github.com/datejs/Datejs#syntax-overview
const DATE_COMPARE = Date.parse('-' + OPT.alertOnLessThan);

// https://www.npmjs.com/package/rss-parser#nodejs
// https://es6console.com/jilim58f/
// let Parser = require('rss-parser');

console.warn('has-news-alert URLs:', URLS);
console.warn('HTTPS proxy:', process.env.https_proxy);
console.warn('Date compare:', DATE_COMPARE, ',', OPT.alertOnLessThan);

var newsAlerts = [];
var promises = [];

for (var idx = 0; idx < URLS.length; idx++) {
  var promise = requestPromise({
    proxy: process.env.https_proxy ? 'http://wwwcache.open.ac.uk:80' : null,
    url: URLS[ idx ],
    resolveWithFullResponse: true,
    simple: true // Non-200 status codes fail!
  }).then(function (resp) {
    /* if (err) {
      console.error(err);
      process.exit(1);
    } */
    console.warn(resp.statusCode);

    if (/* !err && */ resp.statusCode === 200) {
      const parser = new Parser();
      parser.parseString(resp.body).then(function (feed) {
        console.warn(feed.title);

        feed.items.forEach(function (item) {
          var result = Date.compare(DATE_COMPARE, Date.parse(item.isoDate));

          if (result === -1) {
            newsAlerts.push({ url: URLS[ idx ], item: item });
          }

          console.warn(item.pubDate, result);
        });
      });
    }
  }).catch(function (reason) {
    console.error('Error:', reason);

    process.exit(255);
  });

  promises.push(promise);

  /* let parser = new Parser(); // { host: 'wwwcache.open.ac.uk', port: 80 });

  // eslint-disable-next-line
  (async () => {
    let feed = await parser.parseURL(URLS[ idx ], function (data) {
      console.warn(data.title);
    });

    console.warn(feed.title);

    feed.items.forEach(item => {
      console.warn(item.pubDate);
    });
  }); */
}

Promise.all(promises).then(function () {
  console.warn('Alerts count:', newsAlerts.length);
  console.warn('Exit code:', newsAlerts.length);

  process.exit(newsAlerts.length);
});

// End.
