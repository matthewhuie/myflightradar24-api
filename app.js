const cheerio = require('cheerio');
const express = require('express');

const app = express()

const SELECTOR_NUM_FLIGHTS = '.profile-main .profile-container article.profile-summary .summary-card-container section.summary-card:first';
const SELECTOR_DISTANCE = '.profile-main .profile-container article.profile-summary .summary-card-container section.summary-card:nth-child(2)';
const SELECTOR_CARBON_YEARS = '.profile-main .profile-container article.profile-summary .summary-card-container section.summary-card:last';
const SELECTOR_CLASS = '.profile-main .profile-container article.profile-pies section.pie-card:first figcaption';

app.get('/:username/:year?', async (req, res) => {
  const data = await fetch('https://my.flightradar24.com' + req.url);

  if (data.ok) {
    const $ = cheerio.load(await data.text());
    res.send($.html());
  }
});

app.use((req, res) => { 
  res.sendStatus(404);
});

app.listen(process.env.PORT);
