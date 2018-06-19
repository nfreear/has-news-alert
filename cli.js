#!/usr/bin/env node

/*!
  has-news-alert

  If any items in the RSS feeds are less than `alertOnLessThan` old, exit with a non-zero value.

  © Nick Freear, 19-June-2019.
  License: MIT
*/

const hasNewsAlert = require('./index');
const notifier = require('node-notifier');
const PKG = require('./package.json');
const OPT = PKG[ 'x-hasNewsAlertConfig' ];
const URLS = OPT.feedUrls;
// https://github.com/datejs/Datejs#syntax-overview
const DATE_COMPARE = Date.parse('-' + OPT.alertOnLessThan);

// https://www.npmjs.com/package/rss-parser#nodejs
// https://es6console.com/jilim58f/
// let Parser = require('rss-parser');

console.warn('has-news-alert URLs:', URLS);
console.warn('Date compare:', DATE_COMPARE, ',', OPT.alertOnLessThan);
console.warn('HTTPS proxy:', process.env.https_proxy);
console.warn('Travis event type:', process.env.TRAVIS_EVENT_TYPE);

var newsAlerts = [];

var promises = hasNewsAlert(OPT, URLS, function (err, feed) {
  if (err) {
    console.error('Error:', err);

    process.exit(254);
  }

  console.warn('Feed:', feed.title, ',', feed.url, ',', feed.statusCode);
}, function (err, alert) {
  if (err) {
    console.error('Error:', err);

    process.exit(255);
  }

  newsAlerts.push(alert);

  // https://en.wikibooks.org/wiki/Unicode/List_of_useful_symbols#Geometry
  console.warn(' ∟ Alert:', alert.title, ',', alert.timeAgo, ',', alert.url);

  if (!process.env.TRAVIS) {
    notifier.notify({ title: alert.title, message: alert.timeAgo, url: alert.url, date: alert.date, icon: null, sound: true, wait: true });
  }
});

notifier.on('click', function (obj, options) {
  console.warn('Notify:', options);
});

Promise.all(promises).then(function () {
  console.warn('Alert count:', newsAlerts.length);
  console.warn('Exit code:', newsAlerts.length);

  setTimeout(function () {
    process.exit(newsAlerts.length);
  }, process.env.TRAVIS ? 0 : 3000);
});

// End.
