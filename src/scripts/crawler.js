const path = require('path');
const request = require('request-promise');
const cheerio = require('cheerio');
const chalk = require('chalk');
const fs = require('fs-extra');
const sources = require('./sources.js');

const DIST_DIR = path.resolve(__dirname, '../../dist');
const OUT_DIR = path.resolve(DIST_DIR, 'html-data');
const SUN_MOON_DIR = path.resolve(OUT_DIR, 'sun-moon');
const ULTRA_SUN_MOON_DIR = path.resolve(OUT_DIR, 'ultra-sun-moon');
const MENU_FILE = path.resolve(DIST_DIR, 'menu.json');
const MENU = [{ name: 'Home', file: 'home.html' }];

const crawlSourceData = () => {
  const promises = [];
  sources.forEach(src => {
    const options = {
      uri: src,
      transform: dom => cheerio.load(dom),
    };

    promises.push(
      request(options)
        .then($ => {
          const area = $('h1#firstHeading').text();
          const $initialNode = $('span#Pok\\.C3\\.A9mon').parent();
          const nodes = [$initialNode];
          let $currentNode = $initialNode.next();

          do {
            nodes.push($currentNode);
            $currentNode = $currentNode.next().length
              ? $currentNode.next()
              : null;
          } while (
            !$currentNode.next().find('th.roundytop').length &&
            $currentNode.prop('tagName') !== 'H2'
          );

          return { area, nodes, $ };
        })
        .catch(err => err)
    );
  });
  return Promise.all(promises)
    .then(data => data)
    .catch(err => err);
};

const buildGameMarkup = (data, area) => {
  let markup = `<h2>${area}</h2>`;
  if (!data.length) {
    markup = `${markup}<h3>No Pokemon data for this area</h3>`;
  } else {
    data.forEach(node => {
      markup = `${markup}${node}`;
    });
  }
  return markup;
};

const buildDataObject = () => {
  const srcData = crawlSourceData();
  const promises = [];

  return srcData
    .then(data => {
      data.forEach(pageData => {
        const { area, nodes, $ } = pageData;
        const sunMoonData = [];
        const ultraSunMoonData = [];
        let game = '';

        nodes.forEach($node => {
          if ($node.prop('tagName') === 'H3') {
            game = $node.text();
          }

          if (game.includes('Sun and Moon')) {
            sunMoonData.push($.html($node));
          } else if (game.includes('Ultra Sun')) {
            ultraSunMoonData.push($.html($node));
          }
        });

        const fileName = `${area
          .toLowerCase()
          .replace(/ /g, '-')
          .replace(/'/g, '')}.html`;
        const sunFileName = path.resolve(SUN_MOON_DIR, fileName);
        const ultraFileName = path.resolve(ULTRA_SUN_MOON_DIR, fileName);
        const sunMoonMarkup = buildGameMarkup(sunMoonData, area);
        const ultraSunMoonMarkup = buildGameMarkup(ultraSunMoonData, area);
        MENU.push({ name: area, url: fileName });
        promises.push(
          fs
            .writeFile(sunFileName, sunMoonMarkup)
            .then(() => fs.writeFile(ultraFileName, ultraSunMoonMarkup))
            .then(() => console.log(`${chalk.blue.bold(area)} done`))
            .catch(err => err)
        );
      });
      return Promise.all(promises).catch(err => err);
    })
    .catch(err => err);
};

const buildMenu = () => {
  const menuData = JSON.stringify(MENU);
  fs.writeFile(MENU_FILE, menuData).catch(err => err);
};

const build = () => {
  fs.mkdirp(SUN_MOON_DIR)
    .then(() => fs.mkdirp(ULTRA_SUN_MOON_DIR))
    .then(() => buildDataObject())
    .then(() => buildMenu())
    .catch(err => console.error(chalk.bold.red(err)));
};

build();
