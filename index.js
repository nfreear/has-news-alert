/*!
  has-news-alert

  If any items in the RSS feeds are less than `alertOnLessThan` old, exit with a non-zero value.

  © Nick Freear, 19-June-2019.
  License: MIT
*/

const Parser = require('rss-parser');
/* const Date = */ require('datejs'); // Modifies the Date object! (https://github.com/abritinthebay/datejs/blob/master/index.js#L18)
const timeago = require('timeago.js');
const requestPromise = require('request-promise');
// const notifier = require('node-notifier');

// https://www.npmjs.com/package/rss-parser#nodejs
// https://es6console.com/jilim58f/
// let Parser = require('rss-parser');

module.exports = function (OPT, URLS, feedCallback, alertCallback) {
  // https://github.com/datejs/Datejs#syntax-overview
  const DATE_COMPARE = Date.parse('-' + OPT.alertOnLessThan);

  var promises = [];

  for (var idx = 0; idx < URLS.length; idx++) {
    var promise = requestPromise({
      proxy: process.env.https_proxy ? 'http://wwwcache.open.ac.uk:80' : null,
      url: URLS[ idx ],
      resolveWithFullResponse: true,
      simple: true // Non-200 status codes fail!
    }).then(function (resp) {
      // console.warn(resp.statusCode);

      if (/* !err && */ resp.statusCode === 200) {
        const parser = new Parser();

        parser.parseString(resp.body).then(function (feed) {
          feedCallback(null, { title: feed.title, url: feed.link, statusCode: resp.statusCode });

          // console.warn('Feed:', feed.title, ',', feed.link, ',', resp.statusCode);

          feed.items.forEach(function (item) {
            var result = Date.compare(DATE_COMPARE, Date.parse(item.isoDate));

            if (result === -1) {
              var timeAgo = (timeago()).format(item.isoDate);

              alertCallback(null, { title: item.title, url: item.link, date: item.isoDate, timeAgo: timeAgo });
            }
          });
        });
      }
    }).catch(function (reason) {
      // throw reason;

      alertCallback(reason, null);
    });

    promises.push(promise);
  }

  return promises;
};

// End.
